import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { getAllPostsApi } from "../services/post.service";
import { toast } from "react-toastify";
import type { Post } from "../types/post.types";

const Feed = () => {
  // useState
  const [posts, setPosts] = useState<Post[]>([]);

  // fetch post function
  const fetchPosts = async () => {
    const response = await getAllPostsApi();
    setPosts(response.data.posts)
    console.log(response.data.posts);

    toast.success(response.message)
  }

  // useEffect to fetch posts
  useEffect(() => {
    (async () => {
      await fetchPosts();
    })();
  }, [])

  return (
    <section className="space-y-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </section>
  );
};

export default Feed;