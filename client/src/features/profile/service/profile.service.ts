import { toast } from "react-toastify";
import api from "../../../services/axios";
import type { AxiosError } from "axios";

// Get profile API
export const getProfileApi = async (
    username: string
) => {
    try {
        const res = await api.get(`/api/profile/${username}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || "Something went wrong");
        throw error;
    }
};

// Update profile API
export const updateProfileApi = async (
    data: {
        fullName?: string;
        bio?: string;
        website?: string;
    }
) => {
    try {
        const res = await api.patch("/api/profile", data);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || "Something went wrong");
        throw error;
    }
};

// Update profile picture API
export const updateProfilePicApi = async (
    formData: FormData
) => {
    try {
        const res = await api.patch("/api/profile/profile-picture", formData, {
            headers: {
                "Content-Type":
                    "multipart/form-data"
            }
        });
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || "Something went wrong");
        throw error;
    }
};

// Delete profile picture API
export const deleteProfilePicApi = async () => {
    try {
        const res = await api.delete("/api/profile/profile-picture");
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || "Something went wrong");
        throw error;
    }
};