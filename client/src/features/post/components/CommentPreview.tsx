import { Send } from "lucide-react";

interface CommentPreviewProps {
    comments: number;
}

const CommentPreview = ({ comments }: CommentPreviewProps) => {
    return (
        <div className="border-t border-zinc-800 pt-4">
            {/* View Comments */}
            {comments > 0 && (
                <button className="text-sm text-zinc-400 transition hover:text-white">
                    View all {comments} comments
                </button>
            )}

            {/* Latest Comment Preview */}
            <div className="mt-3 text-sm">
                <span className="mr-2 font-semibold text-white">
                    johndoe
                </span>

                <span className="text-zinc-300">
                    Amazing shot! 🔥
                </span>
            </div>

            {/* Add Comment */}
            <div className="mt-4 flex items-center gap-3">
                <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                />

                <button className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-blue-500">
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
};

export default CommentPreview;