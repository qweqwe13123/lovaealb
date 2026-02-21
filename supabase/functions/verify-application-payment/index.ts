import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

// ============================================
// PRODUCTION PAYMENT VERIFICATION - GREENLAND OREGON
// ============================================
// This is a LIVE production service.
// Verifies payment and sends email as fallback.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Production logging with timestamp
const logStep = (step: string, details?: unknown) => {
  const timestamp = new Date().toISOString();
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[${timestamp}] [VERIFY-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("PRODUCTION: Verification started");
    
    const { applicationId } = await req.json();

    if (!applicationId) {
      throw new Error("Application ID is required");
    }

    logStep("PRODUCTION: Verifying application", { applicationId });

    // Get environment variables - use external Supabase if configured
    const supabaseUrl = Deno.env.get("EXTERNAL_SUPABASE_URL") || Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("EXTERNAL_SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");

    if (!stripeKey) {
      throw new Error("Payment system not configured");
    }

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    // Get application
    const { data: application, error: fetchError } = await supabaseClient
      .from("rental_applications")
      .select("*")
      .eq("id", applicationId)
      .single();

    if (fetchError || !application) {
      logStep("ERROR: Application not found", { applicationId });
      throw new Error("Application not found");
    }

    logStep("PRODUCTION: Application found", { 
      email: application.email, 
      paymentStatus: application.payment_status,
      confirmationNumber: application.confirmation_number 
    });

    if (!application.stripe_payment_intent_id) {
      return new Response(JSON.stringify({ 
        verified: false, 
        message: "No payment session found" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-08-27.basil",
    });

    // Retrieve checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(
      application.stripe_payment_intent_id,
      { expand: ["payment_intent"] },
    );

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent | string | null;

    logStep("PRODUCTION: Stripe session status", {
      sessionId: session.id,
      status: session.status,
      paymentStatus: session.payment_status,
      paymentIntentType: typeof paymentIntent,
    });

    // Stripe нюанс: иногда payment_status может остаться unpaid на короткое время,
    // а фактический успех виден по session.status=complete и/или payment_intent.status=succeeded.
    let isPaid = session.payment_status === "paid" || session.status === "complete";

    if (!isPaid) {
      // Если payment_intent не был развёрнут, попробуем получить его отдельно.
      const paymentIntentId =
        typeof paymentIntent === "string"
          ? paymentIntent
          : paymentIntent?.id;

      if (paymentIntentId) {
        const pi =
          typeof paymentIntent === "object" && paymentIntent && "status" in paymentIntent
            ? (paymentIntent as Stripe.PaymentIntent)
            : await stripe.paymentIntents.retrieve(paymentIntentId);

        logStep("PRODUCTION: PaymentIntent status", {
          paymentIntentId: pi.id,
          status: pi.status,
        });

        if (pi.status === "succeeded") {
          isPaid = true;
        }
      }
    }

    if (isPaid) {
      // Check if already processed (webhook already handled it)
      const alreadyProcessed = application.payment_status === "paid";

      if (!alreadyProcessed) {
        logStep("PRODUCTION: Payment verified - updating database (fallback)");

        // Update application as paid
        await supabaseClient
          .from("rental_applications")
          .update({
            payment_status: "paid",
            application_fee_paid: true,
          })
          .eq("id", applicationId);

        // Send confirmation email as FALLBACK
        logStep("PRODUCTION: Sending email (fallback)", { email: application.email });

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
            },
          );

          const emailResult = await emailResponse.json();
          logStep("PRODUCTION: Email result", emailResult);
        } catch (emailError) {
          logStep("WARNING: Email fallback failed", { error: String(emailError) });
        }
      } else {
        logStep("PRODUCTION: Payment already processed by webhook");
      }

      return new Response(
        JSON.stringify({
          verified: true,
          message: "Payment verified successfully",
          confirmationNumber: application.confirmation_number,
          firstName: application.first_name,
          lastName: application.last_name,
          email: application.email,
          totalFee: application.total_fee_amount,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        },
      );
    }

    logStep("PRODUCTION: Payment not completed", {
      status: session.status,
      paymentStatus: session.payment_status,
    });

    return new Response(
      JSON.stringify({
        verified: false,
        message: "Payment not completed",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logStep("ERROR: Verification failed", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
