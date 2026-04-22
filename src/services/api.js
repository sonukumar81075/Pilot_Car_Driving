import axios from "axios";

// Create a single axios instance so all API calls share base config.
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Normalize API errors so UI components can show clean messages.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Something went wrong. Please try again.";

    return Promise.reject(new Error(message));
  }
);

export default api;
