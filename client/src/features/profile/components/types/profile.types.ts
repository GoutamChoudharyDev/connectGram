export interface Profile {
    id: string;
    username: string;
    fullName: string;
    profilePicture: string | null;
    bio: string | null;
    website: string | null;
    isVerified: boolean;
    createdAt: string;
}