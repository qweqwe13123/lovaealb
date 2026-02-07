import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Shield, CreditCard, CheckCircle } from "lucide-react";
import { ApplicationFormData } from "@/types/application";

interface ReviewSubmitStepProps {
  formData: ApplicationFormData;
  onChange: (field: keyof ApplicationFormData, value: unknown) => void;
  onPrev: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const ReviewSubmitStep = ({ formData, onChange, onPrev, onSubmit, isLoading }: ReviewSubmitStepProps) => {
  // Calculate fees
  const adultsCount = 1 + formData.additionalOccupants.length; // Primary applicant + additional occupants
  const petsCount = formData.hasPets ? formData.petsCount : 0;
  const adultsFee = adultsCount * 1;
  const petsFee = petsCount * 1;
  const totalFee = adultsFee + petsFee;

  const allCertificationsChecked = 
    formData.certificationTrueInfo &&
    formData.certificationVerifyInfo &&
    formData.certificationBackgroundCheck &&
    formData.certificationFalseInfoDenial &&
    formData.certificationNonRefundable &&
    formData.certificationTerms;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Required Disclosures & Payment
        </CardTitle>
        <CardDescription>Review and authorize your application</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Review Summary */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Application Summary</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Applicant:</span>
              <p className="font-medium">{formData.firstName} {formData.lastName}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Email:</span>
              <p className="font-medium">{formData.email}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Phone:</span>
              <p className="font-medium">{formData.phone}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Current Address:</span>
              <p className="font-medium">{formData.currentCity}, {formData.currentState}</p>
            </div>
            {formData.additionalOccupants.length > 0 && (
              <div>
                <span className="text-muted-foreground">Additional Occupants:</span>
                <p className="font-medium">{formData.additionalOccupants.length} person(s)</p>
              </div>
            )}
            {formData.hasPets && (
              <div>
                <span className="text-muted-foreground">Pets:</span>
                <p className="font-medium">{petsCount} pet(s)</p>
              </div>
            )}
          </div>
        </div>

        {/* Authorizations */}
        <div className="border-t pt-6">
          <h3 className="font-semibold mb-4">Required Authorizations</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="cert1"
                checked={formData.certificationTrueInfo}
                onCheckedChange={(checked) => onChange("certificationTrueInfo", checked)}
              />
              <Label htmlFor="cert1" className="text-sm leading-relaxed cursor-pointer">
                I certify that the information provided is true and complete. *
              </Label>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="cert2"
                checked={formData.certificationVerifyInfo}
                onCheckedChange={(checked) => onChange("certificationVerifyInfo", checked)}
              />
              <Label htmlFor="cert2" className="text-sm leading-relaxed cursor-pointer">
                I authorize the landlord to verify all information provided. *
              </Label>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="cert3"
                checked={formData.certificationBackgroundCheck}
                onCheckedChange={(checked) => onChange("certificationBackgroundCheck", checked)}
              />
              <Label htmlFor="cert3" className="text-sm leading-relaxed cursor-pointer">
                I authorize a consumer credit report, criminal background check, and rental history screening. *
              </Label>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="cert4"
                checked={formData.certificationFalseInfoDenial}
                onCheckedChange={(checked) => onChange("certificationFalseInfoDenial", checked)}
              />
              <Label htmlFor="cert4" className="text-sm leading-relaxed cursor-pointer">
                I understand that providing false information may result in denial. *
              </Label>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="cert5"
                checked={formData.certificationNonRefundable}
                onCheckedChange={(checked) => onChange("certificationNonRefundable", checked)}
              />
              <Label htmlFor="cert5" className="text-sm leading-relaxed cursor-pointer">
                I acknowledge the application fee is non-refundable. *
              </Label>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="cert6"
                checked={formData.certificationTerms}
                onCheckedChange={(checked) => onChange("certificationTerms", checked)}
              />
              <Label htmlFor="cert6" className="text-sm leading-relaxed cursor-pointer">
                I agree to the terms and conditions. *
              </Label>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="border-t pt-6">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">Application Fee & Payment</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Adults (18+) × {adultsCount}</span>
                <span className="font-medium">${adultsFee.toFixed(2)}</span>
              </div>
              {petsCount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Pets × {petsCount}</span>
                  <span className="font-medium">${petsFee.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="font-semibold text-lg">Total Due</span>
                <span className="font-bold text-xl text-primary">${totalFee.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {!allCertificationsChecked && (
          <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <CheckCircle className="w-5 h-5 text-amber-600" />
            <span className="text-sm text-amber-800">
              Please check all authorization boxes to proceed with payment
            </span>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onPrev}>
            Previous
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            className="bg-primary hover:bg-primary/90"
            disabled={isLoading || !allCertificationsChecked}
          >
            {isLoading ? "Processing..." : `Pay $${totalFee.toFixed(2)} & Submit`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewSubmitStep;
