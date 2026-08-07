import type { Profile } from "../types/profile.types";

interface ProfileBioProps {
    profile: Profile;
}

const ProfileBio = ({ profile }: ProfileBioProps) => {
    return (
        <div className="space-y-2">
            <h3 className="break-words text-base font-semibold text-white sm:text-lg">
                {profile.fullName}
            </h3>

            {profile.bio && (
                <p className="break-words whitespace-pre-line text-sm leading-6 text-zinc-400 sm:text-base">
                    {profile.bio}
                </p>
            )}

            {profile.website && (
                <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block break-all text-sm font-medium text-blue-400 transition hover:text-blue-300 sm:text-base"
                >
                    {profile.website}
                </a>
            )}
        </div>
    );
};

export default ProfileBio;