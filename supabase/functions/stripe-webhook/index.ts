import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

// ============================================
// PRODUCTION WEBHOOK - GREENLAND OREGON
// ============================================
// This is a LIVE production webhook handler.
// Handles Stripe checkout.session.completed events.
// Sends confirmation emails IMMEDIATELY after payment.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, stripe-signature",
};

// Production logging with timestamp
const logStep = (step: string, details?: unknown) => {
  const timestamp = new Date().toISOString();
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[${timestamp}] [STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only accept POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  logStep("PRODUCTION: Webhook received");

  // Get environment variables
  const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

  // Validate configuration
  if (!stripeSecretKey) {
    logStep("ERROR: STRIPE_SECRET_KEY not configured");
    return new Response(
      JSON.stringify({ error: "Payment system not configured" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  if (!webhookSecret) {
    logStep("ERROR: STRIPE_WEBHOOK_SECRET not configured");
    return new Response(
      JSON.stringify({ error: "Webhook not configured" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    logStep("ERROR: Database not configured");
    return new Response(
      JSON.stringify({ error: "Database not configured" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  // Log Stripe mode
  const isLiveMode = stripeSecretKey.startsWith("sk_live_");
  logStep("PRODUCTION: Stripe mode check", { isLiveMode });

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2025-08-27.basil",
  });

  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      logStep("ERROR: Missing Stripe signature");
      return new Response(
        JSON.stringify({ error: "Missing signature" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
      logStep("PRODUCTION: Signature verified", { eventType: event.type, eventId: event.id });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      logStep("ERROR: Signature verification failed", { error: errorMessage });
      return new Response(
        JSON.stringify({ error: `Signature verification failed` }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Process checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      logStep("PRODUCTION: Processing payment", { 
        sessionId: session.id, 
        paymentStatus: session.payment_status,
        customerEmail: session.customer_email,
        amount: session.amount_total
      });

      // Initialize Supabase
      const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

      // Find application by Stripe session ID
      const { data: application, error: fetchError } = await supabaseClient
        .from("rental_applications")
        .select("*")
        .eq("stripe_payment_intent_id", session.id)
        .single();

      if (fetchError || !application) {
        logStep("ERROR: Application not found", { sessionId: session.id });
        return new Response(
          JSON.stringify({ error: "Application not found" }),
          { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      logStep("PRODUCTION: Application found", { 
        applicationId: application.id, 
        email: application.email,
        confirmationNumber: application.confirmation_number,
        currentStatus: application.payment_status
      });

      // Process successful payment
      if (session.payment_status === "paid") {
        logStep("PRODUCTION: Payment successful - updating database");

        // Update application status
        const { error: updateError } = await supabaseClient
          .from("rental_applications")
          .update({
            payment_status: "paid",
            application_fee_paid: true,
          })
          .eq("id", application.id);

        if (updateError) {
          logStep("ERROR: Failed to update application", { error: updateError });
        } else {
          logStep("PRODUCTION: Application marked as PAID");
        }

        // Send confirmation email IMMEDIATELY
        logStep("PRODUCTION: Sending confirmation email", { 
          email: application.email,
          name: `${application.first_name} ${application.last_name}`,
          confirmation: application.confirmation_number
        });

        try {
          const emailResponse = await fetch(
            `${supabaseUrl}/functions/v1/send-confirmation-email`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${supabaseAnonKey}`,
              },
              body: JSON.stringify({
                to: application.email,
                firstName: application.first_name,
                lastName: application.last_name,
                confirmationNumber: application.confirmation_number,
              }),
            }
          );

          const emailResult = await emailResponse.json();
          
          if (emailResult.success) {
            logStep("PRODUCTION: Email sent successfully", { 
              emailId: emailResult.data?.data?.id,
              recipient: application.email
            });
          } else {
            logStep("WARNING: Email may have failed", emailResult);
          }
        } catch (emailError) {
          logStep("ERROR: Failed to send email", { error: String(emailError) });
        }
      }
    }

    // Return success to Stripe
    logStep("PRODUCTION: Webhook processed successfully");
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logStep("ERROR: Webhook processing failed", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
