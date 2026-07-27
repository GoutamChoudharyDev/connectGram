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