import { BadgeCheck, Settings } from "lucide-react";
import ProfileStats from "./ProfileStats";
import ProfileBio from "./ProfileBio";
import EditProfileButton from "./EditProfileButton";
import type { ProfileHeaderProps } from "../types/profile.types";
import { useRef, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../auth/services/auth.service";
import { toast } from "react-toastify";
import { updateProfilePicApi } from "../service/profile.service";
import { useAuth } from "../../../hooks/useAuth";
import { createConversationApi } from "../../chat/services/chat.service";
import { socket } from "../../../socket/socket";
import FollowButton from "../../follow/components/FollowButton";


const ProfileHeader = ({ profile, followersCount, followingCount, postCount, onFollowChange }: ProfileHeaderProps) => {
    // useState
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // get logged in user
    const { user } = useAuth();

    // is Own profile
    const isOwnProfile = user?.id === profile.id;

    // File input ref
    const fileInputRef = useRef<HTMLInputElement>(null);

    // navigate
    const navigate = useNavigate();

    // handle logout
    const handleLogout = async () => {
        try {
            const response = await logoutApi();
            toast.success(response.message);

            // socket
            socket.disconnect();

            navigate("/login") // login
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

    // handle message button
    const handleMessageButton = async () => {
        try {
            const createConversationResponse = await createConversationApi(profile.id);
            console.log(createConversationResponse);

            navigate(`/messages`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="flex flex-col gap-8 pb-2 lg:flex-row lg:items-start lg:gap-12">
            {/* Profile Image */}
            <div className="flex justify-center lg:w-64 xl:w-72">
                <img
                    src={profile.profilePicture || "https://i.pravatar.cc/220"}
                    alt="Profile"
                    className="h-32 w-32 rounded-full border-4 border-zinc-700 object-cover sm:h-40 sm:w-40 lg:h-44 lg:w-44"
                />
            </div>

            {/* Profile Info */}
            <div className="flex flex-1 flex-col items-center md:items-center lg:items-start">
                <div className="w-full max-w-md lg:max-w-none">
                    {/* Username */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                        <div className="flex items-center gap-2">
                            <h2 className="break-all text-2xl font-semibold text-white sm:text-3xl">
                                {profile.username}
                            </h2>

                            {profile.isVerified && (
                                <BadgeCheck
                                    size={20}
                                    className="fill-blue-600 text-white"
                                />
                            )}
                        </div>

                        {isOwnProfile ? (
                            <div className="flex w-full items-stretch gap-2 sm:w-auto sm:gap-3">
                                {/* Edit button */}
                                <div className="flex-1 sm:flex-none">
                                    <EditProfileButton />
                                </div>

                                {/* Settings button */}
                                <div className="relative shrink-0">
                                    <button
                                        onClick={() => setIsMenuOpen((prev) => !prev)}
                                        className="flex h-full w-12 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 transition hover:bg-zinc-800"
                                    >
                                        <Settings size={20} />
                                    </button>

                                    {isMenuOpen && (
                                        <div className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl">
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
                        ) : (
                            <>
                                <FollowButton
                                    userId={profile.id}
                                    onFollowChange={onFollowChange}
                                />

                                <button
                                    onClick={handleMessageButton}
                                    className="rounded-lg cursor-pointer border border-zinc-700 px-5 py-2 font-medium text-white hover:bg-zinc-800">
                                    Message
                                </button>
                            </>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="mt-7">
                        <ProfileStats
                            followersCount={followersCount}
                            followingCount={followingCount}
                            postCount={postCount}
                        />
                    </div>

                    {/* Bio */}
                    <div className="mt-7">
                        <ProfileBio profile={profile} />
                    </div>
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