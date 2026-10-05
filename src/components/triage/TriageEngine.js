/**
 * PashuSuraksha Triage Engine
 * Implements the Rule-based Triage & Early Risk Detection logic as detailed
 * in the Smart India Hackathon 2026 presentation (Slide 2, Slide 3, Slide 4).
 * 
 * Classifies symptoms into:
 * - HIGH RISK (Severe symptoms / suspected outbreak -> Priority Veterinary Response + Lab Test)
 * - MEDIUM RISK (Moderate symptoms / multiple animals -> Veterinary Review & Field Visit)
 * - LOW RISK (Mild symptoms -> Guidance & Monitoring + Follow-up)
 */

// Critical red-flag symptoms indicating high outbreak risk
const CRITICAL_SYMPTOMS = [
  "Blisters on mouth & tongue",
  "High fever (105°F)",
  "Nodular skin lesions (2-5cm)",
  "Bleeding from orifices",
  "Sudden unexplained death in herd",
  "Severe respiratory distress",
  "Inability to stand / acute recumbency",
  "Vesicular fluid leakage"
];

const MODERATE_SYMPTOMS = [
  "Swollen udder quarter",
  "Blood clots in milk",
  "Lameness / limping",
  "Persistent diarrhea",
  "Enlarged lymph nodes",
  "Reduced milk yield (>30%)",
  "Loss of appetite (>2 days)"
];

const MILD_SYMPTOMS = [
  "Mild nasal discharge",
  "Slight loss of appetite",
  "Minor skin abrasion",
  "Dullness / lethargy (<24h)"
];

export function evaluateLivestockRisk({
  animalType,
  symptoms = [],
  affectedCount = 1,
  totalAnimalsInHerd = 1,
  durationDays = 1,
  hasRecentMortality = false,
  feverLevel = "Normal"
}) {
  let score = 0;
  const matchedCritical = symptoms.filter(s => CRITICAL_SYMPTOMS.includes(s));
  const matchedModerate = symptoms.filter(s => MODERATE_SYMPTOMS.includes(s));
  const matchedMild = symptoms.filter(s => MILD_SYMPTOMS.includes(s));

  // 1. Symptom Weights
  score += matchedCritical.length * 35;
  score += matchedModerate.length * 15;
  score += matchedMild.length * 5;

  // 2. High fever escalation
  if (feverLevel === "High (104-106°F)") score += 25;
  if (feverLevel === "Moderate (102-104°F)") score += 10;

  // 3. Contagion / Multiple animals affected factor
  const attackRate = affectedCount / Math.max(totalAnimalsInHerd, 1);
  if (affectedCount >= 3 || attackRate > 0.3) {
    score += 25; // Multiple animals affected indicates rapid transmission
  } else if (affectedCount > 1) {
    score += 15;
  }

  // 4. Mortality red flag
  if (hasRecentMortality) {
    score += 40;
  }

  // 5. Duration factor
  if (durationDays >= 3 && matchedCritical.length > 0) {
    score += 10;
  }

  // Determine Category
  let riskLevel = "LOW";
  let recommendedAction = "";
  let priorityBadge = "Routine Monitoring";
  let suspectedCondition = "Undifferentiated Mild Illness";

  if (score >= 65 || matchedCritical.length >= 1 || hasRecentMortality || (matchedModerate.length >= 1 && affectedCount >= 3)) {
    riskLevel = "HIGH";
    priorityBadge = "Immediate Priority Response";
    recommendedAction = "Alert sent to nearest Mobile Veterinary Unit (1962). Isolate affected livestock immediately. Do not transport animals. Sample collection dispatched.";
    
    // Suspected disease mapping
    if (symptoms.some(s => s.includes("Blisters") || s.includes("salivation"))) {
      suspectedCondition = "Suspected Foot-and-Mouth Disease (FMD)";
    } else if (symptoms.some(s => s.includes("Nodular skin") || s.includes("lesions"))) {
      suspectedCondition = "Suspected Lumpy Skin Disease (LSD)";
    } else if (hasRecentMortality || symptoms.some(s => s.includes("Bleeding"))) {
      suspectedCondition = "Suspected Anthrax / Hemorrhagic Septicemia";
    } else {
      suspectedCondition = "High-Risk Contagious Disease Outbreak";
    }
  } else if (score >= 30 || matchedModerate.length >= 1 || affectedCount > 1) {
    riskLevel = "MEDIUM";
    priorityBadge = "Veterinary Review Required";
    recommendedAction = "Case routed to Block Veterinary Officer. Scheduled for tele-triage and farm visit within 12 hours. Supportive guidance provided.";
    
    if (symptoms.some(s => s.includes("udder") || s.includes("milk"))) {
      suspectedCondition = "Clinical Mastitis";
    } else if (symptoms.some(s => s.includes("diarrhea"))) {
      suspectedCondition = "Acute Enteritis / Parasitic Infection";
    } else {
      suspectedCondition = "Moderate Infection / Nutritional Deficiency";
    }
  } else {
    riskLevel = "LOW";
    priorityBadge = "Home Guidance & Monitoring";
    recommendedAction = "No immediate danger detected. Follow hygienic isolation, monitor temperature twice daily, and seek medical attention if symptoms persist for 48 hours.";
    suspectedCondition = "Mild Seasonal Discomfort";
  }

  return {
    score: Math.min(score, 100),
    riskLevel,
    priorityBadge,
    suspectedCondition,
    recommendedAction,
    matchedCritical,
    matchedModerate,
    matchedMild
  };
}

export const COMMON_SYMPTOMS_LIST = [
  ...CRITICAL_SYMPTOMS,
  ...MODERATE_SYMPTOMS,
  ...MILD_SYMPTOMS
];
