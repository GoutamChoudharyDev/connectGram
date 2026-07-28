import api from "../../../services/axios";
import type { LoginFormData, RegisterFormData, VerifyEmailData } from "../types/auth.types";
import { handleApiError } from "../../../utils/handleApiError";

// register api
export const registerApi = async (formData: RegisterFormData) => {
    try {
        const res = await api.post(`/api/auth/register`, formData);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

// verify-otp api
export const verifyEmailApi = async (data: VerifyEmailData) => {
    try {
        const res = await api.post(`/api/auth/verify-email`, data);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

// resend-otp api
export const resendOtpApi = async (data: { email: string }) => {
    try {
        const res = await api.post(`/api/auth/resend-otp`, data);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

// login api
export const loginApi = async (formData: LoginFormData) => {
    try {
        const res = await api.post(`/api/auth/login`, formData);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

// logout api
export const logoutApi = async () => {
    try {
        const res = await api.post(`/api/auth/logout`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

// getMe api
export const getMeApi = async () => {
    try {
        const res = await api.get(`/api/auth/me`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

// refresh access token api
export const refreshAccessTokenApi = async () => {
    try {
        const res = await api.post(`/api/auth/refresh-token`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}