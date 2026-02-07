import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Home, Phone, Mail, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ApplicationDetails {
  confirmationNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  totalFee: number;
}

const ApplicationSuccess = () => {
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get("application_id");
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [details, setDetails] = useState<ApplicationDetails | null>(null);

  useEffect(() => {
    let cancelled = false;

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const verifyPayment = async () => {
      if (!applicationId) {
        setVerifying(false);
        return;
      }

      // Retry because Stripe/webhook processing can be slightly delayed.
      // We poll for ~60s max and stop early once verified.
      const maxAttempts = 12;
      const delayMs = 5000;

      try {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
          if (cancelled) return;

          const { data, error } = await supabase.functions.invoke(
            "verify-application-payment",
            { body: { applicationId } }
          );

          if (error) {
            console.error("Verification error:", error);
          } else if (data?.verified) {
            setVerified(true);
            setDetails({
              confirmationNumber:
                data.confirmationNumber || `APP-${new Date().getFullYear()}-XXXXXX`,
              firstName: data.firstName || "",
              lastName: data.lastName || "",
              email: data.email || "",
              totalFee: data.totalFee || 0,
            });
            return;
          }

          // Not verified yet -> wait and try again
          if (attempt < maxAttempts) {
            await sleep(delayMs);
          }
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
      } finally {
        if (!cancelled) setVerifying(false);
      }
    };

    verifyPayment();

    return () => {
      cancelled = true;
    };
  }, [applicationId]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-12 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-2">
            {verifying ? "Processing..." : "Application Submitted!"}
          </h1>
        </div>
      </section>

      {/* Success Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {verifying ? (
                <div className="p-12 text-center">
                  <div className="animate-pulse">
                    <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-6"></div>
                    <p className="text-muted-foreground">Verifying your payment...</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Success Header */}
                  <div className="bg-gradient-to-r from-primary to-primary/80 p-8 text-center text-primary-foreground">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    <h2 className="text-2xl font-display font-bold mb-2">
                      Thank you for your application!
                    </h2>
                    <p className="text-primary-foreground/80">
                      Your rental application has been successfully submitted.
                    </p>
                  </div>

                  {/* Confirmation Details */}
                  <div className="p-8">
                    {verified && details && (
                      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Confirmation Number</p>
                        <p className="text-2xl font-mono font-bold text-primary tracking-wide">
                          {details.confirmationNumber}
                        </p>
                        {details.firstName && (
                          <p className="text-sm text-muted-foreground mt-3">
                            Applicant: {details.firstName} {details.lastName}
                          </p>
                        )}
                        {details.totalFee > 0 && (
                          <p className="text-sm text-muted-foreground">
                            Amount Paid: ${details.totalFee.toFixed(2)}
                          </p>
                        )}
                      </div>
                    )}

                    <p className="text-center text-muted-foreground mb-8">
                      We will review your application and contact you shortly regarding next steps.
                    </p>

                    {/* What's Next */}
                    <div className="bg-muted/50 rounded-xl p-6 mb-8">
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        What happens next?
                      </h3>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                            1
                          </div>
                          <div>
                            <p className="font-medium">Application Received</p>
                            <p className="text-sm text-muted-foreground">Thank you! Your application has been successfully submitted and is now under review.</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                            2
                          </div>
                          <div>
                            <p className="font-medium">What's Next</p>
                            <p className="text-sm text-muted-foreground">After reviewing your application, we will reach out to inform you of the next steps.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center mb-8">
                      <p className="text-sm text-muted-foreground mb-2">Questions about your application?</p>
                      <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
                        <a href="tel:+15036739426" className="flex items-center gap-1 text-primary hover:underline">
                          <Phone className="w-4 h-4" />
                          (503) 673-9426
                        </a>
                        <a href="mailto:greenlandlivingofficial@gmail.com" className="flex items-center gap-1 text-primary hover:underline">
                          <Mail className="w-4 h-4" />
                          greenlandlivingofficial@gmail.com
                        </a>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link to="/">
                        <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                          <Home className="w-4 h-4 mr-2" />
                          Back to Home
                        </Button>
                      </Link>
                      <Link to="/contact">
                        <Button variant="outline" className="w-full sm:w-auto">
                          <Phone className="w-4 h-4 mr-2" />
                          Contact Us
                        </Button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default ApplicationSuccess;
