import type { ProfileStatsProps } from "../types/profile.types";

const ProfileStats = ({ followersCount, followingCount, postCount }: ProfileStatsProps) => {
    return (
        <div className="flex items-center gap-8">
            {/* Posts */}
            <div className="text-center">
                <p className="text-lg font-bold text-white">{postCount}</p>
                <span className="text-sm text-zinc-400">Posts</span>
            </div>

            {/* Followers */}
            <div className="text-center">
                <p className="text-lg font-bold text-white">{followersCount}</p>
                <span className="text-sm text-zinc-400">Followers</span>
            </div>

            {/* Following */}
            <div className="text-center">
                <p className="text-lg font-bold text-white">{followingCount}</p>
                <span className="text-sm text-zinc-400">Following</span>
            </div>
        </div>
    );
};

export default ProfileStats;