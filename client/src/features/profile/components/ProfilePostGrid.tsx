import { useEffect, useState } from "react";
import ProfilePostCard from "./ProfilePostCard";
import { getMyPostsApi } from "../../post/services/post.service";
import { useParams } from "react-router-dom";
import type { Post } from "../../post/types/post.types";

const ProfilePostGrid = () => {
    // use state
    const [myPosts, setMyPosts] = useState<Post[]>([]);

    // username
    const { username } = useParams();

    // useEffect
    useEffect(() => {
        if (!username) return;

        // get posts
        const getMyPosts = async () => {
            try {
                const myPostResponse = await getMyPostsApi(username);
                setMyPosts(myPostResponse.data);
            } catch (error) {
                console.error(error);
            }
        }

        getMyPosts();
    }, [username])

    return (
        <div className="mt-6 grid grid-cols-3 gap-1">
            {myPosts.map((post) => (
                <ProfilePostCard
                    key={post.id}
                    post={post}
                />
            ))}
        </div>
    );
};

export default ProfilePostGrid;