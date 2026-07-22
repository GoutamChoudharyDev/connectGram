const ProfileStats = () => {
    return (
        <div className="flex items-center gap-8">
            {/* Posts */}
            <div className="text-center">
                <p className="text-lg font-bold text-white">24</p>
                <span className="text-sm text-zinc-400">Posts</span>
            </div>

            {/* Followers */}
            <div className="text-center">
                <p className="text-lg font-bold text-white">1.2K</p>
                <span className="text-sm text-zinc-400">Followers</span>
            </div>

            {/* Following */}
            <div className="text-center">
                <p className="text-lg font-bold text-white">340</p>
                <span className="text-sm text-zinc-400">Following</span>
            </div>
        </div>
    );
};

export default ProfileStats;