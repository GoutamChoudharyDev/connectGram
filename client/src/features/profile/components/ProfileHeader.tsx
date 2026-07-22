import { BadgeCheck, Settings } from "lucide-react";
import ProfileStats from "./ProfileStats";
import ProfileBio from "./ProfileBio";
import EditProfileButton from "./EditProfileButton";

const ProfileHeader = () => {
    return (
        <section className="flex flex-col gap-10 pb-10 lg:flex-row lg:items-start">
            {/* Profile Image */}
            <div className="flex justify-center lg:w-72">
                <img
                    src="https://i.pravatar.cc/220"
                    alt="Profile"
                    className="h-44 w-44 rounded-full border-4 border-zinc-700 object-cover"
                />
            </div>

            {/* Profile Info */}
            <div className="flex-1">
                {/* Username */}
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-3xl font-semibold text-white">
                            alex_connect
                        </h2>

                        <BadgeCheck
                            size={20}
                            className="fill-blue-600 text-white"
                        />
                    </div>

                    <EditProfileButton />

                    <button className="rounded-lg border border-zinc-700 bg-zinc-900 p-2 transition hover:bg-zinc-800">
                        <Settings size={20} />
                    </button>
                </div>

                {/* Stats */}
                <div className="mt-7">
                    <ProfileStats />
                </div>

                {/* Bio */}
                <div className="mt-7">
                    <ProfileBio />
                </div>
            </div>
        </section>
    );
};

export default ProfileHeader;