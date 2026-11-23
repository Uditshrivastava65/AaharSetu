export type VerificationStatusType =
  | 'VERIFIED'
  | 'CONDITIONAL'
  | 'PENDING'
  | 'NOT AVAILABLE'
  | 'NOT APPLICABLE';

export type FoodCategory =
  | 'All'
  | 'Restaurants'
  | 'Restaurant'
  | 'Cafés'
  | 'Café'
  | 'Street Food'
  | 'Street Food / Chaat'
  | 'Bakeries'
  | 'Bakery'
  | 'Sweet Shops'
  | 'Sweet Shop'
  | 'Dhabas'
  | 'Cloud Kitchens'
  | 'Cloud Kitchen'
  | 'Traditional / Thali'
  | 'Fast Food / Snacks'
  | 'Dairy'
  | 'Food Manufacturers';

export interface InspectionRecord {
  id: string;
  date: string;
  year: number;
  authority: string;
  type: 'Routine Hygiene Audit' | 'Follow-up Verification' | 'Annual Licence Audit' | 'Surprise Quality Check';
  status: 'Satisfactory' | 'Conditional Pass' | 'Corrective Action Required' | 'Exemplary Compliance';
  summary: string;
  score?: number; // e.g. 92/100
  inspectorBadgeId?: string;
  findings: string[];
}

export interface VerificationPillar {
  title: string;
  status: VerificationStatusType;
  details: string;
  lastUpdated: string;
  applicabilityNote?: string;
}

export interface OfficialEvidence {
  id: string;
  title: string;
  category: 'Inspection Photo' | 'Location Evidence' | 'Hygiene Observation' | 'Document Verification Result';
  imageUrl: string;
  caption: string;
  verifiedDate: string;
  authorityTag: string;
  isPrototype: boolean;
}

export interface BusinessRegistration {
  fssaiNumber?: string;
  fssaiType?: 'Central Licence' | 'State Licence' | 'Registration (Petty FBO)';
  fssaiValidity?: string;
  municipalTradeLicence?: string;
  waterPotabilityTest?: 'Tested & Compliant' | 'Pending Routine Retest' | 'Exempt / Tanker Verified';
  gstStatus?: 'Active' | 'Composition Scheme' | 'Not Applicable';
  fireSafetyNOC?: 'Issued' | 'In Renewal' | 'Not Applicable (Under Threshold)';
}

export interface Business {
  id: string;
  ufbi: string; // Universal Food Business ID, e.g. JBP-DEMO-0001
  name: string;
  hindiName?: string;
  tagline?: string;
  category: FoodCategory;
  cuisineTypes: string[];
  locality: string;
  fullAddress: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
  officialStatus: VerificationStatusType;
  lastInspectedDate: string;
  hygieneRating: number; // 1 to 5 stars
  customerExperience: {
    rating: number; // e.g. 4.6
    reviewCount: number;
    sentimentSummary: string;
  };
  pillars: {
    businessIdentity: VerificationPillar;
    locationVerification: VerificationPillar;
    applicableRegistration: VerificationPillar;
    inspectionRecord: VerificationPillar;
    hygienePractices: VerificationPillar;
  };
  registrations: BusinessRegistration;
  inspectionHistory: InspectionRecord[];
  evidenceList: OfficialEvidence[];
  contactPublic: {
    phone?: string;
    hours: string;
  };
  hasCleanKitchenPledge: boolean;
  notes?: string;
}

export interface NutritionItem {
  id: string;
  name: string;
  hindiName: string;
  category: 'Breakfast' | 'Staples' | 'Lentils & Curries' | 'Dairy' | 'Produce' | 'Snacks';
  servingSize: string;
  portionSize?: string;
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fats?: number;
  fiber: number; // grams
  vitaminsAndMinerals: string[];
  keyIngredients?: string[];
  dietarySuitability?: string[] | string;
  glycemicIndex: 'Low' | 'Medium' | 'High';
  healthTip: string;
  foodSafetyTip?: string;
  image: string;
}

export interface CitizenReport {
  reportId: string;
  businessId: string;
  businessName: string;
  category:
    | 'Hygiene'
    | 'Food Quality'
    | 'Storage'
    | 'Cleanliness'
    | 'Misleading Information'
    | 'Other'
    | 'Hygiene Concern'
    | 'Stale / Spoiled Food'
    | 'Pest / Infestation'
    | 'Staff Hygiene';
  description: string;
  dateReported: string;
  status:
    | 'REPORT RECEIVED'
    | 'PRELIMINARY REVIEW'
    | 'ASSIGNED TO WARD OFFICER'
    | 'FIELD INSPECTION SCHEDULED'
    | 'UNDER REVIEW'
    | 'OFFICIAL FINDING'
    | 'RESOLVED';
  authorityAssigned: string;
  findingNote?: string;
  isAnonymous: boolean;
}

export interface GovDashboardMetrics {
  totalBusinesses: number;
  verifiedCount: number;
  conditionalCount: number;
  pendingCount: number;
  inspectionsCompletedMonth: number;
  openReportsCount: number;
  followUpsRequired: number;
}
