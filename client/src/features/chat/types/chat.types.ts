import type { Dispatch, SetStateAction } from "react";

export interface User {
    id: number;
    username: string;
    fullName: string;
    profilePicture: string | null;
}

export interface Participant {
    id: number;
    username: string;
    profilePicture: string | null;
    user: User;
}

export interface Conversation {
    id: number;
    participants: Participant[];
    createdAt: string;
    updatedAt: string;
}

export interface ConversationListProps {
    conversations: Conversation[];
    selectedConversation: Conversation | null;
    onSelect: Dispatch<SetStateAction<Conversation | null>>;
}

export interface ConversationItemProps {
    conversation: Conversation;
    selected: boolean;
    onClick: () => void
}

export interface Message {
    id: number;
    content: string;
    createdAt: string;
    isRead: boolean;
    isUnsent: boolean;

    sender: {
        id: number;
        username: string;
        profilePicture: string | null;
    };
}

export interface MessageListProps {
    messages: Message[];
}

export interface MessageBubbleProps {
    message: Message;
}

export interface ChatHeaderProps {
    conversation: Conversation;
}


export interface ChatInputProps {
    conversationId: number;
}