import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

// ============================================
// PRODUCTION PAYMENT SERVICE - GREENLAND OREGON
// ============================================
// This is a LIVE production service.
// All payments are processed in LIVE mode.
// NO TEST MODE - All transactions are real.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Production logging with timestamp
const logStep = (step: string, details?: unknown) => {
  const timestamp = new Date().toISOString();
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[${timestamp}] [CREATE-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("PRODUCTION: Payment function started");
    
    const { applicationData } = await req.json();

    if (!applicationData) {
      throw new Error("Application data is required");
    }

    logStep("PRODUCTION: Application received", { 
      email: applicationData.email,
      name: `${applicationData.firstName} ${applicationData.lastName}`
    });

    // Initialize Supabase - use external Supabase if configured, otherwise fallback to Lovable Cloud
    const supabaseUrl = Deno.env.get("EXTERNAL_SUPABASE_URL") || Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("EXTERNAL_SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Database configuration missing - contact administrator");
    }

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    // Generate confirmation number in XXXX-XXXX format (hex)
    const chars = 'ABCDEF0123456789';
    let part1 = '', part2 = '';
    for (let i = 0; i < 4; i++) {
      part1 += chars[Math.floor(Math.random() * chars.length)];
      part2 += chars[Math.floor(Math.random() * chars.length)];
    }
    const confirmationNumber = `${part1}-${part2}`;

    // Calculate fees (PRODUCTION pricing)
    const adultsCount = applicationData.adultsCount || 1;
    const petsCount = applicationData.petsCount || 0;
    const adultsFee = adultsCount * 49; // $49 per adult
    const petsFee = petsCount * 30; // $30 per pet
    const totalFee = adultsFee + petsFee;

    logStep("PRODUCTION: Fees calculated", { adultsCount, petsCount, totalFee });

    // Save application to database
    const { data: application, error: insertError } = await supabaseClient
      .from("rental_applications")
      .insert({
        confirmation_number: confirmationNumber,
        // Personal Info
        first_name: applicationData.firstName,
        last_name: applicationData.lastName,
        email: applicationData.email,
        phone: applicationData.phone,
        date_of_birth: applicationData.dateOfBirth || null,
        is_us_citizen: applicationData.isUsCitizen,
        ssn_encrypted: applicationData.ssn || null,
        government_id_type: applicationData.governmentIdType || null,
        government_id_files: applicationData.governmentIdFiles || [],
        additional_occupants: applicationData.additionalOccupants || [],
        
        // Current Address
        current_address: applicationData.currentAddress,
        current_city: applicationData.currentCity,
        current_state: applicationData.currentState,
        current_zip: applicationData.currentZip,
        current_date_moved_in: applicationData.currentDateMovedIn || null,
        current_monthly_rent: parseFloat(applicationData.currentMonthlyRent) || null,
        current_reason_leaving: applicationData.currentReasonLeaving,
        current_landlord_name: applicationData.currentLandlordName,
        current_landlord_phone: applicationData.currentLandlordPhone,
        current_landlord_email: applicationData.currentLandlordEmail,
        
        // Previous Address
        previous_address: applicationData.previousAddress || null,
        previous_city: applicationData.previousCity || null,
        previous_state: applicationData.previousState || null,
        previous_zip: applicationData.previousZip || null,
        previous_date_moved_in: applicationData.previousDateMovedIn || null,
        previous_date_moved_out: applicationData.previousDateMovedOut || null,
        previous_monthly_rent: parseFloat(applicationData.previousMonthlyRent) || null,
        previous_reason_leaving: applicationData.previousReasonLeaving || null,
        previous_landlord_name: applicationData.previousLandlordName || null,
        
        // Employment
        employment_status: applicationData.employmentStatus,
        employer_name: applicationData.employerName || null,
        job_title: applicationData.jobTitle || null,
        supervisor_name: applicationData.supervisorName || null,
        employer_phone: applicationData.employerPhone || null,
        employment_start_date: applicationData.employmentStartDate || null,
        gross_monthly_income: parseFloat(applicationData.grossMonthlyIncome) || null,
        other_income_source: applicationData.otherIncomeSource || null,
        other_income_amount: parseFloat(applicationData.otherIncomeAmount) || null,
        
        // Screening Questions
        screening_sued_for_rent: applicationData.screeningSuedForRent || false,
        screening_sued_for_rent_explain: applicationData.screeningSuedForRentExplain || null,
        screening_sued_for_damages: applicationData.screeningSuedForDamages || false,
        screening_sued_for_damages_explain: applicationData.screeningSuedForDamagesExplain || null,
        screening_evicted: applicationData.screeningEvicted || false,
        screening_evicted_explain: applicationData.screeningEvictedExplain || null,
        screening_defaulted_lease: applicationData.screeningDefaultedLease || false,
        screening_defaulted_lease_explain: applicationData.screeningDefaultedLeaseExplain || null,
        screening_judgment: applicationData.screeningJudgment || false,
        screening_judgment_explain: applicationData.screeningJudgmentExplain || null,
        screening_bankruptcy: applicationData.screeningBankruptcy || false,
        screening_bankruptcy_explain: applicationData.screeningBankruptcyExplain || null,
        screening_felony: applicationData.screeningFelony || false,
        screening_felony_explain: applicationData.screeningFelonyExplain || null,
        
        // Pets
        has_pets: applicationData.hasPets || false,
        pets_count: petsCount,
        pets_data: applicationData.petsData || [],
        pets_caused_damage: applicationData.petsCausedDamage || false,
        pets_damage_explain: applicationData.petsDamageExplain || null,
        
        // Emergency Contact
        emergency_first_name: applicationData.emergencyFirstName,
        emergency_last_name: applicationData.emergencyLastName,
        emergency_relationship: applicationData.emergencyRelationship,
        emergency_phone: applicationData.emergencyPhone,
        emergency_email: applicationData.emergencyEmail || null,
        emergency_has_access: applicationData.emergencyHasAccess || false,
        
        // Vehicles
        has_vehicle: applicationData.hasVehicle || false,
        vehicles: applicationData.vehicles || [],
        
        // Certifications
        certification_true_info: applicationData.certificationTrueInfo || false,
        certification_verify_info: applicationData.certificationVerifyInfo || false,
        certification_background_check: applicationData.certificationBackgroundCheck || false,
        certification_false_info_denial: applicationData.certificationFalseInfoDenial || false,
        certification_non_refundable: applicationData.certificationNonRefundable || false,
        certification_terms: applicationData.certificationTerms || false,
        
        // Fee info
        adults_count: adultsCount,
        total_fee_amount: totalFee,
        payment_status: "pending",
      })
      .select()
      .single();

    if (insertError) {
      logStep("ERROR: Database insert failed", insertError);
      throw new Error("Failed to save application - please try again");
    }

    logStep("PRODUCTION: Application saved", { 
      applicationId: application.id, 
      confirmationNumber: application.confirmation_number 
    });

    // Initialize Stripe with LIVE key
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("Payment system not configured - contact administrator");
    }
    
    // PRODUCTION CHECK: Verify we're using LIVE Stripe key
    if (!stripeKey.startsWith("sk_live_")) {
      logStep("WARNING: Not using live Stripe key", { keyPrefix: stripeKey.substring(0, 8) });
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-08-27.basil",
    });

    // Check for existing Stripe customer
    const customers = await stripe.customers.list({ 
      email: applicationData.email, 
      limit: 1 
    });
    
    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("PRODUCTION: Existing customer found", { customerId });
    }

    // Build line items for checkout
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Rental Application Fee",
            description: `Application processing fee for ${adultsCount} adult(s)`,
          },
          unit_amount: 4900, // $49.00 in cents
        },
        quantity: adultsCount,
      },
    ];

    if (petsCount > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Pet Application Fee",
            description: `Pet application fee for ${petsCount} pet(s)`,
          },
          unit_amount: 3000, // $30.00 in cents
        },
        quantity: petsCount,
      });
    }

    // Redirect back to the SAME site that initiated checkout (preview / published / main domain)
    // This ensures the success page can reliably run the fallback verification.
    const requestOrigin = req.headers.get("origin");
    const baseUrl = requestOrigin && requestOrigin.startsWith("http")
      ? requestOrigin
      : "https://www.mygreenlandapartments.com";

    const successUrl = `${baseUrl}/success?application_id=${application.id}`;
    const cancelUrl = `${baseUrl}/apply?canceled=true`;

    logStep("PRODUCTION: Creating Stripe checkout", { successUrl });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : applicationData.email,
      line_items: lineItems,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        application_id: application.id,
        confirmation_number: application.confirmation_number,
        environment: "production",
      },
      payment_intent_data: {
        metadata: {
          application_id: application.id,
          confirmation_number: application.confirmation_number,
        },
      },
    });

    logStep("PRODUCTION: Checkout session created", { 
      sessionId: session.id,
      url: session.url ? "Generated" : "Missing"
    });

    // Update application with Stripe session ID
    await supabaseClient
      .from("rental_applications")
      .update({ stripe_payment_intent_id: session.id })
      .eq("id", application.id);

    logStep("PRODUCTION: Application updated with payment session");

    return new Response(JSON.stringify({ 
      url: session.url, 
      applicationId: application.id,
      confirmationNumber: application.confirmation_number
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logStep("ERROR: Payment creation failed", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
