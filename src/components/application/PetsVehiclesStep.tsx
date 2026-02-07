import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PawPrint, Car, Plus, Trash2, Phone, AlertTriangle } from "lucide-react";
import { ApplicationFormData, Pet, Vehicle } from "@/types/application";

interface PetsVehiclesStepProps {
  formData: ApplicationFormData;
  onChange: (field: keyof ApplicationFormData, value: unknown) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PetsVehiclesStep = ({ formData, onChange, onNext, onPrev }: PetsVehiclesStepProps) => {
  // Handle pets count change
  const handlePetsCountChange = (count: number) => {
    onChange("petsCount", count);
    const currentPets = formData.petsData;
    if (count > currentPets.length) {
      // Add more pets
      const newPets: Pet[] = [...currentPets];
      for (let i = currentPets.length; i < count; i++) {
        newPets.push({ type: "dog" });
      }
      onChange("petsData", newPets);
    } else if (count < currentPets.length) {
      // Remove pets
      onChange("petsData", currentPets.slice(0, count));
    }
  };

  const updatePet = (index: number, field: keyof Pet, value: string) => {
    const updated = formData.petsData.map((pet, i) =>
      i === index ? { ...pet, [field]: value } : pet
    );
    onChange("petsData", updated);
  };

  // Vehicles handlers
  const addVehicle = () => {
    const newVehicle: Vehicle = {
      make: "",
      model: "",
      year: "",
      color: "",
      licensePlate: "",
      state: "",
    };
    onChange("vehicles", [...formData.vehicles, newVehicle]);
  };

  const removeVehicle = (index: number) => {
    onChange("vehicles", formData.vehicles.filter((_, i) => i !== index));
  };

  const updateVehicle = (index: number, field: keyof Vehicle, value: string) => {
    const updated = formData.vehicles.map((v, i) =>
      i === index ? { ...v, [field]: value } : v
    );
    onChange("vehicles", updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PawPrint className="w-5 h-5" />
          Pets, Emergency Contact & Vehicles
        </CardTitle>
        <CardDescription>Pet information, emergency contact, and vehicle details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pets Section */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Pets</h3>
          <div className="space-y-4">
            <div>
              <Label>Do you have any pets? *</Label>
              <RadioGroup
                className="flex gap-6 mt-2"
                value={formData.hasPets ? "yes" : "no"}
                onValueChange={(v) => {
                  const hasPets = v === "yes";
                  onChange("hasPets", hasPets);
                  if (!hasPets) {
                    onChange("petsCount", 0);
                    onChange("petsData", []);
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="pets-yes" />
                  <Label htmlFor="pets-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="pets-no" />
                  <Label htmlFor="pets-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.hasPets && (
              <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                <div>
                  <Label htmlFor="petsCount">How many pets do you have? *</Label>
                  <Input
                    id="petsCount"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.petsCount || ""}
                    onChange={(e) => handlePetsCountChange(parseInt(e.target.value) || 0)}
                    className="max-w-[100px]"
                  />
                </div>

                {formData.petsData.map((pet, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 bg-background">
                    <h4 className="font-medium mb-3">Pet {index + 1}</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Pet Type *</Label>
                        <Select
                          value={pet.type}
                          onValueChange={(value) => updatePet(index, "type", value as Pet["type"])}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dog">Dog</SelectItem>
                            <SelectItem value="cat">Cat</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {pet.type === "other" && (
                        <div>
                          <Label>Please describe the animal *</Label>
                          <Input
                            value={pet.otherDescription || ""}
                            onChange={(e) => updatePet(index, "otherDescription", e.target.value)}
                            placeholder="e.g., Hamster, Fish"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {formData.petsCount > 0 && (
                  <div className="border-t pt-4">
                    <Label>Has any of your pets caused property damage in a previous rental? *</Label>
                    <RadioGroup
                      className="flex gap-6 mt-2"
                      value={formData.petsCausedDamage ? "yes" : "no"}
                      onValueChange={(v) => onChange("petsCausedDamage", v === "yes")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="damage-yes" />
                        <Label htmlFor="damage-yes" className="font-normal cursor-pointer">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="damage-no" />
                        <Label htmlFor="damage-no" className="font-normal cursor-pointer">No</Label>
                      </div>
                    </RadioGroup>
                    {formData.petsCausedDamage && (
                      <div className="mt-3">
                        <Label>Please explain *</Label>
                        <Textarea
                          value={formData.petsDamageExplain}
                          onChange={(e) => onChange("petsDamageExplain", e.target.value)}
                          rows={2}
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Pet fee: $30 per pet</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="border-t pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Phone className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Emergency Contact</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Emergency contact must NOT reside in the unit.
          </p>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyFirstName">First Name *</Label>
                <Input
                  id="emergencyFirstName"
                  value={formData.emergencyFirstName}
                  onChange={(e) => onChange("emergencyFirstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="emergencyLastName">Last Name *</Label>
                <Input
                  id="emergencyLastName"
                  value={formData.emergencyLastName}
                  onChange={(e) => onChange("emergencyLastName", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="emergencyRelationship">Relationship *</Label>
                <Input
                  id="emergencyRelationship"
                  value={formData.emergencyRelationship}
                  onChange={(e) => onChange("emergencyRelationship", e.target.value)}
                  placeholder="e.g., Parent, Sibling"
                  required
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Phone Number *</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => onChange("emergencyPhone", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="emergencyEmail">Email</Label>
                <Input
                  id="emergencyEmail"
                  type="email"
                  value={formData.emergencyEmail}
                  onChange={(e) => onChange("emergencyEmail", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Has access to the unit? *</Label>
              <RadioGroup
                className="flex gap-6 mt-2"
                value={formData.emergencyHasAccess ? "yes" : "no"}
                onValueChange={(v) => onChange("emergencyHasAccess", v === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="access-yes" />
                  <Label htmlFor="access-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="access-no" />
                  <Label htmlFor="access-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* Vehicles */}
        <div className="border-t pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Car className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Vehicles</h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Do you have a vehicle?</Label>
              <RadioGroup
                className="flex gap-6 mt-2"
                value={formData.hasVehicle ? "yes" : "no"}
                onValueChange={(v) => {
                  const hasVehicle = v === "yes";
                  onChange("hasVehicle", hasVehicle);
                  if (hasVehicle && formData.vehicles.length === 0) {
                    addVehicle();
                  } else if (!hasVehicle) {
                    onChange("vehicles", []);
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="vehicle-yes" />
                  <Label htmlFor="vehicle-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="vehicle-no" />
                  <Label htmlFor="vehicle-no" className="font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.hasVehicle && (
              <div className="space-y-4">
                {formData.vehicles.map((vehicle, index) => (
                  <div key={index} className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">Vehicle {index + 1}</span>
                      {formData.vehicles.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeVehicle(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label>Make</Label>
                        <Input
                          value={vehicle.make}
                          onChange={(e) => updateVehicle(index, "make", e.target.value)}
                          placeholder="e.g., Toyota"
                        />
                      </div>
                      <div>
                        <Label>Model</Label>
                        <Input
                          value={vehicle.model}
                          onChange={(e) => updateVehicle(index, "model", e.target.value)}
                          placeholder="e.g., Camry"
                        />
                      </div>
                      <div>
                        <Label>Year</Label>
                        <Input
                          value={vehicle.year}
                          onChange={(e) => updateVehicle(index, "year", e.target.value)}
                          placeholder="e.g., 2020"
                        />
                      </div>
                      <div>
                        <Label>Color</Label>
                        <Input
                          value={vehicle.color}
                          onChange={(e) => updateVehicle(index, "color", e.target.value)}
                          placeholder="e.g., Silver"
                        />
                      </div>
                      <div>
                        <Label>License Plate</Label>
                        <Input
                          value={vehicle.licensePlate}
                          onChange={(e) => updateVehicle(index, "licensePlate", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>State</Label>
                        <Input
                          value={vehicle.state}
                          onChange={(e) => updateVehicle(index, "state", e.target.value)}
                          placeholder="e.g., OR"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addVehicle}>
                  <Plus className="w-4 h-4 mr-1" /> Add Another Vehicle
                </Button>
              </div>
            )}
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

export default PetsVehiclesStep;
