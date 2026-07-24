import { BadgeCheck, Settings } from "lucide-react";
import ProfileStats from "./ProfileStats";
import ProfileBio from "./ProfileBio";
import EditProfileButton from "./EditProfileButton";
import type { Profile } from "./types/profile.types";
import { useRef, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../auth/services/auth.service";
import { toast } from "react-toastify";
import { updateProfilePicApi } from "../service/profile.service";

interface ProfileHeaderProps {
    profile: Profile;
}

const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
    // useState
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // File input ref
    const fileInputRef = useRef<HTMLInputElement>(null);

    // navigate
    const navigate = useNavigate();

    // handle logout
    const handleLogout = async () => {
        try {
            const response = await logoutApi();
            toast.success(response.message);
            navigate("/") // login
        } catch (error) {
            console.error(error);
        }
    }

    // handleProfilePictureChange 
    const handleProfilePictureChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const formData = new FormData();
        formData.append("profilePicture", file);

        try {
            const response = await updateProfilePicApi(formData);
            toast.success(response.message)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="flex flex-col gap-10 pb-10 lg:flex-row lg:items-start">
            {/* Profile Image */}
            <div className="flex justify-center lg:w-72">
                <img
                    src={profile.profilePicture || "https://i.pravatar.cc/220"}
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
                            {profile.username}
                        </h2>

                        {profile.isVerified && (
                            <BadgeCheck
                                size={20}
                                className="fill-blue-600 text-white"
                            />
                        )}
                    </div>

                    <EditProfileButton />
                    <div className="relative">
                        <button
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                            className="rounded-lg border border-zinc-700 bg-zinc-900 p-2 transition hover:bg-zinc-800">
                            <Settings size={20} />
                        </button>

                        {isMenuOpen && (
                            <div className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl sm:right-0 lg:right-[-210px] right-[-50px]">
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        fileInputRef.current?.click();
                                    }}
                                    className="w-full px-4 py-3 text-left text-sm transition hover:bg-zinc-800"
                                >
                                    Update Profile Picture
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="w-full border-t border-zinc-700 px-4 py-3 text-left text-sm text-red-500 transition hover:bg-zinc-800"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-7">
                    <ProfileStats />
                </div>

                {/* Bio */}
                <div className="mt-7">
                    <ProfileBio profile={profile} />
                </div>
            </div>

            {/* hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
            />
        </section>
    );
};

export default ProfileHeader;