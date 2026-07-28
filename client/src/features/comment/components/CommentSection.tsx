import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { addCommentApi, getCommentApi } from "../services/comment.service";
import type { Comment, CommentSectionProps } from "../types/comment.types";

const CommentSection = ({ postId }: CommentSectionProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);

                const response = await getCommentApi(postId);
                setComments(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId]);

    const handleAddComment = async () => {
        if (!content.trim()) return;

        try {
            const response = await addCommentApi(postId, content);

            setComments((prev) => [...prev, response.data]);
            setContent("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="mt-4 border-t border-zinc-800 pt-4">
            {/* View all comments */}
            {comments.length > 0 && (
                <button className="mb-4 text-sm text-zinc-400 transition hover:text-white">
                    View all {comments.length} comments
                </button>
            )}

            {/* Comments */}
            <div className="mt-4 max-h-72 overflow-y-auto space-y-3 pr-2">
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="flex items-start gap-2 text-sm"
                    >
                        <span className="font-semibold text-white">
                            {comment.user.username}
                        </span>

                        <span className="break-words text-zinc-300">
                            {comment.content}
                        </span>
                    </div>
                ))}
            </div>

            {/* Add Comment */}
            <div className="mt-4 flex items-center gap-3 border-t border-zinc-800 pt-4">
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                />

                <button
                    onClick={handleAddComment}
                    disabled={loading || !content.trim()}
                    className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
};

export default CommentSection;