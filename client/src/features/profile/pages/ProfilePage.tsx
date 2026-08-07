import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import ProfilePostGrid from "../components/ProfilePostGrid";
import ProfileTabs from "../components/ProfileTabs";
import type { Profile } from "../types/profile.types";
import { getProfileApi } from "../service/profile.service";
import { getFollowersApi, getFollowingsApi } from "../../follow/services/follow.services";
import { getMyPostsApi } from "../../post/services/post.service";

const ProfilePage = () => {
    // get username from params
    const { username } = useParams<{ username: string }>();
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [postCount, setPostCount] = useState(0);

    // usestate
    const [profile, setProfile] = useState<Profile | null>(null);

    // useEffect to fetch data
    const fetchProfileData = async () => {
        if (!username) return;

        try {
            const profileResponse = await getProfileApi(username);
            setProfile(profileResponse.data);

            const followersResponse = await getFollowersApi(username);
            setFollowersCount(followersResponse.data.length);

            const followingResponse = await getFollowingsApi(username);
            setFollowingCount(followingResponse.data.length);

            const postResponse = await getMyPostsApi(username);
            setPostCount(postResponse.data.length);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            await fetchProfileData();
        }

        fetchProfile();
    }, [username])

    if (!profile) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-black text-white">
                Loading...
            </main>
        );
    }

    return (
        <main className="w-full">
            <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                {/* Profile Header */}
                <ProfileHeader
                    profile={profile}
                    followersCount={followersCount}
                    followingCount={followingCount}
                    postCount={postCount}
                    onFollowChange={fetchProfileData}
                />

                {/* Tabs */}
                <div className="mt-8">
                    <ProfileTabs />
                </div>

                {/* Posts Grid */}
                <div className="mt-6">
                    <ProfilePostGrid />
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;