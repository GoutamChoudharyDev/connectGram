export interface Comment {
    id: number;
    content: string;
    createdAt: string;
    user: {
        id: number;
        username: string;
        fullName: string;
        profilePicture: string | null;
        isVerified: boolean;
    };
}

export interface CommentButtonProps {
    postId: number;
    onClick: () => void;
}

export interface CommentSectionProps {
    postId: number;
}