import { apiClient } from "./apiClient";
import { MOCK_DISEASE_HOTSPOTS, MOCK_DISTRICT_ANALYTICS, MOCK_VACCINATION_RECORDS } from "./mockData";

export const surveillanceService = {
  /**
   * Get disease outbreak hotspots and geo clusters
   */
  async getHotspots() {
    try {
      return await apiClient.get("/surveillance/hotspots");
    } catch {
      return MOCK_DISEASE_HOTSPOTS;
    }
  },

  /**
   * Get district and block level livestock health metrics
   */
  async getDistrictAnalytics() {
    try {
      return await apiClient.get("/surveillance/analytics");
    } catch {
      return MOCK_DISTRICT_ANALYTICS;
    }
  },

  /**
   * Get National Digital Livestock Mission / Vaccination records
   */
  async getVaccinationRecords(tagId = null) {
    try {
      const url = tagId ? `/surveillance/vaccinations?tagId=${tagId}` : "/surveillance/vaccinations";
      return await apiClient.get(url);
    } catch {
      if (tagId) {
        return MOCK_VACCINATION_RECORDS.filter(r => r.tagId === tagId);
      }
      return MOCK_VACCINATION_RECORDS;
    }
  },

  /**
   * Broadcast Emergency Alert to Farmers and Vets in a District/Block
   */
  async broadcastAlert(alertData) {
    try {
      return await apiClient.post("/surveillance/broadcast", alertData);
    } catch {
      const storedAlerts = JSON.parse(localStorage.getItem("pashusuraksha_alerts") || "[]");
      const newAlert = {
        id: `ALERT-${Date.now()}`,
        timestamp: new Date().toISOString(),
        ...alertData
      };
      localStorage.setItem("pashusuraksha_alerts", JSON.stringify([newAlert, ...storedAlerts]));
      return newAlert;
    }
  },

  /**
   * Get active broadcast alerts
   */
  async getAlerts() {
    try {
      return await apiClient.get("/surveillance/alerts");
    } catch {
      const stored = localStorage.getItem("pashusuraksha_alerts");
      if (stored) {
        return JSON.parse(stored);
      }
      return [
        {
          id: "ALERT-DEMO-01",
          severity: "HIGH",
          title: "Foot-and-Mouth Disease (FMD) Advisory: Haveli & Daund Blocks",
          message: "Clusters of FMD detected in Wagholi and surrounding villages. Immediate ring vaccination drives initiated. Keep herds isolated from shared grazing grounds.",
          timestamp: "2026-10-04T08:00:00Z",
          sender: "District Animal Husbandry Office, Pune"
        }
      ];
    }
  }
};
