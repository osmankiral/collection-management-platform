import axios, { InternalAxiosRequestConfig} from "axios";

const api = axios.create({
  baseURL: "https://maestro-api-dev.secil.biz",
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");

    if (token && config.headers && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
