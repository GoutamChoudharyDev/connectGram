import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { refreshAccessTokenApi } from "../features/auth/services/auth.service";

// instance of axios
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

// add _retry in axios request configuration 
interface RetryRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

// response interceptors
api.interceptors.response.use(
    // If everything succeeds then return response
    (response) => response,

    // This executes only when an error occurs.
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
                // if user is not on login page the redirect it to login page
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