import { MessageCircleMore } from "lucide-react";

const EmptyChat = () => {
    return (
        <div className="flex h-full flex-1 items-center justify-center bg-zinc-950 px-6">
            <div className="flex max-w-sm flex-col items-center text-center">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 sm:h-24 sm:w-24">
                    <MessageCircleMore
                        size={36}
                        className="text-zinc-400 sm:h-11 sm:w-11"
                    />
                </div>

                <h2 className="text-xl font-semibold text-white sm:text-2xl">
                    Your Messages
                </h2>

                <p className="mt-2 text-sm leading-6 text-zinc-500 sm:text-base">
                    Select a conversation from the left to start chatting.
                </p>
            </div>
        </div>
    );
};

export default EmptyChat;