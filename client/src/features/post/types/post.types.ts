export interface Post {
    id: number;
    caption: string;
    location: string;
    createdAt: string;

    media: {
        id: number;
        url: string;
        type: "IMAGE" | "VIDEO";
    }[];

    user: {
        id: number;
        username: string;
        fullName: string;
        profilePicture: string;
        isVerified: boolean;
    };
}

export interface PostMediaProps {
    media: Post["media"];
}

export interface PostHeaderProps {
    user: Post["user"];
    createdAt: string;
    isOwner?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

export interface PostCardProps {
    post: Post;
}

export interface PublishButtonProps {
    onClick: () => void;
    text?: string;
}

export interface PostActionsProps {
    likes: number;
    comments: number;
    isOwner?: boolean;
    isFollowing?: boolean;
    onFollow?: () => void;
}

export interface PostCaptionProps {
    username: string;
    caption: string;
}