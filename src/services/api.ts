import { JABALPUR_BUSINESSES, NUTRITION_ITEMS, DEMO_REPORTS, GOV_METRICS } from '../data/mockData';
import { Business, NutritionItem, CitizenReport, GovDashboardMetrics, VerificationStatusType } from '../types';

// In-memory state for prototype interactions
let businessesState: Business[] = [...JABALPUR_BUSINESSES];
let reportsState: CitizenReport[] = [...DEMO_REPORTS];

export async function getBusinesses(): Promise<Business[]> {
  // Simulate lightweight network resolution
  return Promise.resolve([...businessesState]);
}

export async function getBusinessById(id: string): Promise<Business | undefined> {
  if (!id) return Promise.resolve(undefined);
  const found = businessesState.find(b => b && (b.id === id || (b.ufbi && b.ufbi.toLowerCase() === id.toLowerCase())));
  return Promise.resolve(found);
}

export async function getBusinessByUfbi(ufbi: string): Promise<Business | undefined> {
  if (!ufbi) return Promise.resolve(undefined);
  const clean = ufbi.trim().toUpperCase();
  const found = businessesState.find(
    b => b && b.ufbi && (b.ufbi.toUpperCase() === clean || b.ufbi.replace(/[^A-Z0-9]/g, '') === clean.replace(/[^A-Z0-9]/g, ''))
  );
  return Promise.resolve(found);
}

export async function getVerificationStatus(id: string): Promise<VerificationStatusType | undefined> {
  if (!id) return Promise.resolve(undefined);
  const business = businessesState.find(b => b && (b.id === id || b.ufbi === id));
  return Promise.resolve(business?.officialStatus);
}

export async function getInspectionHistory(id: string) {
  if (!id) return Promise.resolve([]);
  const business = businessesState.find(b => b && (b.id === id || b.ufbi === id));
  return Promise.resolve(business?.inspectionHistory || []);
}

export async function getNearbyBusinesses(locality?: string): Promise<Business[]> {
  if (!locality || locality === 'All') {
    return Promise.resolve([...businessesState]);
  }
  return Promise.resolve(businessesState.filter(b => b.locality.toLowerCase() === locality.toLowerCase()));
}

export async function getNutritionData(): Promise<NutritionItem[]> {
  return Promise.resolve([...NUTRITION_ITEMS]);
}

export async function submitComplaint(data: {
  businessId: string;
  businessName: string;
  category: CitizenReport['category'];
  description: string;
  isAnonymous: boolean;
}): Promise<CitizenReport> {
  const newReport: CitizenReport = {
    reportId: `REP-JBP-${Math.floor(1000 + Math.random() * 9000)}`,
    businessId: data.businessId,
    businessName: data.businessName,
    category: data.category,
    description: data.description,
    dateReported: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: 'REPORT RECEIVED',
    authorityAssigned: 'Jabalpur Municipal Food Safety Unit',
    findingNote: 'Report registered in the system. Assigned for preliminary review. A citizen report is not an official violation finding.',
    isAnonymous: data.isAnonymous,
  };

  reportsState = [newReport, ...reportsState];
  return Promise.resolve(newReport);
}

export async function trackComplaint(reportId: string): Promise<CitizenReport | undefined> {
  const clean = reportId.trim().toUpperCase();
  const report = reportsState.find(r => r.reportId.toUpperCase() === clean);
  return Promise.resolve(report);
}

export async function getGovMetrics(): Promise<GovDashboardMetrics> {
  return Promise.resolve({
    ...GOV_METRICS,
    totalBusinesses: businessesState.length,
    verifiedCount: businessesState.filter(b => b.officialStatus === 'VERIFIED').length,
    conditionalCount: businessesState.filter(b => b.officialStatus === 'CONDITIONAL').length,
    pendingCount: businessesState.filter(b => b.officialStatus === 'PENDING').length,
    openReportsCount: reportsState.filter(r => r.status !== 'RESOLVED').length,
  });
}

