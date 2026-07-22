import { Grid3X3, Clapperboard, Tag } from "lucide-react";

const ProfileTabs = () => {
    return (
        <div className="mt-8 border-t border-zinc-800">
            <div className="flex items-center justify-center gap-10">
                {/* Posts */}
                <button className="flex items-center gap-2 border-t-2 border-white py-4 text-sm font-semibold uppercase tracking-wider text-white">
                    <Grid3X3 size={18} />
                    <span>Posts</span>
                </button>

                {/* Reels */}
                <button className="flex items-center gap-2 border-t-2 border-transparent py-4 text-sm font-semibold uppercase tracking-wider text-zinc-500 transition hover:text-white">
                    <Clapperboard size={18} />
                    <span>Reels</span>
                </button>

                {/* Tagged */}
                <button className="flex items-center gap-2 border-t-2 border-transparent py-4 text-sm font-semibold uppercase tracking-wider text-zinc-500 transition hover:text-white">
                    <Tag size={18} />
                    <span>Tagged</span>
                </button>
            </div>
        </div>
    );
};

export default ProfileTabs;