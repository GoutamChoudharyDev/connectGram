import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import PostActions from "./PostActions";
import PostCaption from "./PostCaption";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import type { PostCardProps } from "../types/post.types";
import { deletePostApi } from "../services/post.service";
import { toast } from "react-toastify";
import CommentSection from "../../comment/components/CommentSection";
import { useState } from "react";

const PostCard = ({ post }: PostCardProps) => {
    const { user } = useAuth();

    // useState
    const [showComments, setShowComments] = useState(false);

    // useNavigate
    const navigate = useNavigate();

    // handle delete post
    const handleDeletPost = async (postId: number) => {
        try {
            const response = await deletePostApi(postId);
            toast.success(response.message);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
            <PostHeader
                user={post.user}
                createdAt={post.createdAt}
                isOwner={user?.id === post.user.id}
                onEdit={() => navigate(`/posts/${post.id}/edit`)}
                onDelete={() => handleDeletPost(post.id)}
            />

            <PostMedia media={post.media} />

            <div className="space-y-4 p-4">
                <PostActions
                    userId={post.user.id}
                    postId={post.id}
                    isOwner={user?.id === post.user.id}
                    onCommentClick={() => setShowComments((prev) => !prev)}
                />

                <PostCaption
                    username={post.user.username}
                    caption={post.caption}
                />
                {showComments && (
                    <CommentSection postId={post.id} />
                )}
            </div>
        </article>
    );
};

export default PostCard;