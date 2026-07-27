import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { refreshAccessTokenApi } from "../features/auth/services/auth.service";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

// Extend Axios request config to include our custom _retry property
interface RetryRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

// Response Interceptor
api.interceptors.response.use(
    // Success Response
    (response) => response,

    // Error Response
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryRequestConfig;

        // Handle only 401 errors
        if (error.response?.status === 401 &&
            originalRequest &&
            !originalRequest.url?.includes(`/api/auth/refresh-token`)
        ) {
            originalRequest._retry = true;

            try {
                // Refresh the access token
                await refreshAccessTokenApi();

                // Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                // Redirect to login page
                window.location.href = "/login";

                return Promise.reject(refreshError);
            }

        }
        // Any other error
        return Promise.reject(error);
    }
)

export default api;