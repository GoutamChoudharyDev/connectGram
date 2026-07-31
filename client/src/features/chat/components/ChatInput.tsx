import { Paperclip, SendHorizontal, Smile, Plus } from "lucide-react";
import type { ChatInputProps } from "../types/chat.types";
import { useState, type SubmitEvent } from "react";
import { socket } from "../../../socket/socket";

const ChatInput = ({ conversationId }: ChatInputProps) => {
    // use state
    const [content, setContent] = useState("");

    // handle submit
    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!content.trim()) return;

        // call the send-message event 
        socket.emit("send-message", {
            conversationId,
            content: content.trim(),
        });

        setContent("");
    }
    return (
        <div className="shrink-0 border-t border-zinc-800 bg-zinc-950 p-2 sm:p-4">
            <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-3 py-2 sm:gap-3 sm:px-4 sm:py-3"
            >
                {/* Add */}
                <button
                    type="button"
                    className="shrink-0 text-zinc-400 transition hover:text-white"
                >
                    <Plus
                        size={20}
                        className="sm:h-[22px] sm:w-[22px]"
                    />
                </button>

                {/* Attachment */}
                <button
                    type="button"
                    className="hidden shrink-0 text-zinc-400 transition hover:text-white sm:block"
                >
                    <Paperclip
                        size={20}
                    />
                </button>

                {/* Input */}
                <input
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    type="text"
                    placeholder="Write a message..."
                    className=" min-w-0 flex-1 bg-transparent text-sm text-white
                        placeholder:text-zinc-500 focus:outline-none sm:text-base
                    "
                />

                {/* Emoji */}
                <button
                    type="button"
                    className="shrink-0 text-zinc-400 transition hover:text-white"
                >
                    <Smile
                        size={20}
                        className="sm:h-[22px] sm:w-[22px]"
                    />
                </button>

                {/* Send */}
                <button
                    type="submit"
                    className=" flex shrink-0 items-center justify-center rounded-full
                        bg-blue-600 h-9 w-9
                        text-white transition
                        hover:bg-blue-700 sm:h-11 sm:w-11
                    "
                >
                    <SendHorizontal
                        size={18}
                        className="sm:h-5 sm:w-5"
                    />
                </button>
            </form>
        </div>
    );
};

export default ChatInput;