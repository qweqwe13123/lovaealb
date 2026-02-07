import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import StepIndicator from "@/components/application/StepIndicator";
import PersonalInfoStep from "@/components/application/PersonalInfoStep";
import AddressHistoryStep from "@/components/application/AddressHistoryStep";
import EmploymentStep from "@/components/application/EmploymentStep";
import PetsVehiclesStep from "@/components/application/PetsVehiclesStep";
import ReviewSubmitStep from "@/components/application/ReviewSubmitStep";
import { ApplicationFormData, initialFormData } from "@/types/application";

const STEP_LABELS = [
  "Personal Info",
  "Address History",
  "Employment",
  "Pets & Contacts",
  "Review & Pay"
];

const Apply = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);

  const wasCanceled = searchParams.get("canceled") === "true";

  const handleChange = (field: keyof ApplicationFormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.dateOfBirth || !formData.phone || !formData.email) {
          toast({
            title: "Required Fields",
            description: "Please fill in all required personal information fields.",
            variant: "destructive",
          });
          return false;
        }
        if (formData.isUsCitizen === null) {
          toast({
            title: "Required Field",
            description: "Please indicate if you are a US citizen.",
            variant: "destructive",
          });
          return false;
        }
        if (formData.isUsCitizen && !formData.ssn) {
          toast({
            title: "Required Field",
            description: "Please provide your Social Security Number.",
            variant: "destructive",
          });
          return false;
        }
        if (!formData.isUsCitizen && (!formData.governmentIdType || formData.governmentIdFiles.length === 0)) {
          toast({
            title: "Required Field",
            description: "Please select ID type and upload your government ID.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 2:
        if (!formData.currentAddress || !formData.currentCity || !formData.currentState || !formData.currentZip ||
            !formData.currentDateMovedIn || !formData.currentMonthlyRent || !formData.currentReasonLeaving ||
            !formData.currentLandlordName || !formData.currentLandlordPhone || !formData.currentLandlordEmail) {
          toast({
            title: "Required Fields",
            description: "Please fill in all current residence information.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 3:
        if (!formData.employmentStatus) {
          toast({
            title: "Required Field",
            description: "Please select your employment status.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 4:
        if (!formData.emergencyFirstName || !formData.emergencyLastName || !formData.emergencyRelationship || !formData.emergencyPhone) {
          toast({
            title: "Required Fields",
            description: "Please fill in all emergency contact information.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Upload ID files if any
      let governmentIdFileUrls: string[] = [];
      if (formData.governmentIdFiles.length > 0) {
        for (const file of formData.governmentIdFiles) {
          const fileName = `${Date.now()}-${file.name}`;
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from("application-documents")
            .upload(fileName, file);

          if (uploadError) {
            console.error("Upload error:", uploadError);
          } else if (uploadData) {
            governmentIdFileUrls.push(uploadData.path);
          }
        }
      }

      const applicationPayload = {
        ...formData,
        governmentIdFiles: governmentIdFileUrls,
        adultsCount: 1 + formData.additionalOccupants.length,
        petsCount: formData.hasPets ? formData.petsCount : 0,
      };

      const { data, error } = await supabase.functions.invoke("create-application-payment", {
        body: { applicationData: applicationPayload },
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error",
        description: "Failed to process your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-12 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-2">
            Rental Application
          </h1>
          <p className="text-primary-foreground/80">
            Complete your application to join the Greenland community
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          {wasCanceled && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
              <p className="text-destructive">Payment was canceled. Please complete your application to proceed.</p>
            </div>
          )}

          <StepIndicator currentStep={step} totalSteps={5} stepLabels={STEP_LABELS} />

          {step === 1 && (
            <PersonalInfoStep
              formData={formData}
              onChange={handleChange}
              onNext={nextStep}
            />
          )}

          {step === 2 && (
            <AddressHistoryStep
              formData={formData}
              onChange={handleChange}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {step === 3 && (
            <EmploymentStep
              formData={formData}
              onChange={handleChange}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {step === 4 && (
            <PetsVehiclesStep
              formData={formData}
              onChange={handleChange}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {step === 5 && (
            <ReviewSubmitStep
              formData={formData}
              onChange={handleChange}
              onPrev={prevStep}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Apply;
