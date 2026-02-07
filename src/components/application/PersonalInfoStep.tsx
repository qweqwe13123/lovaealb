import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Plus, Trash2, Upload } from "lucide-react";
import { ApplicationFormData, Occupant } from "@/types/application";

interface PersonalInfoStepProps {
  formData: ApplicationFormData;
  onChange: (field: keyof ApplicationFormData, value: unknown) => void;
  onNext: () => void;
}

const PersonalInfoStep = ({ formData, onChange, onNext }: PersonalInfoStepProps) => {
  const addOccupant = () => {
    const newOccupant: Occupant = {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      relationship: "",
      willLiveInUnit: true,
    };
    onChange("additionalOccupants", [...formData.additionalOccupants, newOccupant]);
  };

  const removeOccupant = (index: number) => {
    const updated = formData.additionalOccupants.filter((_, i) => i !== index);
    onChange("additionalOccupants", updated);
  };

  const updateOccupant = (index: number, field: keyof Occupant, value: unknown) => {
    const updated = formData.additionalOccupants.map((occ, i) => 
      i === index ? { ...occ, [field]: value } : occ
    );
    onChange("additionalOccupants", updated);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChange("governmentIdFiles", Array.from(e.target.files));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Personal Information
        </CardTitle>
        <CardDescription>Please provide your legal information as it appears on official documents</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Legal First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Legal Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => onChange("dateOfBirth", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="(555) 123-4567"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onChange("email", e.target.value)}
              required
            />
          </div>
        </div>

        {/* US Citizen Question */}
        <div className="border-t pt-6">
          <Label className="text-base font-semibold">Are you a US Citizen? *</Label>
          <RadioGroup
            className="flex gap-6 mt-3"
            value={formData.isUsCitizen === null ? "" : formData.isUsCitizen ? "yes" : "no"}
            onValueChange={(value) => onChange("isUsCitizen", value === "yes")}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="citizen-yes" />
              <Label htmlFor="citizen-yes" className="font-normal cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="citizen-no" />
              <Label htmlFor="citizen-no" className="font-normal cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* SSN or Government ID */}
        {formData.isUsCitizen === true && (
          <div className="bg-muted/50 p-4 rounded-lg">
            <Label htmlFor="ssn">Social Security Number *</Label>
            <Input
              id="ssn"
              type="password"
              value={formData.ssn}
              onChange={(e) => onChange("ssn", e.target.value)}
              placeholder="XXX-XX-XXXX"
              className="max-w-xs"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Your SSN is encrypted and used only for background check purposes
            </p>
          </div>
        )}

        {formData.isUsCitizen === false && (
          <div className="bg-muted/50 p-4 rounded-lg space-y-4">
            <div>
              <Label htmlFor="governmentIdType">Government Issued ID Type *</Label>
              <Select
                value={formData.governmentIdType}
                onValueChange={(value) => onChange("governmentIdType", value)}
              >
                <SelectTrigger className="max-w-xs">
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drivers_license">Driver's License</SelectItem>
                  <SelectItem value="state_id">State ID</SelectItem>
                  <SelectItem value="passport">Passport</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="idUpload">Upload ID Photos *</Label>
              <div className="mt-2">
                <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors max-w-md">
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formData.governmentIdFiles.length > 0 
                      ? `${formData.governmentIdFiles.length} file(s) selected`
                      : "Click to upload front & back"
                    }
                  </span>
                  <input
                    id="idUpload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Additional Occupants */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Label className="text-base font-semibold">Additional Occupants</Label>
              <p className="text-sm text-muted-foreground">
                Add anyone 18+ who will be living with you
              </p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addOccupant}>
              <Plus className="w-4 h-4 mr-1" /> Add Person
            </Button>
          </div>

          {formData.additionalOccupants.map((occupant, index) => (
            <div key={index} className="bg-muted/50 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Occupant {index + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOccupant(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Legal First Name *</Label>
                  <Input
                    value={occupant.firstName}
                    onChange={(e) => updateOccupant(index, "firstName", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Legal Last Name *</Label>
                  <Input
                    value={occupant.lastName}
                    onChange={(e) => updateOccupant(index, "lastName", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Date of Birth *</Label>
                  <Input
                    type="date"
                    value={occupant.dateOfBirth}
                    onChange={(e) => updateOccupant(index, "dateOfBirth", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Relationship to Applicant *</Label>
                  <Select
                    value={occupant.relationship}
                    onValueChange={(value) => updateOccupant(index, "relationship", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="partner">Partner</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="roommate">Roommate</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-3">
                <Label>Will this person live in the unit? *</Label>
                <RadioGroup
                  className="flex gap-6 mt-2"
                  value={occupant.willLiveInUnit ? "yes" : "no"}
                  onValueChange={(value) => updateOccupant(index, "willLiveInUnit", value === "yes")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id={`live-yes-${index}`} />
                    <Label htmlFor={`live-yes-${index}`} className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id={`live-no-${index}`} />
                    <Label htmlFor={`live-no-${index}`} className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <Button type="button" onClick={onNext} className="bg-primary hover:bg-primary/90">
            Next Step
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoStep;
