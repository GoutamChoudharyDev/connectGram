import type { Post } from "../../post/types/post.types";

export interface Profile {
    id: number;
    username: string;
    fullName: string;
    profilePicture: string | null;
    bio: string | null;
    website: string | null;
    isVerified: boolean;
    createdAt: string;
}

export interface ProfilePostCardProp {
    post: Post;
}

export interface ProfileHeaderProps {
    profile: Profile;
    followersCount: number;
    followingCount: number;
    postCount: number;
    onFollowChange: () => void;
}

export interface ProfileStatsProps {
    followersCount: number;
    followingCount: number;
    postCount: number;
}