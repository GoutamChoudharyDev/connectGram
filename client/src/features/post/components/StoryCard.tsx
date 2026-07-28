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
        <div className="flex min-w-[64px] flex-shrink-0 flex-col items-center sm:min-w-[72px] md:min-w-[80px]">
            <div className="relative">
                {/* Story Ring */}
                <div className="rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 p-[2px]">
                    <div className="rounded-full bg-black p-[2px]">
                        <img
                            src={story.image}
                            alt={story.username}
                            className="h-14 w-14 rounded-full object-cover sm:h-16 sm:w-16"
                        />
                    </div>
                </div>

                {/* Your Story Badge */}
                {story.isOwn && (
                    <div className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-black bg-blue-600 sm:h-6 sm:w-6">
                        <Plus className="h-3 w-3 text-white sm:h-3.5 sm:w-3.5" />
                    </div>
                )}
            </div>

            <p className="mt-2 w-16 truncate text-center text-[10px] text-zinc-300 sm:w-20 sm:text-xs">
                {story.username}
            </p>
        </div>
    );
};

export default StoryCard;