export interface Occupant {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  relationship: string;
  willLiveInUnit: boolean;
}

export interface Pet {
  type: "dog" | "cat" | "other";
  otherDescription?: string;
}

export interface Vehicle {
  make: string;
  model: string;
  year: string;
  color: string;
  licensePlate: string;
  state: string;
}

export interface ApplicationFormData {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  isUsCitizen: boolean | null;
  ssn: string;
  governmentIdType: string;
  governmentIdFiles: File[];
  additionalOccupants: Occupant[];

  // Step 2: Address & Rental History
  currentAddress: string;
  currentCity: string;
  currentState: string;
  currentZip: string;
  currentDateMovedIn: string;
  currentMonthlyRent: string;
  currentReasonLeaving: string;
  currentLandlordName: string;
  currentLandlordPhone: string;
  currentLandlordEmail: string;
  previousAddress: string;
  previousCity: string;
  previousState: string;
  previousZip: string;
  previousDateMovedIn: string;
  previousDateMovedOut: string;
  previousMonthlyRent: string;
  previousReasonLeaving: string;
  previousLandlordName: string;

  // Step 3: Employment & Income
  employmentStatus: string;
  employerName: string;
  jobTitle: string;
  supervisorName: string;
  employerPhone: string;
  employmentStartDate: string;
  grossMonthlyIncome: string;
  otherIncomeSource: string;
  otherIncomeAmount: string;

  // Screening Questions
  screeningSuedForRent: boolean;
  screeningSuedForRentExplain: string;
  screeningSuedForDamages: boolean;
  screeningSuedForDamagesExplain: string;
  screeningEvicted: boolean;
  screeningEvictedExplain: string;
  screeningDefaultedLease: boolean;
  screeningDefaultedLeaseExplain: string;
  screeningJudgment: boolean;
  screeningJudgmentExplain: string;
  screeningBankruptcy: boolean;
  screeningBankruptcyExplain: string;
  screeningFelony: boolean;
  screeningFelonyExplain: string;

  // Step 4: Pets
  hasPets: boolean;
  petsCount: number;
  petsData: Pet[];
  petsCausedDamage: boolean;
  petsDamageExplain: string;

  // Emergency Contact
  emergencyFirstName: string;
  emergencyLastName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  emergencyEmail: string;
  emergencyHasAccess: boolean;

  // Vehicles
  hasVehicle: boolean;
  vehicles: Vehicle[];

  // Certifications
  certificationTrueInfo: boolean;
  certificationVerifyInfo: boolean;
  certificationBackgroundCheck: boolean;
  certificationFalseInfoDenial: boolean;
  certificationNonRefundable: boolean;
  certificationTerms: boolean;
}

export const initialFormData: ApplicationFormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  phone: "",
  email: "",
  isUsCitizen: null,
  ssn: "",
  governmentIdType: "",
  governmentIdFiles: [],
  additionalOccupants: [],
  currentAddress: "",
  currentCity: "",
  currentState: "",
  currentZip: "",
  currentDateMovedIn: "",
  currentMonthlyRent: "",
  currentReasonLeaving: "",
  currentLandlordName: "",
  currentLandlordPhone: "",
  currentLandlordEmail: "",
  previousAddress: "",
  previousCity: "",
  previousState: "",
  previousZip: "",
  previousDateMovedIn: "",
  previousDateMovedOut: "",
  previousMonthlyRent: "",
  previousReasonLeaving: "",
  previousLandlordName: "",
  employmentStatus: "",
  employerName: "",
  jobTitle: "",
  supervisorName: "",
  employerPhone: "",
  employmentStartDate: "",
  grossMonthlyIncome: "",
  otherIncomeSource: "",
  otherIncomeAmount: "",
  screeningSuedForRent: false,
  screeningSuedForRentExplain: "",
  screeningSuedForDamages: false,
  screeningSuedForDamagesExplain: "",
  screeningEvicted: false,
  screeningEvictedExplain: "",
  screeningDefaultedLease: false,
  screeningDefaultedLeaseExplain: "",
  screeningJudgment: false,
  screeningJudgmentExplain: "",
  screeningBankruptcy: false,
  screeningBankruptcyExplain: "",
  screeningFelony: false,
  screeningFelonyExplain: "",
  hasPets: false,
  petsCount: 0,
  petsData: [],
  petsCausedDamage: false,
  petsDamageExplain: "",
  emergencyFirstName: "",
  emergencyLastName: "",
  emergencyRelationship: "",
  emergencyPhone: "",
  emergencyEmail: "",
  emergencyHasAccess: false,
  hasVehicle: false,
  vehicles: [],
  certificationTrueInfo: false,
  certificationVerifyInfo: false,
  certificationBackgroundCheck: false,
  certificationFalseInfoDenial: false,
  certificationNonRefundable: false,
  certificationTerms: false,
};
