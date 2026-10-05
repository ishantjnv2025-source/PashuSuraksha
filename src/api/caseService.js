import { apiClient } from "./apiClient";
import { MOCK_CASES } from "./mockData";

// Local storage key for persistent mock cases
const STORAGE_KEY = "pashusuraksha_cases";

function getStoredCases() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_CASES));
  return MOCK_CASES;
}

function saveStoredCases(cases) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
}

export const caseService = {
  /**
   * Fetch all cases (with optional filters: role, riskLevel, status)
   */
  async getCases(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      return await apiClient.get(`/cases?${queryParams}`);
    } catch {
      let cases = getStoredCases();

      if (filters.farmerId) {
        cases = cases.filter(c => c.farmerId === filters.farmerId);
      }
      if (filters.riskLevel && filters.riskLevel !== "ALL") {
        cases = cases.filter(c => c.riskLevel === filters.riskLevel);
      }
      if (filters.status && filters.status !== "ALL") {
        cases = cases.filter(c => c.status === filters.status);
      }
      return cases;
    }
  },

  /**
   * Get single case details by ID
   */
  async getCaseById(caseId) {
    try {
      return await apiClient.get(`/cases/${caseId}`);
    } catch {
      const cases = getStoredCases();
      return cases.find(c => c.id === caseId) || null;
    }
  },

  /**
   * Report new symptom case (Digital form with Photo upload / Audio / Symptoms checklist)
   */
  async reportCase(caseData) {
    try {
      return await apiClient.post("/cases/report", caseData);
    } catch {
      const cases = getStoredCases();
      const newCase = {
        id: `CASE-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        reportedAt: new Date().toISOString(),
        status: "REPORTED",
        ...caseData,
      };

      const updated = [newCase, ...cases];
      saveStoredCases(updated);
      return newCase;
    }
  },

  /**
   * Update case status (e.g. REPORTED -> REVIEWED -> ASSIGNED -> UNDER_TREATMENT -> RESOLVED)
   */
  async updateCaseStatus(caseId, status, additionalData = {}) {
    try {
      return await apiClient.put(`/cases/${caseId}/status`, { status, ...additionalData });
    } catch {
      const cases = getStoredCases();
      const index = cases.findIndex(c => c.id === caseId);
      if (index !== -1) {
        cases[index] = {
          ...cases[index],
          status,
          ...additionalData,
          updatedAt: new Date().toISOString()
        };
        saveStoredCases(cases);
        return cases[index];
      }
      throw new Error("Case not found");
    }
  },

  /**
   * Assign a veterinarian to a case
   */
  async assignVeterinarian(caseId, vet) {
    return this.updateCaseStatus(caseId, "ASSIGNED", {
      assignedVet: {
        id: vet.id,
        name: vet.name,
        phone: vet.phone,
        assignedAt: new Date().toISOString(),
        status: "Dispatched (Mobile Unit)"
      }
    });
  }
};
