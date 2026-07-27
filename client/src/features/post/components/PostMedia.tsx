import type { PostMediaProps } from "../types/post.types";

const PostMedia = ({ media }: PostMediaProps) => {
    if (media.length === 0) return null;

    return (
        <div className="overflow-hidden border-y border-zinc-800 bg-zinc-900">
            <img
                src={media[0]?.url}
                alt="Post"
                className="h-auto max-h-[650px] w-full object-cover transition duration-300 hover:scale-[1.02]"
            />
        </div>
    );
};

export default PostMedia;