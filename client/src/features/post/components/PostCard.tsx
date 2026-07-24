import CommentPreview from "./CommentPreview";
import PostActions from "./PostActions";
import PostCaption from "./PostCaption";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";

interface Post {
    id: number;
    user: {
        id: number;
        name: string;
        username: string;
        avatar: string;
    };
    image: string;
    caption: string;
    likes: number;
    comments: number;
    isLiked: boolean;
    isSaved: boolean;
    createdAt: string;
}

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

            <PostMedia image={post.image} />

            <div className="space-y-4 p-4">
                <PostActions
                    likes={post.likes}
                    comments={post.comments}
                />

                <PostCaption
                    username={post.user.username}
                    caption={post.caption}
                />

                <CommentPreview
                    comments={post.comments}
                />
            </div>
        </article>
    );
};

export default PostCard;