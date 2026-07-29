import api from "../../../services/axios";
import { handleApiError } from "../../../utils/handleApiError";

export const createConversationApi = async (receiverId: number) => {
    try {
        const res = await api.post(`/api/chat/conversations`, {
            receiverId
        });
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export const getMyConversationApi = async () => {
    try {
        const res = await api.get(`/api/chat/conversations`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export const getConversationsByIdApi = async (conversationId: number) => {
    try {
        const res = await api.get(`/api/chat/conversations/${conversationId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export const sendMessageApi = async (conversationId: number, content: string) => {
    try {
        const res = await api.post(`/api/chat/conversations/${conversationId}/messages`, {
            content
        });
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export const getMessageApi = async (conversationId: number) => {
    try {
        const res = await api.get(`/api/chat/conversations/${conversationId}/messages`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export const MarkAsReadApi = async (messageId: number) => {
    try {
        const res = await api.patch(`/api/chat/messages/${messageId}/read`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export const messageUnsendApi = async (messageId: number) => {
    try {
        const res = await api.patch(`/api/chat/messages/${messageId}/unsend`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}