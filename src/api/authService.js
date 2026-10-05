import { apiClient, setAuthToken } from "./apiClient";
import { MOCK_USERS } from "./mockData";

export const authService = {
  /**
   * User Login (Farmer, Veterinarian, Official, Admin)
   */
  async login(credentials) {
    try {
      const response = await apiClient.post("/auth/login", credentials);
      if (response?.token) {
        setAuthToken(response.token);
      }
      return response.user;
    } catch {
      // Mock Fallback: Match by email or role
      const foundUser = MOCK_USERS.find(
        (u) =>
          u.email.toLowerCase() === credentials.email?.toLowerCase() ||
          u.role === credentials.role
      ) || {
        id: "usr_" + Date.now(),
        name: credentials.email?.split("@")[0] || "Active User",
        email: credentials.email,
        phone: credentials.phone || "+91 99999 88888",
        role: credentials.role || "farmer",
        district: "Pune",
        state: "Maharashtra"
      };

      const mockToken = "jwt_mock_token_" + btoa(foundUser.email + ":" + Date.now());
      setAuthToken(mockToken);
      localStorage.setItem("pashusuraksha_current_user", JSON.stringify(foundUser));
      return foundUser;
    }
  },

  /**
   * User Registration with Role-based Metadata
   */
  async register(userData) {
    try {
      const response = await apiClient.post("/auth/register", userData);
      if (response?.token) {
        setAuthToken(response.token);
      }
      return response.user;
    } catch {
      // Mock Registration
      const newUser = {
        id: "usr_" + Date.now(),
        ...userData,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
      };

      const mockToken = "jwt_mock_token_" + btoa(newUser.email + ":" + Date.now());
      setAuthToken(mockToken);
      localStorage.setItem("pashusuraksha_current_user", JSON.stringify(newUser));
      return newUser;
    }
  },

  /**
   * Get Current Logged In User
   */
  async getCurrentUser() {
    try {
      return await apiClient.get("/auth/me");
    } catch {
      const stored = localStorage.getItem("pashusuraksha_current_user");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return null;
        }
      }
      return null;
    }
  },

  /**
   * Logout User
   */
  async logout() {
    try {
      await apiClient.post("/auth/logout");
    } catch {
      // ignore network errors on logout
    } finally {
      setAuthToken(null);
      localStorage.removeItem("pashusuraksha_current_user");
    }
  }
};
