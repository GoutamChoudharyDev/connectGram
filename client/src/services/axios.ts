import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { refreshAccessTokenApi } from "../features/auth/services/auth.service";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

interface RetryRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

api.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest = error.config as RetryRequestConfig;

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/api/auth/refresh-token")
        ) {
            originalRequest._retry = true;

            try {
                await refreshAccessTokenApi();

                // Retry the original request with the new access token
                return api(originalRequest);
            } catch {
                // Prevent redirect loop
                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }

                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
)

export default api;