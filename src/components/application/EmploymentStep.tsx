import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Briefcase, AlertCircle } from "lucide-react";
import { ApplicationFormData } from "@/types/application";

interface EmploymentStepProps {
  formData: ApplicationFormData;
  onChange: (field: keyof ApplicationFormData, value: unknown) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface ScreeningQuestionProps {
  id: string;
  question: string;
  value: boolean;
  explainValue: string;
  onValueChange: (value: boolean) => void;
  onExplainChange: (value: string) => void;
}

const ScreeningQuestion = ({ id, question, value, explainValue, onValueChange, onExplainChange }: ScreeningQuestionProps) => (
  <div className="border-b pb-4 last:border-0">
    <Label className="text-sm font-medium">{question} *</Label>
    <RadioGroup
      className="flex gap-6 mt-2"
      value={value ? "yes" : "no"}
      onValueChange={(v) => onValueChange(v === "yes")}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="yes" id={`${id}-yes`} />
        <Label htmlFor={`${id}-yes`} className="font-normal cursor-pointer">Yes</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="no" id={`${id}-no`} />
        <Label htmlFor={`${id}-no`} className="font-normal cursor-pointer">No</Label>
      </div>
    </RadioGroup>
    {value && (
      <div className="mt-3">
        <Label className="text-sm">Please explain *</Label>
        <Textarea
          value={explainValue}
          onChange={(e) => onExplainChange(e.target.value)}
          rows={2}
          className="mt-1"
        />
      </div>
    )}
  </div>
);

const EmploymentStep = ({ formData, onChange, onNext, onPrev }: EmploymentStepProps) => {
  const showEmployerFields = formData.employmentStatus === "employed" || formData.employmentStatus === "self_employed";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Employment & Income Information
        </CardTitle>
        <CardDescription>Your current employment and income details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Employment Status */}
        <div>
          <Label htmlFor="employmentStatus">Employment Status *</Label>
          <Select
            value={formData.employmentStatus}
            onValueChange={(value) => onChange("employmentStatus", value)}
          >
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employed">Employed</SelectItem>
              <SelectItem value="self_employed">Self-Employed</SelectItem>
              <SelectItem value="unemployed">Unemployed</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
              <SelectItem value="student">Student</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Employer Details */}
        {showEmployerFields && (
          <div className="bg-muted/50 p-4 rounded-lg space-y-4">
            <h3 className="font-semibold">Current Employer</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employerName">Employer Name *</Label>
                <Input
                  id="employerName"
                  value={formData.employerName}
                  onChange={(e) => onChange("employerName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => onChange("jobTitle", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="supervisorName">Supervisor Name</Label>
                <Input
                  id="supervisorName"
                  value={formData.supervisorName}
                  onChange={(e) => onChange("supervisorName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="employerPhone">Phone Number *</Label>
                <Input
                  id="employerPhone"
                  type="tel"
                  value={formData.employerPhone}
                  onChange={(e) => onChange("employerPhone", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employmentStartDate">Employment Start Date *</Label>
                <Input
                  id="employmentStartDate"
                  type="date"
                  value={formData.employmentStartDate}
                  onChange={(e) => onChange("employmentStartDate", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="grossMonthlyIncome">Gross Monthly Income *</Label>
                <Input
                  id="grossMonthlyIncome"
                  type="number"
                  value={formData.grossMonthlyIncome}
                  onChange={(e) => onChange("grossMonthlyIncome", e.target.value)}
                  placeholder="$"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Additional Income */}
        <div className="border-t pt-6">
          <h3 className="font-semibold mb-4">Additional Income (Optional)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="otherIncomeSource">Other Income Source</Label>
              <Input
                id="otherIncomeSource"
                value={formData.otherIncomeSource}
                onChange={(e) => onChange("otherIncomeSource", e.target.value)}
                placeholder="e.g., Investments, Alimony"
              />
            </div>
            <div>
              <Label htmlFor="otherIncomeAmount">Amount (Monthly)</Label>
              <Input
                id="otherIncomeAmount"
                type="number"
                value={formData.otherIncomeAmount}
                onChange={(e) => onChange("otherIncomeAmount", e.target.value)}
                placeholder="$"
              />
            </div>
          </div>
        </div>

        {/* Screening Questions */}
        <div className="border-t pt-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">General Screening Questions</h3>
          </div>
          <div className="space-y-4">
            <ScreeningQuestion
              id="suedForRent"
              question="Have you ever been sued for rent?"
              value={formData.screeningSuedForRent}
              explainValue={formData.screeningSuedForRentExplain}
              onValueChange={(v) => onChange("screeningSuedForRent", v)}
              onExplainChange={(v) => onChange("screeningSuedForRentExplain", v)}
            />
            <ScreeningQuestion
              id="suedForDamages"
              question="Have you ever been sued for damages to a rental property?"
              value={formData.screeningSuedForDamages}
              explainValue={formData.screeningSuedForDamagesExplain}
              onValueChange={(v) => onChange("screeningSuedForDamages", v)}
              onExplainChange={(v) => onChange("screeningSuedForDamagesExplain", v)}
            />
            <ScreeningQuestion
              id="evicted"
              question="Have you ever been evicted?"
              value={formData.screeningEvicted}
              explainValue={formData.screeningEvictedExplain}
              onValueChange={(v) => onChange("screeningEvicted", v)}
              onExplainChange={(v) => onChange("screeningEvictedExplain", v)}
            />
            <ScreeningQuestion
              id="defaultedLease"
              question="Have you ever defaulted on a lease?"
              value={formData.screeningDefaultedLease}
              explainValue={formData.screeningDefaultedLeaseExplain}
              onValueChange={(v) => onChange("screeningDefaultedLease", v)}
              onExplainChange={(v) => onChange("screeningDefaultedLeaseExplain", v)}
            />
            <ScreeningQuestion
              id="judgment"
              question="Have you ever had a judgment or repossession?"
              value={formData.screeningJudgment}
              explainValue={formData.screeningJudgmentExplain}
              onValueChange={(v) => onChange("screeningJudgment", v)}
              onExplainChange={(v) => onChange("screeningJudgmentExplain", v)}
            />
            <ScreeningQuestion
              id="bankruptcy"
              question="Have you ever filed for bankruptcy protection?"
              value={formData.screeningBankruptcy}
              explainValue={formData.screeningBankruptcyExplain}
              onValueChange={(v) => onChange("screeningBankruptcy", v)}
              onExplainChange={(v) => onChange("screeningBankruptcyExplain", v)}
            />
          </div>
        </div>

        {/* Criminal Background */}
        <div className="border-t pt-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-amber-800">
              <strong>Oregon law</strong> requires individualized assessment of criminal history.
            </p>
          </div>
          <ScreeningQuestion
            id="felony"
            question="Have you ever been convicted of a felony involving violence against persons, destruction of property, controlled substances, firearms, or sex offenses?"
            value={formData.screeningFelony}
            explainValue={formData.screeningFelonyExplain}
            onValueChange={(v) => onChange("screeningFelony", v)}
            onExplainChange={(v) => onChange("screeningFelonyExplain", v)}
          />
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

export default EmploymentStep;
