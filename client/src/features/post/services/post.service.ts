import { AxiosError } from "axios";
import api from "../../../services/axios";
import { toast } from "react-toastify";

// create post
export const createPostApi = async (formData: FormData) => {
    try {
        const res = await api.post(`/api/post/`, formData);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || "Something went wrong");
        throw error;
    }
};

// get post
export const getPostApi = async (postId: number) => {
    try {
        const res = await api.get(`/api/post/${postId}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || "Something went wrong");
        throw error;
    }
};

// update post
export const updatePostApi = async (postId: number, formData: FormData) => {
    try {
        const res = await api.patch(`/api/post/${postId}`, formData);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || "Something went wrong");
        throw error;
    }
};

// delete post
export const deletePostApi = async (postId: number) => {
    try {
        const res = await api.delete(`/api/post/${postId}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || "Something went wrong");
        throw error;
    }
};

// getAll post
export const getAllPostsApi = async (page: number = 1, limit: number = 10) => {
    try {
        const res = await api.get(`/api/post/posts?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || "Something went wrong");
        throw error;
    }
};