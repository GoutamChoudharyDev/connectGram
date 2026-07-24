import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import ProfilePostGrid from "../components/ProfilePostGrid";
import ProfileTabs from "../components/ProfileTabs";
import type { Profile } from "../components/types/profile.types";
import { getProfileApi } from "../service/profile.service";
// import { toast } from "react-toastify";

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
                console.log(response.data);

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
        <main className="min-h-screen bg-black text-white">
            <div className="mx-auto max-w-6xl px-6 py-10">
                {/* Profile Header */}
                <ProfileHeader profile={profile} />

                {/* Tabs */}
                <ProfileTabs />

                {/* Posts Grid */}
                <ProfilePostGrid />
            </div>
        </main>
    );
};

export default ProfilePage;