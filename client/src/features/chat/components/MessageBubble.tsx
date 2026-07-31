import { formatTime } from "../../../utils/formatTime";
import type { MessageBubbleProps } from "../types/chat.types";

const MessageBubble = ({ message, currentUserId }: MessageBubbleProps) => {
    // check is own message
    const isOwnMessage = message.sender.id === currentUserId;

    return (
        <div
            className={`flex w-full px-2 py-1.5 sm:px-4 sm:py-2 
                ${isOwnMessage ? "justify-end" : "justify-start"}
            `}
        >
            <div
                className={`min-w-0 max-w-[85%] break-words rounded-2xl px-3 py-2 sm:max-w-lg sm:px-4 sm:py-3
                    ${isOwnMessage
                        ? "rounded-br-md bg-blue-600"
                        : "rounded-bl-md bg-zinc-800"
                    }
                `}
            >
                <p
                    className="break-words whitespace-pre-wrap text-sm leading-5 text-white"
                >
                    {message.content}
                </p>

                <p
                    className={`mt-2 text-[10px] sm:text-xs
                        ${isOwnMessage
                            ? "text-right text-blue-100"
                            : "text-left text-zinc-400"
                        }
                    `}
                >
                    {formatTime(message.createdAt)}
                </p>
            </div>
        </div>
    );
};

export default MessageBubble;