import { toast } from "react-toastify";
import api from "../../../services/axios";
import type { AxiosError } from "axios";
import type { LoginFormData, RegisterFormData, VerifyEmailData } from "../types/auth.types";

// register api
export const registerApi = async (formData: RegisterFormData) => {
    try {
        const res = await api.post(`/api/auth/register`, formData);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        toast.error(err.response?.data?.message || "Something went wrong");
        throw error;
    }
}

// verify-otp api
export const verifyEmailApi = async (data: VerifyEmailData) => {
    try {
        const res = await api.post(`/api/auth/verify-email`, data);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        toast.error(err.response?.data?.message || "Something went wrong");
        throw error;
    }
}

// resend-otp api
export const resendOtpApi = async (data: { email: string }) => {
    try {
        const res = await api.post(`/api/auth/resend-otp`, data);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        toast.error(err.response?.data?.message || "Something went wrong");
        throw error;
    }
}

// login api
export const loginApi = async (formData: LoginFormData) => {
    try {
        const res = await api.post(`/api/auth/login`, formData);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        toast.error(err.response?.data?.message || "Something went wrong");
        throw error;
    }
}

// logout api
export const logoutApi = async () => {
    try {
        const res = await api.post(`/api/auth/logout`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        toast.error(err.response?.data?.message || "Something went wrong");
        throw error;
    }
}