import ProfileHeader from "../components/ProfileHeader";
import ProfilePostGrid from "../components/ProfilePostGrid";
import ProfileTabs from "../components/ProfileTabs";

const ProfilePage = () => {
    return (
        <main className="min-h-screen bg-black text-white">
            <div className="mx-auto max-w-6xl px-6 py-10">
                {/* Profile Header */}
                <ProfileHeader />

                {/* Tabs */}
                <ProfileTabs />

                {/* Posts Grid */}
                <ProfilePostGrid />
            </div>
        </main>
    );
};

export default ProfilePage;