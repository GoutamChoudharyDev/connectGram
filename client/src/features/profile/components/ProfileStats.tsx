import { useEffect, useState } from "react";
import { getFollowersApi, getFollowingsApi } from "../../follow/services/follow.services";
import { useParams } from "react-router-dom";
import { getMyPostsApi } from "../../post/services/post.service";

const ProfileStats = () => {
    // use state
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [postCount, setPostCount] = useState(0);

    // username
    const { username } = useParams();

    // useEffect
    useEffect(() => {
        if (!username) return;

        // get followers
        const getFollowers = async () => {
            try {
                const followResponse = await getFollowersApi(username);
                setFollowersCount(followResponse.data.length)
            } catch (error) {
                console.error(error);
            }
        }

        getFollowers();

        // get followings
        const getFollowings = async () => {
            try {
                const followingResponse = await getFollowingsApi(username);
                setFollowingCount(followingResponse.data.length)
            } catch (error) {
                console.error(error);
            }
        }

        getFollowings();

        // get posts
        const getPosts = async () => {
            try {
                const postResponse = await getMyPostsApi(username);
                setPostCount(postResponse.data.length);
            } catch (error) {
                console.error(error);
            }
        }

        getPosts();
    }, [username])

    return (
        <div className="flex items-center gap-8">
            {/* Posts */}
            <div className="text-center">
                <p className="text-lg font-bold text-white">{postCount}</p>
                <span className="text-sm text-zinc-400">Posts</span>
            </div>

            {/* Followers */}
            <div className="text-center">
                <p className="text-lg font-bold text-white">{followersCount}</p>
                <span className="text-sm text-zinc-400">Followers</span>
            </div>

            {/* Following */}
            <div className="text-center">
                <p className="text-lg font-bold text-white">{followingCount}</p>
                <span className="text-sm text-zinc-400">Following</span>
            </div>
        </div>
    );
};

export default ProfileStats;