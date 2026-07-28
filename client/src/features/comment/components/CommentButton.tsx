import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getCommentApi } from "../services/comment.service";
import type { CommentButtonProps } from "../types/comment.types";

const CommentButton = ({ postId, onClick }: CommentButtonProps) => {
    const [commentCount, setCommentCount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCommentCount = async () => {
            try {
                setLoading(true);

                const response = await getCommentApi(postId);
                setCommentCount(response.data.length);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCommentCount();
    }, [postId]);

    return (
        <button
            disabled={loading}
            onClick={onClick}
            className="flex items-center gap-2 transition hover:scale-110"
        >
            <MessageCircle
                size={24}
                className="text-zinc-200 transition hover:text-white"
            />

            <span className="text-sm font-medium text-zinc-300">
                {commentCount}
            </span>
        </button>
    );
};

export default CommentButton;