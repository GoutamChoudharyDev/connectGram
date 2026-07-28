import api from "../../../services/axios";
import { handleApiError } from "../../../utils/handleApiError";

// Follow user api
export const followUserApi = async (userId: number) => {
    try {
        const res = await api.post(`/api/follow/${userId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

// Unfollow user api
export const unfollowUserApi = async (userId: number) => {
    try {
        const res = await api.delete(`/api/follow/${userId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

// Get followers api
export const getFollowersApi = async (username: string) => {
    try {
        const res = await api.get(`/api/follow/followers/${username}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

// Get Following api
export const getFollowingsApi = async (username: string) => {
    try {
        const res = await api.get(`/api/follow/following/${username}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

// Follow status api
export const getFollowStatusApi = async (userId: number) => {
    try {
        const res = await api.get(`/api/follow/status/${userId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}