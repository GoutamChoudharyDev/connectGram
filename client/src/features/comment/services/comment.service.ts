import api from "../../../services/axios";
import { handleApiError } from "../../../utils/handleApiError";

// commentapi
export const addCommentApi = async (postId: number, content: string) => {
    try {
        const res = await api.post(`/api/comments/posts/${postId}`, {
            content
        });
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

// deleteCommentApi
export const deleteCommentApi = async (commentId: number) => {
    try {
        const res = await api.delete(`/api/comments/${commentId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

// getCommentApi
export const getCommentApi = async (postId: number) => {
    try {
        const res = await api.get(`/api/comments/posts/${postId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

// updateCommentApi
export const updateCommentApi = async (commentId: number, content: string) => {
    try {
        const res = await api.patch(`/api/comments/${commentId}`, {
            content
        });
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

// commentReplyApi
export const commentReplyApi = async (commentId: number, content: string) => {
    try {
        const res = await api.post(`/api/comments/${commentId}/replies`, {
            content
        });
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

// getRepliesApi
export const getRepliesApi = async (commentId: number) => {
    try {
        const res = await api.get(`/api/comments/${commentId}/replies`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}