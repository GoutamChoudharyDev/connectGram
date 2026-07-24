import { Plus } from "lucide-react";

interface Story {
    id: number;
    username: string;
    image: string;
    isOwn?: boolean;
}

interface StoryCardProps {
    story: Story;
}

const StoryCard = ({ story }: StoryCardProps) => {
    return (
        <div className="flex min-w-[80px] flex-col items-center">
            <div className="relative">
                {/* Story Ring */}
                <div className="rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 p-[2px]">
                    <div className="rounded-full bg-black p-[2px]">
                        <img
                            src={story.image}
                            alt={story.username}
                            className="h-16 w-16 rounded-full object-cover"
                        />
                    </div>
                </div>

                {/* Your Story Badge */}
                {story.isOwn && (
                    <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-black bg-blue-600">
                        <Plus size={14} className="text-white" />
                    </div>
                )}
            </div>

            <p className="mt-2 w-20 truncate text-center text-xs text-zinc-300">
                {story.username}
            </p>
        </div>
    );
};

export default StoryCard;