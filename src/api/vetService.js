import { apiClient } from "./apiClient";
import { caseService } from "./caseService";

export const vetService = {
  /**
   * Submit Clinical Diagnosis and Prescription for an animal
   */
  async submitPrescription(caseId, prescriptionData) {
    try {
      return await apiClient.post(`/vet/prescriptions`, { caseId, ...prescriptionData });
    } catch {
      return await caseService.updateCaseStatus(caseId, "UNDER_TREATMENT", {
        prescription: prescriptionData.prescriptionText,
        clinicalNotes: prescriptionData.notes,
        prescribedAt: new Date().toISOString()
      });
    }
  },

  /**
   * Order a Laboratory Sample Test (e.g. PCR, ELISA)
   */
  async requestLabTest(caseId, labTestData) {
    try {
      return await apiClient.post(`/vet/lab-tests`, { caseId, ...labTestData });
    } catch {
      const newLabTest = {
        testId: `LAB-2612-${Math.floor(100 + Math.random() * 900)}`,
        testType: labTestData.testType,
        laboratory: labTestData.laboratory || "Disease Investigation Section (DIS), Pune",
        status: "SAMPLE_COLLECTED",
        sampleDate: new Date().toISOString()
      };
      return await caseService.updateCaseStatus(caseId, "UNDER_TREATMENT", {
        labTest: newLabTest
      });
    }
  },

  /**
   * Update mobile veterinary visit status
   */
  async updateVisitStatus(caseId, visitStatus) {
    try {
      return await apiClient.put(`/vet/cases/${caseId}/visit`, { visitStatus });
    } catch {
      return await caseService.updateCaseStatus(caseId, "VISITING", {
        "assignedVet.status": visitStatus
      });
    }
  }
};
