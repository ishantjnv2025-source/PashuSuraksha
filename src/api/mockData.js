// Mock Database & Initial Seed Data for PashuSuraksha
// Matches Smart India Hackathon 2026 Problem Statement ID: 26128

export const MOCK_USERS = [
  {
    id: "usr_farmer_1",
    name: "Ramesh Patil",
    email: "ramesh.farmer@example.com",
    phone: "+91 98765 43210",
    role: "farmer",
    state: "Maharashtra",
    district: "Pune",
    block: "Haveli",
    village: "Wagholi",
    pashuAadhaar: "IN-MH-7892-4112",
    livestockCount: 8,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
  },
  {
    id: "usr_vet_1",
    name: "Dr. Ananya Joshi",
    email: "dr.ananya@vetcare.gov.in",
    phone: "+91 98220 11223",
    role: "veterinarian",
    licenseNumber: "MH-VET-2018-8842",
    qualification: "B.V.Sc & A.H., M.V.Sc (Epidemiology)",
    state: "Maharashtra",
    district: "Pune",
    assignedBlocks: ["Haveli", "Khed", "Shirur"],
    clinicName: "Pune District Mobile Veterinary Polyclinic Unit #4",
    avatar: "https://images.unsplash.com/photo-1594824813583-094191a32066?w=150"
  },
  {
    id: "usr_official_1",
    name: "Shri Rajesh Deshmukh, IAS",
    email: "rajesh.deshmukh@dahd.maharashtra.gov.in",
    phone: "+91 98110 55667",
    role: "official",
    designation: "District Animal Husbandry Officer (DAHO)",
    department: "Department of Animal Husbandry and Dairying",
    jurisdiction: "Pune District (14 Blocks)",
    state: "Maharashtra",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
  }
];

export const MOCK_CASES = [
  {
    id: "CASE-2026-1042",
    farmerId: "usr_farmer_1",
    farmerName: "Ramesh Patil",
    farmerPhone: "+91 98765 43210",
    animalType: "Cattle (Cow)",
    animalBreed: "Gir",
    tagId: "IN-MH-TAG-90812",
    symptoms: ["High fever (105°F)", "Blisters on mouth & tongue", "Excessive salivation", "Lameness"],
    durationDays: 2,
    affectedCount: 3,
    totalAnimalsInHerd: 8,
    riskLevel: "HIGH", // HIGH, MEDIUM, LOW
    suspectedDisease: "Foot-and-Mouth Disease (FMD)",
    triageScore: 92,
    status: "ASSIGNED", // REPORTED -> REVIEWED -> ASSIGNED -> UNDER_TREATMENT -> RESOLVED
    location: {
      village: "Wagholi",
      block: "Haveli",
      district: "Pune",
      lat: 18.5793,
      lng: 73.9824
    },
    reportedAt: "2026-10-04T09:30:00Z",
    assignedVet: {
      id: "usr_vet_1",
      name: "Dr. Ananya Joshi",
      phone: "+91 98220 11223",
      assignedAt: "2026-10-04T10:15:00Z",
      status: "Mobile Unit Dispatched (ETA: 45 min)"
    },
    notes: "Farmer noticed excessive drooling and blisters this morning. Suspected acute aphthovirus infection. Urgent quarantine advised.",
    prescription: null,
    labTest: {
      testId: "LAB-2612-409",
      testType: "FMD Antigen ELISA & PCR",
      status: "SAMPLE_DISPATCHED",
      laboratory: "Western Regional Disease Diagnostic Laboratory (WRDDL), Pune"
    }
  },
  {
    id: "CASE-2026-1039",
    farmerId: "usr_farmer_2",
    farmerName: "Suresh Gaikwad",
    farmerPhone: "+91 98450 78213",
    animalType: "Buffalo",
    animalBreed: "Murrah",
    tagId: "IN-MH-TAG-65412",
    symptoms: ["Nodular skin lesions (2-5cm)", "Enlarged lymph nodes", "Reduced milk yield"],
    durationDays: 4,
    affectedCount: 2,
    totalAnimalsInHerd: 5,
    riskLevel: "HIGH",
    suspectedDisease: "Lumpy Skin Disease (LSD)",
    triageScore: 85,
    status: "UNDER_TREATMENT",
    location: {
      village: "Shirwal",
      block: "Khandala",
      district: "Satara",
      lat: 18.1388,
      lng: 74.0194
    },
    reportedAt: "2026-10-03T14:20:00Z",
    assignedVet: {
      id: "usr_vet_2",
      name: "Dr. Vikram Shinde",
      phone: "+91 94223 99881",
      assignedAt: "2026-10-03T15:00:00Z",
      status: "Visited & Administered Supportive Therapy"
    },
    notes: "Isolated from herd. Vector control spray recommended around shed. Supportive anti-inflammatory and antibiotics prescribed to prevent secondary infection.",
    prescription: "Meloxicam + Paracetamol 15ml IM OD, Ivermectin injection, TopiCure spray on nodules.",
    labTest: {
      testId: "LAB-2612-388",
      testType: "Capripoxvirus PCR",
      status: "CONFIRMED_POSITIVE",
      laboratory: "Disease Investigation Section (DIS), Aundh, Pune"
    }
  },
  {
    id: "CASE-2026-1025",
    farmerId: "usr_farmer_3",
    farmerName: "Tukaram Shinde",
    farmerPhone: "+91 97664 12390",
    animalType: "Cattle (Cow)",
    animalBreed: "Holstein Friesian Cross",
    tagId: "IN-MH-TAG-11904",
    symptoms: ["Swollen udder quarter", "Blood clots in milk", "Mild fever"],
    durationDays: 1,
    affectedCount: 1,
    totalAnimalsInHerd: 6,
    riskLevel: "MEDIUM",
    suspectedDisease: "Acute Clinical Mastitis",
    triageScore: 64,
    status: "REVIEWED",
    location: {
      village: "Manchar",
      block: "Ambegaon",
      district: "Pune",
      lat: 19.0069,
      lng: 73.9424
    },
    reportedAt: "2026-10-04T07:15:00Z",
    assignedVet: {
      id: "usr_vet_1",
      name: "Dr. Ananya Joshi",
      phone: "+91 98220 11223",
      assignedAt: "2026-10-04T08:00:00Z",
      status: "Telephonic Guidance Provided & Field Visit Slotted"
    },
    notes: "Advised complete teat stripping, cold fomentation, and intramammary infusion.",
    prescription: "Intramammary Ceftiofur suspension + Serratiopeptidase bolus.",
    labTest: null
  },
  {
    id: "CASE-2026-1011",
    farmerId: "usr_farmer_4",
    farmerName: "Balasaheb Kadam",
    farmerPhone: "+91 94231 44556",
    animalType: "Goat",
    animalBreed: "Osmanabadi",
    tagId: "IN-MH-TAG-33108",
    symptoms: ["Mild nasal discharge", "Slight loss of appetite"],
    durationDays: 1,
    affectedCount: 1,
    totalAnimalsInHerd: 25,
    riskLevel: "LOW",
    suspectedDisease: "Mild Seasonal Rhinitis / Early Cold",
    triageScore: 28,
    status: "RESOLVED",
    location: {
      village: "Baramati Rural",
      block: "Baramati",
      district: "Pune",
      lat: 18.1517,
      lng: 74.5771
    },
    reportedAt: "2026-10-02T11:00:00Z",
    assignedVet: null,
    notes: "Home guidance provided: keep warm, administer oral herbal steam, observe for 24 hours.",
    prescription: "Vitamin C supplement, liver tonic bolus.",
    labTest: null
  }
];

