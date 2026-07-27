import type { Post } from "../types/post.types";
import CommentPreview from "./CommentPreview";
import PostActions from "./PostActions";
import PostCaption from "./PostCaption";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";

interface PostCardProps {
    post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
    return (
        <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
            <PostHeader
                user={post.user}
                createdAt={post.createdAt}
            />

            <PostMedia media={post.media} />

            <div className="space-y-4 p-4">
                <PostActions
                    likes={0}
                    comments={0}
                />

                <PostCaption
                    username={post.user.username}
                    caption={post.caption}
                />

                <CommentPreview comments={0} />
            </div>
        </article>
    );
};

export default PostCard;