import { formatTime } from "../../../utils/formatTime";
import type { MessageBubbleProps } from "../types/chat.types";

const MessageBubble = ({ message, currentUserId }: MessageBubbleProps) => {
    // check is own message
    const isOwnMessage = message.sender.id === currentUserId;

    return (
        <div
            className={`flex px-12 py-2 
            ${isOwnMessage ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`max-w-md rounded-2xl px-4 py-3 ${isOwnMessage
                    ? "rounded-br-md bg-blue-600"
                    : "rounded-bl-md bg-zinc-800"
                    }`}
            >
                <p className="text-sm text-white">
                    {message.content}
                </p>

                <p
                    className={`mt-2 text-xs ${isOwnMessage
                        ? "text-right text-blue-100"
                        : "text-left text-zinc-400"
                        }`}
                >
                    {formatTime(message.createdAt)}
                </p>
            </div>
        </div>
    );
};

export default MessageBubble;