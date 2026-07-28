import { Heart } from "lucide-react"
import { useEffect, useState } from "react"
import { getLikesApi, getLikeStatusApi, likePostApi, unlikePostApi } from "../services/like.service";
import type { LikeButtonProps } from "../types/like.types";

const LikeButton = ({ postId }: LikeButtonProps) => {
    // use state
    const [isLike, setIsLike] = useState(false);
    const [loading, setLoading] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    // get like status
    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                setLoading(true);

                const statusResponse = await getLikeStatusApi(postId);
                setIsLike(statusResponse.data.isLike);

                const likeResponse = await getLikesApi(postId);
                setLikeCount(likeResponse.data.length);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchLikeStatus();
    }, [postId])

    // handle like
    const handleLike = async () => {
        if (isLike) {
            await unlikePostApi(postId);
            setIsLike(false);
            setLikeCount((prev) => prev - 1)
        } else {
            await likePostApi(postId);
            setIsLike(true)
            setLikeCount((prev) => prev + 1)
        }
    }

    return (
        <>
            <button
                disabled={loading}
                className="transition hover:scale-110"
            >
                <Heart
                    size={24}
                    onClick={handleLike}
                    className={`transition-colors cursor-pointer ${isLike
                        ? "fill-red-500 text-red-500"
                        : "text-zinc-200 hover:text-red-500"
                        }`}
                />
                {likeCount}
            </button>
        </>
    )
}

export default LikeButton