export const MOCK_DISEASE_HOTSPOTS = [
  {
    id: "HSP-01",
    disease: "Foot-and-Mouth Disease (FMD)",
    clusterName: "Haveli-Daund Cluster",
    district: "Pune",
    lat: 18.5793,
    lng: 73.9824,
    radiusKm: 15,
    activeCases: 14,
    riskLevel: "HIGH",
    trend: "increasing",
    lastUpdated: "2026-10-04"
  },
  {
    id: "HSP-02",
    disease: "Lumpy Skin Disease (LSD)",
    clusterName: "Khandala Border Belt",
    district: "Satara",
    lat: 18.1388,
    lng: 74.0194,
    radiusKm: 22,
    activeCases: 29,
    riskLevel: "HIGH",
    trend: "stable",
    lastUpdated: "2026-10-03"
  },
  {
    id: "HSP-03",
    disease: "Peste des Petits Ruminants (PPR - Goat Plague)",
    clusterName: "Indapur Goat Herds",
    district: "Pune",
    lat: 18.1147,
    lng: 75.0275,
    radiusKm: 10,
    activeCases: 7,
    riskLevel: "MEDIUM",
    trend: "decreasing",
    lastUpdated: "2026-10-04"
  },
  {
    id: "HSP-04",
    disease: "Brucellosis",
    clusterName: "Ahmednagar Dairy Corridor",
    district: "Ahmednagar",
    lat: 19.0952,
    lng: 74.7480,
    radiusKm: 18,
    activeCases: 5,
    riskLevel: "MEDIUM",
    trend: "stable",
    lastUpdated: "2026-10-01"
  }
];

export const MOCK_VACCINATION_RECORDS = [
  {
    id: "VAC-991",
    tagId: "IN-MH-TAG-90812",
    animalType: "Cow (Gir)",
    vaccineName: "Raksha-Ovac (FMD trivalent)",
    batchNo: "RO-2025-X09",
    administeredDate: "2026-04-12",
    nextDueDate: "2026-10-12",
    status: "DUE_SOON",
    administeredBy: "Dr. Ananya Joshi (1962 Unit)"
  },
  {
    id: "VAC-992",
    tagId: "IN-MH-TAG-90812",
    animalType: "Cow (Gir)",
    vaccineName: "Bruvax (Brucellosis)",
    batchNo: "BV-2024-C11",
    administeredDate: "2025-08-20",
    nextDueDate: "LIFELONG",
    status: "COMPLETED",
    administeredBy: "Mobile Veterinary Unit Haveli"
  },
  {
    id: "VAC-993",
    tagId: "IN-MH-TAG-65412",
    animalType: "Buffalo (Murrah)",
    vaccineName: "Lumpi-ProVacInd",
    batchNo: "LPV-2025-992",
    administeredDate: "2026-03-15",
    nextDueDate: "2027-03-15",
    status: "ACTIVE",
    administeredBy: "Satara District Vet Dispensary"
  }
];

export const MOCK_DISTRICT_ANALYTICS = {
  totalLivestockProtected: "24.8 Lakhs",
  totalReportsToday: 42,
  criticalOutbreaksFlagged: 3,
  mobileUnitsActive: 28,
  averageResponseTime: "48 minutes",
  vaccinationCoverageRate: "89.4%",
  riskDistribution: {
    high: 18,
    medium: 34,
    low: 48
  },
  speciesBreakdown: [
    { name: "Cattle (Bovine)", count: 1240, percentage: 46 },
    { name: "Buffalo", count: 810, percentage: 30 },
    { name: "Sheep & Goat", count: 520, percentage: 19 },
    { name: "Poultry / Others", count: 135, percentage: 5 }
  ]
};
