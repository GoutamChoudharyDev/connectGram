import { Paperclip, SendHorizontal, Smile, Plus } from "lucide-react";
import type { ChatInputProps } from "../types/chat.types";
import { useState, type SubmitEvent } from "react";
import { sendMessageApi } from "../services/chat.service";

const ChatInput = ({ conversationId }: ChatInputProps) => {
    // use state
    const [content, setContent] = useState("");

    // handle submit
    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!content.trim()) return;

            const messageResponse = await sendMessageApi(conversationId, content);
            setContent(messageResponse.data.content);
            setContent("");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="border-t border-zinc-800 bg-zinc-950 p-4">
            <form
                onSubmit={handleSubmit}
                className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">
                <button className="text-zinc-400 transition hover:text-white">
                    <Plus size={22} />
                </button>

                <button className="text-zinc-400 transition hover:text-white">
                    <Paperclip size={20} />
                </button>

                <input
                    onChange={(e) => setContent(e.target.value)}
                    type="text"
                    placeholder="Write a message..."
                    className="flex-1 bg-transparent text-white placeholder:text-zinc-500 focus:outline-none"
                />

                <button className="text-zinc-400 transition hover:text-white">
                    <Smile size={22} />
                </button>

                <button
                    type="submit"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700">
                    <SendHorizontal size={20} />
                </button>
            </form>
        </div>
    );
};

export default ChatInput;