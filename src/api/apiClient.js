/**
 * PashuSuraksha API Client
 * Configured for seamless Node.js + Express + MongoDB backend connectivity.
 * 
 * Automatically handles:
 * - Base URL configuration via .env (VITE_API_BASE_URL)
 * - JWT Authorization header injection from localStorage
 * - Seamless fallback to interactive mock mode if backend server is not running yet
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const IS_MOCK_MODE_FORCED = import.meta.env.VITE_USE_MOCK === "true";

export const getAuthToken = () => {
  return localStorage.getItem("pashusuraksha_token");
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("pashusuraksha_token", token);
  } else {
    localStorage.removeItem("pashusuraksha_token");
  }
};

/**
 * Core HTTP Request Wrapper
 */
export async function apiRequest(endpoint, { method = "GET", body = null, headers = {} } = {}) {
  // If explicitly forced to mock mode via .env, we skip network
  if (IS_MOCK_MODE_FORCED) {
    throw new Error("MOCK_FALLBACK_TRIGGER");
  }

  const token = getAuthToken();
  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  const config = {
    method,
    headers: defaultHeaders,
  };

  if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // If server responded with error code
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    // If backend is unreachable (Failed to fetch / Connection refused), log helpful dev hint
    console.warn(`[PashuSuraksha API Client] Backend request to ${endpoint} failed (${error.message}). Falling back to local state/mock.`);
    throw error;
  }
}

export const apiClient = {
  get: (endpoint, headers) => apiRequest(endpoint, { method: "GET", headers }),
  post: (endpoint, body, headers) => apiRequest(endpoint, { method: "POST", body, headers }),
  put: (endpoint, body, headers) => apiRequest(endpoint, { method: "PUT", body, headers }),
  delete: (endpoint, headers) => apiRequest(endpoint, { method: "DELETE", headers }),
  baseURL: API_BASE_URL,
};
