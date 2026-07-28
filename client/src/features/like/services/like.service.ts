import api from "../../../services/axios";
import { handleApiError } from "../../../utils/handleApiError"

// like post api
export const likePostApi = async (postId: number) => {
    try {
        const res = await api.post(`/api/likes/${postId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

// unlike post api
export const unlikePostApi = async (postId: number) => {
    try {
        const res = await api.delete(`/api/likes/${postId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

// get likes api
export const getLikesApi = async (postId: number) => {
    try {
        const res = await api.get(`/api/likes/${postId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

// get like status api
export const getLikeStatusApi = async (postId: number) => {
    try {
        const res = await api.get(`/api/likes/status/${postId}`);

        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}