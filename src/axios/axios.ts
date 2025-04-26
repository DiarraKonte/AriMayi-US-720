import axios, { AxiosInstance } from "axios";
import { RootState, store } from "@/lib/store";

// Creation of the base instance
if (!process.env.BASE_URL) {
  throw new Error("BASE_URL is not defined in the environment variables.");
}

export const baseAPI = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000,
});

// Add interceptors on the base instance
baseAPI.interceptors.request.use((config) => {
  const state = store.getState() as RootState;
  const token = state.auth.token; // get token from authSlice
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error); // Added error handling for requests
});

baseAPI.interceptors.response.use(
  (response) => response, // Simple pass-through if the request succeeds
  (error) => {
    // Global error handling (can be enhanced with a specific message, for example)
    if (error.response) {
      console.error("API error:", error.response.data);
      // Handle specific errors like 401 or 500
    } else {
      console.error("Network error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Function to create specific instances with baseAPI as a base
const createAxiosInstance = (path: string): AxiosInstance => {
  const instance = axios.create({
    ...baseAPI.defaults,
    baseURL: `${baseAPI.defaults.baseURL}${path}`,
  });

  // Use baseAPI interceptors on the new instance
  instance.interceptors.request.use(baseAPI.interceptors.request.handlers[0].fulfilled, baseAPI.interceptors.request.handlers[0].rejected);
  instance.interceptors.response.use(baseAPI.interceptors.response.handlers[0].fulfilled, baseAPI.interceptors.response.handlers[0].rejected);

  return instance;
};

/**
 * Creation of specific instances
 *
 ** HOW TO USE IT :
 ** For admin partner : api.admin.partners.get('/specific-endpoint')
 ** For admin quotations : api.admin.quotations.get('/specific-endpoint')
 ** For admin trainees : api.admin.trainees.get('/specific-endpoint')
 ** For partner : api.partner.get('/specific-endpoint')
 ** For trainee : api.trainee.get('/specific-endpoint')
 */
export const api = {
  admin: {
    partners: createAxiosInstance("/arimayi-admin/partners"),
    quotations: createAxiosInstance("/arimayi-admin/quotations"),
    trainees: createAxiosInstance("/arimayi-admin/trainees"),
    projects: createAxiosInstance("/arimayi-admin/partners/projects"),
  },
  partner: createAxiosInstance("/partner"),
  trainee: createAxiosInstance("/trainee"),
};