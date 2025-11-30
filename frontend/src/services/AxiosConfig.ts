import { getAccessToken, setAccessToken, setUser } from "@/stores/authStore";
import { useLoadingStore } from "@/stores/useLoadingStore";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
});

const loadingStore = useLoadingStore();


api.interceptors.request.use((config) => {

  loadingStore.startLoading();

  const token = getAccessToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as any;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    loadingStore.stopLoading();
    return response;
  },

  async (error) => {
    loadingStore.stopLoading();

    const originalRequest = error.config;

    if (!getAccessToken()) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await api.post("/refresh");

        const newAccessToken = refreshResponse.data.accessToken;
        const user = refreshResponse.data.user;

        if (newAccessToken) setAccessToken(newAccessToken);
        if (user) setUser(user);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (err) {
        console.warn("Refresh token expirado — redirecionar para login.");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
