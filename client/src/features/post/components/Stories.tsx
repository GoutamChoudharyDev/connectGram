import StoryCard from "./StoryCard";

const stories = [
    {
        id: 1,
        username: "Your Story",
        image: "https://i.pravatar.cc/150?img=12",
        isOwn: true,
    },
    {
        id: 2,
        username: "Emma",
        image: "https://i.pravatar.cc/150?img=32",
    },
    // {
    //     id: 3,
    //     username: "Alex",
    //     image: "https://i.pravatar.cc/150?img=22",
    // },
    // {
    //     id: 4,
    //     username: "Sophia",
    //     image: "https://i.pravatar.cc/150?img=45",
    // },
    // {
    //     id: 5,
    //     username: "Daniel",
    //     image: "https://i.pravatar.cc/150?img=28",
    // },
];

const Stories = () => {
    return (
        <div className="w-full overflow-x-auto border-b border-zinc-800 scrollbar-hide">
            <div className="flex w-max gap-4 px-4 py-4">
                {stories.map((story) => (
                    <StoryCard key={story.id} story={story} />
                ))}
            </div>
        </div>
    );
};

export default Stories;