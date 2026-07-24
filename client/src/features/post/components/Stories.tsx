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
    {
        id: 3,
        username: "James",
        image: "https://i.pravatar.cc/150?img=52",
    },
    {
        id: 4,
        username: "Sophia",
        image: "https://i.pravatar.cc/150?img=24",
    },
    {
        id: 5,
        username: "Oliver",
        image: "https://i.pravatar.cc/150?img=44",
    },
    {
        id: 6,
        username: "Lucas",
        image: "https://i.pravatar.cc/150?img=60",
    },
];

const Stories = () => {
    return (
        <section className="mb-8">
            <div className="flex gap-5 overflow-x-auto scrollbar-hide">
                {stories.map((story) => (
                    <StoryCard key={story.id} story={story} />
                ))}
            </div>
        </section>
    );
};

export default Stories;