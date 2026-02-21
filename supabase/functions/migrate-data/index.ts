import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const sourceClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const targetUrl = Deno.env.get("EXTERNAL_SUPABASE_URL");
    const targetKey = Deno.env.get("EXTERNAL_SUPABASE_SERVICE_ROLE_KEY");

    if (!targetUrl || !targetKey) {
      throw new Error("External Supabase credentials not configured");
    }

    const targetClient = createClient(targetUrl, targetKey);

    // Read all applications from Lovable Cloud
    const { data: applications, error: readError } = await sourceClient
      .from("rental_applications")
      .select("*")
      .order("created_at", { ascending: true });

    if (readError) throw new Error(`Read error: ${readError.message}`);

    console.log(`Found ${applications?.length || 0} applications to migrate`);

    if (!applications || applications.length === 0) {
      return new Response(JSON.stringify({ message: "No data to migrate" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get target table structure by reading one row
    const { data: sample, error: sampleError } = await targetClient
      .from("rental_applications")
      .select("*")
      .limit(1);

    let targetColumns: string[] | null = null;
    if (!sampleError && sample && sample.length > 0) {
      targetColumns = Object.keys(sample[0]);
      console.log("Target columns detected:", targetColumns);
    }

    // Filter application data to only include columns that exist in target
    const filteredApps = applications.map(app => {
      if (!targetColumns) return app;
      const filtered: Record<string, unknown> = {};
      for (const col of targetColumns) {
        if (col in app) {
          filtered[col] = (app as Record<string, unknown>)[col];
        }
      }
      return filtered;
    });

    // Insert in batches of 50
    let totalMigrated = 0;
    const errors: string[] = [];

    for (let i = 0; i < filteredApps.length; i += 50) {
      const batch = filteredApps.slice(i, i + 50);
      const { data: inserted, error: writeError } = await targetClient
        .from("rental_applications")
        .upsert(batch, { onConflict: "id" })
        .select("id");

      if (writeError) {
        console.error(`Batch ${i} error:`, writeError);
        errors.push(`Batch starting at ${i}: ${writeError.message}`);
      } else {
        totalMigrated += inserted?.length || 0;
      }
    }

    console.log(`Migrated ${totalMigrated}/${applications.length} applications`);

    return new Response(JSON.stringify({
      success: errors.length === 0,
      migrated: totalMigrated,
      total: applications.length,
      errors: errors.length > 0 ? errors : undefined,
      targetColumnsUsed: targetColumns?.length || "all",
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Migration error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
