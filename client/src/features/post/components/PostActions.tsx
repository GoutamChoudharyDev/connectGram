import { Bookmark } from "lucide-react";
import type { PostActionsProps } from "../types/post.types";
import FollowButton from "../../follow/components/FollowButton";
import LikeButton from "../../like/components/LikeButton";
import CommentButton from "../../comment/components/CommentButton";

const PostActions = ({ isOwner, userId, postId, onCommentClick }: PostActionsProps) => {

    return (
        <div>
            {/* Action Buttons */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">

                    {/* Like */}
                    <LikeButton postId={postId} />

                    {/* Comment */}
                    <CommentButton
                        postId={postId}
                        onClick={onCommentClick}
                    />
                </div>

                <div className="flex items-center gap-3">

                    <button className="transition hover:scale-110">
                        <Bookmark
                            size={24}
                            className="text-zinc-200 hover:text-white"
                        />
                    </button>

                    {/* Follow */}
                    {!isOwner && (
                        <FollowButton
                            userId={userId}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostActions;