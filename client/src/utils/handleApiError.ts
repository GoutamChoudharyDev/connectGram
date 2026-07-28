import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const handleApiError = (error: unknown): never => {
    const err = error as AxiosError<{ message: string }>;
    toast.error(err.response?.data?.message || "Something went wrong");
    throw error;
};