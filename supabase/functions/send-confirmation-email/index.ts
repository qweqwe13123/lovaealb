import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

// ============================================
// PRODUCTION EMAIL SERVICE - GREENLAND OREGON
// ============================================
// This is a LIVE production service.
// All emails are sent immediately after successful payment.
// RESEND_API_KEY is stored securely in Supabase secrets.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Production logging
const logStep = (step: string, details?: unknown) => {
  const timestamp = new Date().toISOString();
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[${timestamp}] [SEND-EMAIL] ${step}${detailsStr}`);
};

interface EmailRequest {
  to: string;
  firstName: string;
  lastName: string;
  confirmationNumber: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("PRODUCTION: Email function started");
    
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured - contact administrator");
    }
    
    const resend = new Resend(resendApiKey);

    const { to, firstName, lastName, confirmationNumber }: EmailRequest = await req.json();

    // Validate required fields
    if (!to || !confirmationNumber) {
      throw new Error("Missing required fields: email address or confirmation number");
    }

    const applicantName = firstName && lastName 
      ? `${firstName} ${lastName}` 
      : firstName || lastName || "Valued Applicant";

    logStep("PRODUCTION: Preparing email", { 
      recipient: to, 
      applicant: applicantName, 
      confirmation: confirmationNumber 
    });

    // Professional HTML Email Template - Greenland Oregon Official
    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Application Confirmation - Greenland Oregon</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a4d1a 0%, #2d6b2d 50%, #3d8b3d 100%); padding: 40px 30px; text-align: center;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: 0.5px;">
                      Greenland Oregon
                    </h1>
                    <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px; font-weight: 400;">
                      Premium Apartment Living
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Success Banner -->
          <tr>
            <td style="background-color: #e8f5e9; padding: 25px 30px; text-align: center; border-bottom: 3px solid #4caf50;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <div style="display: inline-block; background-color: #4caf50; border-radius: 50%; width: 50px; height: 50px; line-height: 50px; text-align: center; margin-bottom: 10px;">
                      <span style="color: #ffffff; font-size: 28px;">✓</span>
                    </div>
                    <h2 style="margin: 0; color: #2e7d32; font-size: 22px; font-weight: 600;">
                      Application Successfully Submitted!
                    </h2>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 35px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td>
                    <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                      Dear <strong>${firstName || ''} ${lastName || ''}</strong>,
                    </p>
                    
                    <p style="margin: 0 0 25px; color: #555555; font-size: 15px; line-height: 1.8;">
                      Thank you for submitting your rental application with <strong>Greenland Oregon</strong>. 
                      We have successfully received your application and payment. Our team will begin reviewing 
                      your information shortly.
                    </p>

                    <!-- Confirmation Box -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                      <tr>
                        <td style="background: linear-gradient(135deg, #f8fdf8 0%, #e8f5e9 100%); border: 2px solid #2e7d32; border-radius: 12px; padding: 25px; text-align: center;">
                          <p style="margin: 0 0 8px; color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
                            Your Confirmation Number
                          </p>
                          <p style="margin: 0; color: #1a4d1a; font-size: 32px; font-weight: 700; font-family: 'Courier New', monospace; letter-spacing: 3px;">
                            ${confirmationNumber}
                          </p>
                          <p style="margin: 12px 0 0; color: #888888; font-size: 12px;">
                            Please save this number for your records
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- What's Next Section -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 25px 0;">
                      <tr>
                        <td style="background-color: #fafafa; border-radius: 10px; padding: 25px;">
                          <h3 style="margin: 0 0 20px; color: #333333; font-size: 18px; font-weight: 600;">
                            📋 What Happens Next?
                          </h3>
                          
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="padding: 10px 0;">
                                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                  <tr>
                                    <td style="width: 40px; vertical-align: top;">
                                      <div style="width: 32px; height: 32px; background-color: #2e7d32; border-radius: 50%; text-align: center; line-height: 32px; color: #ffffff; font-weight: 600; font-size: 14px;">1</div>
                                    </td>
                                    <td style="vertical-align: top; padding-left: 12px;">
                                      <p style="margin: 0; color: #333333; font-size: 15px; font-weight: 600;">Application Review</p>
                                      <p style="margin: 5px 0 0; color: #666666; font-size: 14px; line-height: 1.5;">Our team will carefully review your application within 1-3 business days.</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 10px 0;">
                                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                  <tr>
                                    <td style="width: 40px; vertical-align: top;">
                                      <div style="width: 32px; height: 32px; background-color: #2e7d32; border-radius: 50%; text-align: center; line-height: 32px; color: #ffffff; font-weight: 600; font-size: 14px;">2</div>
                                    </td>
                                    <td style="vertical-align: top; padding-left: 12px;">
                                      <p style="margin: 0; color: #333333; font-size: 15px; font-weight: 600;">We'll Contact You</p>
                                      <p style="margin: 5px 0 0; color: #666666; font-size: 14px; line-height: 1.5;">Once the review is complete, we will reach out via phone or email to discuss next steps.</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 25px 0 0; color: #555555; font-size: 15px; line-height: 1.8;">
                      Thank you for choosing Greenland Oregon. We look forward to welcoming you to our community!
                    </p>

                    <p style="margin: 25px 0 0; color: #333333; font-size: 15px;">
                      Warm regards,<br>
                      <strong style="color: #1a4d1a;">The Greenland Oregon Team</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact Section -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 25px 30px; border-top: 1px solid #e9ecef;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 15px; color: #666666; font-size: 14px;">
                      Questions about your application?
                    </p>
                    <table role="presentation" style="border-collapse: collapse;">
                      <tr>
                        <td style="padding: 0 15px;">
                          <a href="tel:+15036739426" style="color: #2e7d32; text-decoration: none; font-size: 14px; font-weight: 500;">
                            📞 (503) 673-9426
                          </a>
                        </td>
                        <td style="padding: 0 15px;">
                          <a href="mailto:greenlandlivingofficial@gmail.com" style="color: #2e7d32; text-decoration: none; font-size: 14px; font-weight: 500;">
                            ✉️ greenlandlivingofficial@gmail.com
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1a4d1a; padding: 30px; text-align: center;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 8px; color: #ffffff; font-size: 16px; font-weight: 600;">
                      Greenland Oregon
                    </p>
                    <p style="margin: 0 0 15px; color: rgba(255,255,255,0.7); font-size: 13px;">
                      Premium Apartment Living in Oregon
                    </p>
                    <p style="margin: 0; color: rgba(255,255,255,0.5); font-size: 12px;">
                      © ${new Date().getFullYear()} Greenland Group. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: "Greenland Oregon <noreply@greenlandoregon.com>",
      to: [to],
      subject: `Application Confirmed - ${confirmationNumber}`,
      html: emailHtml,
    });

    logStep("PRODUCTION: Email sent successfully", { 
      emailId: emailResponse.data?.id,
      recipient: to,
      confirmation: confirmationNumber
    });

    return new Response(JSON.stringify({ 
      success: true, 
      data: emailResponse,
      message: "Confirmation email sent successfully"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logStep("ERROR: Failed to send email", { message: errorMessage });
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
