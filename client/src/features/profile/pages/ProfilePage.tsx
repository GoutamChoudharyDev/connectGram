import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import ProfilePostGrid from "../components/ProfilePostGrid";
import ProfileTabs from "../components/ProfileTabs";
import type { Profile } from "../types/profile.types";
import { getProfileApi } from "../service/profile.service";

const ProfilePage = () => {
    // get username from params
    const { username } = useParams<{ username: string }>();

    // usestate
    const [profile, setProfile] = useState<Profile | null>(null);

    // useEffect to fetch data
    useEffect(() => {
        const getProfile = async () => {
            if (!username) return;

            try {
                // call the api
                const response = await getProfileApi(username);

                // set respone in profile
                setProfile(response.data);

                // toast.success(response.message);
            } catch (error) {
                console.error(error)
            }
        }

        // call get profile
        getProfile();
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
                <ProfileHeader profile={profile} />

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