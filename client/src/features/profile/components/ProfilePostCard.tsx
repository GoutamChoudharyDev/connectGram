const ProfilePostCard = () => {
    return (
        <div className="group relative aspect-square cursor-pointer overflow-hidden bg-zinc-900">
            <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                alt="Post"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex items-center justify-center gap-6 bg-black/50 opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="text-sm font-semibold text-white">
                    ❤️ 120
                </div>

                <div className="text-sm font-semibold text-white">
                    💬 25
                </div>
            </div>
        </div>
    );
};

export default ProfilePostCard;