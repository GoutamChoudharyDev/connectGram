import { useEffect, useState } from "react";
import type { FollowButtonProps } from "../types/follow.types";
import { followUserApi, getFollowStatusApi, unfollowUserApi } from "../services/follow.services";

const FollowButton = ({ userId, onFollowChange }: FollowButtonProps) => {
    // useStates
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);

    // useEffect
    useEffect(() => {
        const fetchFollowStatus = async () => {
            try {
                setLoading(true);

                const response = await getFollowStatusApi(userId);
                setIsFollowing(response.data.isFollowing);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchFollowStatus();
    }, [userId, isFollowing])

    // handle follow
    const handleFollow = async () => {
        try {
            setLoading(true);

            if (isFollowing) {
                await unfollowUserApi(userId);
                onFollowChange?.();
                setIsFollowing(false);
            } else {
                await followUserApi(userId);
                onFollowChange?.();
                setIsFollowing(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            disabled={loading}
            onClick={handleFollow}
            className={`rounded-lg cursor-pointer px-4 py-2 text-sm font-medium transition ${isFollowing
                ? "border border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800"
                : "bg-blue-600 text-white hover:bg-blue-500"
                } disabled:cursor-not-allowed disabled:opacity-50`}
        >
            {loading
                ? "Loading..."
                : isFollowing
                    ? "Following"
                    : "Follow"}
        </button>
    );
};

export default FollowButton;