export async function onboardBusiness(formData: {
  name: string;
  category: Business['category'];
  locality: string;
  fullAddress: string;
  fssaiNumber?: string;
  contactPhone?: string;
}): Promise<Business> {
  const newId = `b-${Date.now()}`;
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newUfbi = `JBP-DEMO-${randomSuffix}`;

  const newBusiness: Business = {
    id: newId,
    ufbi: newUfbi,
    name: formData.name,
    tagline: 'Freshly onboarded participating food establishment',
    category: formData.category,
    cuisineTypes: ['Local Cuisine', 'Regional Specialties'],
    locality: formData.locality,
    fullAddress: formData.fullAddress,
    coordinates: { lat: 23.164 + (Math.random() - 0.5) * 0.04, lng: 79.935 + (Math.random() - 0.5) * 0.04 },
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    officialStatus: 'PENDING',
    lastInspectedDate: 'Verification Scheduled',
    hygieneRating: 4,
    customerExperience: {
      rating: 4.5,
      reviewCount: 1,
      sentimentSummary: 'New participant in AaharSetu transparency initiative.',
    },
    pillars: {
      businessIdentity: {
        title: 'Business Identity',
        status: 'VERIFIED',
        details: 'Self-declaration & commercial address registered.',
        lastUpdated: 'Today',
      },
      locationVerification: {
        title: 'Premises & Geo-tag',
        status: 'PENDING',
        details: 'Geo-stamped premises inspection queued for ward officer visit.',
        lastUpdated: 'Today',
      },
      applicableRegistration: {
        title: 'Applicable Licences',
        status: formData.fssaiNumber ? 'VERIFIED' : 'PENDING',
        details: formData.fssaiNumber ? `FSSAI Application/Licence: ${formData.fssaiNumber}` : 'Pending document verification.',
        lastUpdated: 'Today',
      },
      inspectionRecord: {
        title: 'Inspection History',
        status: 'PENDING',
        details: 'Initial onboarding inspection scheduled.',
        lastUpdated: 'Today',
      },
      hygienePractices: {
        title: 'Hygiene & Cleanliness',
        status: 'PENDING',
        details: 'Clean Kitchen self-audit pledge submitted.',
        lastUpdated: 'Today',
      },
    },
    registrations: {
      fssaiNumber: formData.fssaiNumber || 'Registration Pending',
      fssaiType: 'Registration (Petty FBO)',
      fssaiValidity: 'Under Verification',
      municipalTradeLicence: 'Application Acknowledged',
      waterPotabilityTest: 'Pending Routine Retest',
      gstStatus: 'Not Applicable',
      fireSafetyNOC: 'Not Applicable (Under Threshold)',
    },
    inspectionHistory: [
      {
        id: `ins-${Date.now()}`,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        year: 2026,
        authority: 'Food Safety Administration, Jabalpur',
        type: 'Routine Hygiene Audit',
        status: 'Conditional Pass',
        summary: 'Digital registration received. First physical onboarding walkthrough queued.',
        findings: ['Self-declaration submitted', 'Food Business ID generated'],
      },
    ],
    evidenceList: [
      {
        id: `ev-${Date.now()}`,
        title: 'Self-Registered Premises Submission',
        category: 'Location Evidence',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
        caption: 'PROTOTYPE DEMO: Digital submission geo-coordinates captured.',
        verifiedDate: 'Today',
        authorityTag: 'Portal Log',
        isPrototype: true,
      },
    ],
    contactPublic: {
      phone: formData.contactPhone || '+91 761 240XXXX',
      hours: '10:00 AM – 10:00 PM',
    },
    hasCleanKitchenPledge: true,
  };

  businessesState = [newBusiness, ...businessesState];
  return Promise.resolve(newBusiness);
}

export async function askAaharAI(prompt: string): Promise<{ text: string; source: string }> {
  try {
    const res = await fetch('/api/gemini/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (e) {
    // Graceful offline fallback
    return {
      text: `**Aahar AI Knowledge Insights**\n\n• **Core Observation**: Indian traditional cuisine relies heavily on spices like turmeric (curcumin for anti-inflammatory action), cumin, and ginger to naturally facilitate metabolic assimilation.\n• **Meal Harmony**: Pair lentils (dal) with cereal grains (roti or rice) to form complete essential amino acid matrices.\n• **Food Safety**: Always ensure cooked food is either served above 65°C or chilled below 5°C to inhibit bacterial proliferation.\n\n*Disclaimer: AI-generated information is for general educational purposes and is not medical advice.*`,
      source: 'client-offline-cache',
    };
  }
}

export async function getAIInspectionObservations(inspectionType: string, context?: string) {
  try {
    const res = await fetch('/api/gemini/inspect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inspectionType, context }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return {
      observations: [
        { item: 'Cooked food hot-holding check', status: 'safe', confidence: 93, note: 'Bain-marie held above 65°C.' },
        { item: 'Dry pantry storage sealing', status: 'warning', confidence: 79, note: 'Silicone seal recommended on bulk pulses.' },
        { item: 'Staff sanitisation station', status: 'safe', confidence: 91, note: 'Touchless dispensers functional.' },
      ],
      recommendation: 'Overall hygiene satisfactory. Issue advisory for secondary bulk container gaskets.',
    };
  }
}
