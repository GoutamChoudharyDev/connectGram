import type { Profile } from "./types/profile.types";

interface ProfileBioProps {
    profile: Profile;
}

const ProfileBio = ({
    profile
}: ProfileBioProps) => {
    return (
        <div>
            <h3 className="text-lg font-semibold text-white">
                {profile.fullName}
            </h3>

            <p className="mt-2 text-zinc-400">
                {profile.bio}
            </p>

            {profile.website && (
                <a
                    href={profile.website}
                    target="_blank"
                    className="mt-2 block text-blue-400"
                >
                    {profile.website}
                </a>
            )}
        </div>
    );
};

export default ProfileBio;