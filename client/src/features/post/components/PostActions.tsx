import {
    MessageCircle,
    Send,
    Bookmark,
} from "lucide-react";
import type { PostActionsProps } from "../types/post.types";
import FollowButton from "../../follow/components/FollowButton";
import LikeButton from "../../like/components/LikeButton";

const PostActions = ({ comments, isOwner, userId, postId }: PostActionsProps) => {
    return (
        <div>
            {/* Action Buttons */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">

                    <LikeButton postId={postId} />

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
                        <FollowButton userId={userId} />
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