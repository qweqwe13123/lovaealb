import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";
import { ApplicationFormData } from "@/types/application";

interface AddressHistoryStepProps {
  formData: ApplicationFormData;
  onChange: (field: keyof ApplicationFormData, value: unknown) => void;
  onNext: () => void;
  onPrev: () => void;
}

const AddressHistoryStep = ({ formData, onChange, onNext, onPrev }: AddressHistoryStepProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="w-5 h-5" />
          Current Address & Rental History
        </CardTitle>
        <CardDescription>Your current and previous residence information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Residence */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Current Residence</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentAddress">Current Address *</Label>
              <Input
                id="currentAddress"
                value={formData.currentAddress}
                onChange={(e) => onChange("currentAddress", e.target.value)}
                placeholder="Street address"
                required
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="currentCity">City *</Label>
                <Input
                  id="currentCity"
                  value={formData.currentCity}
                  onChange={(e) => onChange("currentCity", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="currentState">State *</Label>
                <Input
                  id="currentState"
                  value={formData.currentState}
                  onChange={(e) => onChange("currentState", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="currentZip">ZIP Code *</Label>
                <Input
                  id="currentZip"
                  value={formData.currentZip}
                  onChange={(e) => onChange("currentZip", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentDateMovedIn">Date Moved In *</Label>
                <Input
                  id="currentDateMovedIn"
                  type="date"
                  value={formData.currentDateMovedIn}
                  onChange={(e) => onChange("currentDateMovedIn", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="currentMonthlyRent">Monthly Rent *</Label>
                <Input
                  id="currentMonthlyRent"
                  type="number"
                  value={formData.currentMonthlyRent}
                  onChange={(e) => onChange("currentMonthlyRent", e.target.value)}
                  placeholder="$"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="currentReasonLeaving">Reason for Leaving *</Label>
              <Textarea
                id="currentReasonLeaving"
                value={formData.currentReasonLeaving}
                onChange={(e) => onChange("currentReasonLeaving", e.target.value)}
                rows={2}
                required
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="currentLandlordName">Landlord/Property Manager Name *</Label>
                <Input
                  id="currentLandlordName"
                  value={formData.currentLandlordName}
                  onChange={(e) => onChange("currentLandlordName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="currentLandlordPhone">Phone Number *</Label>
                <Input
                  id="currentLandlordPhone"
                  type="tel"
                  value={formData.currentLandlordPhone}
                  onChange={(e) => onChange("currentLandlordPhone", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="currentLandlordEmail">Email *</Label>
                <Input
                  id="currentLandlordEmail"
                  type="email"
                  value={formData.currentLandlordEmail}
                  onChange={(e) => onChange("currentLandlordEmail", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Previous Residence */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-lg mb-4">Previous Residence</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="previousAddress">Previous Address</Label>
              <Input
                id="previousAddress"
                value={formData.previousAddress}
                onChange={(e) => onChange("previousAddress", e.target.value)}
                placeholder="Street address"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="previousCity">City</Label>
                <Input
                  id="previousCity"
                  value={formData.previousCity}
                  onChange={(e) => onChange("previousCity", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="previousState">State</Label>
                <Input
                  id="previousState"
                  value={formData.previousState}
                  onChange={(e) => onChange("previousState", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="previousZip">ZIP Code</Label>
                <Input
                  id="previousZip"
                  value={formData.previousZip}
                  onChange={(e) => onChange("previousZip", e.target.value)}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="previousDateMovedIn">Date Moved In</Label>
                <Input
                  id="previousDateMovedIn"
                  type="date"
                  value={formData.previousDateMovedIn}
                  onChange={(e) => onChange("previousDateMovedIn", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="previousDateMovedOut">Date Moved Out</Label>
                <Input
                  id="previousDateMovedOut"
                  type="date"
                  value={formData.previousDateMovedOut}
                  onChange={(e) => onChange("previousDateMovedOut", e.target.value)}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="previousMonthlyRent">Monthly Rent</Label>
                <Input
                  id="previousMonthlyRent"
                  type="number"
                  value={formData.previousMonthlyRent}
                  onChange={(e) => onChange("previousMonthlyRent", e.target.value)}
                  placeholder="$"
                />
              </div>
              <div>
                <Label htmlFor="previousLandlordName">Landlord/Property Manager Name</Label>
                <Input
                  id="previousLandlordName"
                  value={formData.previousLandlordName}
                  onChange={(e) => onChange("previousLandlordName", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="previousReasonLeaving">Reason for Leaving</Label>
              <Textarea
                id="previousReasonLeaving"
                value={formData.previousReasonLeaving}
                onChange={(e) => onChange("previousReasonLeaving", e.target.value)}
                rows={2}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onPrev}>
            Previous
          </Button>
          <Button type="button" onClick={onNext} className="bg-primary hover:bg-primary/90">
            Next Step
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressHistoryStep;
