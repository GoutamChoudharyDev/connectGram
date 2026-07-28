import { Paperclip, SendHorizontal, Smile, Plus } from "lucide-react";

const ChatInput = () => {
    return (
        <div className="border-t border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">
                <button className="text-zinc-400 transition hover:text-white">
                    <Plus size={22} />
                </button>

                <button className="text-zinc-400 transition hover:text-white">
                    <Paperclip size={20} />
                </button>

                <input
                    type="text"
                    placeholder="Write a message..."
                    className="flex-1 bg-transparent text-white placeholder:text-zinc-500 focus:outline-none"
                />

                <button className="text-zinc-400 transition hover:text-white">
                    <Smile size={22} />
                </button>

                <button className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700">
                    <SendHorizontal size={20} />
                </button>
            </div>
        </div>
    );
};

export default ChatInput;