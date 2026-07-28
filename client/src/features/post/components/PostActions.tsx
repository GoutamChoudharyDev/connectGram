import {
    Heart,
    MessageCircle,
    Send,
    Bookmark,
} from "lucide-react";
import type { PostActionsProps } from "../types/post.types";

const PostActions = ({ comments, isOwner = false, isFollowing = false, onFollow }: PostActionsProps) => {
    return (
        <div>
            {/* Action Buttons */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <button className="transition hover:scale-110">
                        <Heart
                            size={24}
                            className="text-zinc-200 hover:text-red-500"
                        />
                    </button>

                    <button className="transition hover:scale-110">
                        <MessageCircle
                            size={24}
                            className="text-zinc-200 hover:text-white"
                        />
                    </button>

                    <button className="transition hover:scale-110">
                        <Send
                            size={22}
                            className="text-zinc-200 hover:text-white"
                        />
                    </button>
                </div>

                <div className="flex items-center gap-3">

                    <button className="transition hover:scale-110">
                        <Bookmark
                            size={24}
                            className="text-zinc-200 hover:text-white"
                        />
                    </button>

                    {!isOwner && (
                        <button
                            onClick={onFollow}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${isFollowing
                                ? "border border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800"
                                : "bg-blue-600 text-white hover:bg-blue-500"
                                }`}
                        >
                            {isFollowing ? "Following" : "Follow"}
                        </button>
                    )}
                </div>
            </div>

            {/* Likes & Comments */}
            <div className="mt-4 flex items-center gap-6 text-sm">
                <p className="text-zinc-400">
                    {comments} comments
                </p>
            </div>
        </div>
    );
};

export default PostActions;