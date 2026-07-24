import {
    Heart,
    MessageCircle,
    Send,
    Bookmark,
} from "lucide-react";

interface PostActionsProps {
    likes: number;
    comments: number;
}

const PostActions = ({ likes, comments }: PostActionsProps) => {
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

                <button className="transition hover:scale-110">
                    <Bookmark
                        size={24}
                        className="text-zinc-200 hover:text-white"
                    />
                </button>
            </div>

            {/* Likes & Comments */}
            <div className="mt-4 flex items-center gap-6 text-sm">
                <p className="font-semibold text-white">
                    {likes.toLocaleString()} likes
                </p>

                <p className="text-zinc-400">
                    {comments} comments
                </p>
            </div>
        </div>
    );
};

export default PostActions;