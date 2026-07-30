import api from "../../../services/axios";
import { handleApiError } from "../../../utils/handleApiError";

// create post
export const createPostApi = async (formData: FormData) => {
    try {
        const res = await api.post(`/api/post/`, formData);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// get post
export const getPostApi = async (postId: number) => {
    try {
        const res = await api.get(`/api/post/${postId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// get my posts
export const getMyPostsApi = async (username: string) => {
    try {
        const res = await api.get(`/api/post/my/${username}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// update post
export const updatePostApi = async (postId: number, data: {
    caption: string;
    location: string
}) => {
    try {
        const res = await api.patch(`/api/post/${postId}`, data);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// delete post
export const deletePostApi = async (postId: number) => {
    try {
        const res = await api.delete(`/api/post/${postId}`, {
            headers: {
                "Content-Type":
                    "multipart/form-data"
            }
        });
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// getAll post
export const getAllPostsApi = async (page: number = 1, limit: number = 10) => {
    try {
        const res = await api.get(`/api/post/posts?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};