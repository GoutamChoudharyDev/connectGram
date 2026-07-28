import { MessageCircleMore } from "lucide-react";

const EmptyChat = () => {
    return (
        <div className="flex h-full flex-1 items-center justify-center bg-zinc-950">
            <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
                    <MessageCircleMore
                        size={44}
                        className="text-zinc-400"
                    />
                </div>

                <h2 className="text-2xl font-semibold text-white">
                    Your Messages
                </h2>

                <p className="mt-2 max-w-sm text-sm text-zinc-500">
                    Select a conversation from the left to start chatting.
                </p>
            </div>
        </div>
    );
};

export default EmptyChat;