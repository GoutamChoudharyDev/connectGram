import PostCard from "./PostCard";

export interface Post {
  id: number;
  user: {
    id: number;
    name: string;
    username: string;
    avatar: string;
  };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: string;
}

const dummyPosts: Post[] = [
  {
    id: 1,
    user: {
      id: 1,
      name: "Sarah Johnson",
      username: "sarahjohnson",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    image: "https://picsum.photos/700/700?random=1",
    caption:
      "Exploring the mountains today 🏔️ Nature always gives me peace.",
    likes: 284,
    comments: 18,
    isLiked: false,
    isSaved: false,
    createdAt: "2h",
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "James Wilson",
      username: "james",
      avatar: "https://i.pravatar.cc/150?img=53",
    },
    image: "https://picsum.photos/700/700?random=2",
    caption:
      "Weekend vibes with friends ❤️ Hope everyone is having an amazing day!",
    likes: 642,
    comments: 39,
    isLiked: true,
    isSaved: false,
    createdAt: "5h",
  },
  {
    id: 3,
    user: {
      id: 3,
      name: "Emma Watson",
      username: "emma",
      avatar: "https://i.pravatar.cc/150?img=25",
    },
    image: "https://picsum.photos/700/700?random=3",
    caption:
      "Coffee, laptop and productivity ☕💻",
    likes: 156,
    comments: 7,
    isLiked: false,
    isSaved: true,
    createdAt: "1d",
  },
];

const Feed = () => {
  return (
    <section className="space-y-6">
      {dummyPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </section>
  );
};

export default Feed;