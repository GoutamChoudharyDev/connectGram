import { socket } from "../../../socket/socket";
import { formatTime } from "../../../utils/formatTime";
import type { MessageBubbleProps } from "../types/chat.types";

const MessageBubble = ({ message, currentUserId, selectedMessageId, onSelectMessageId }: MessageBubbleProps) => {
    // check is own message(for allinging)
    const isOwnMessage = message.sender.id === currentUserId;
    const isSelected = selectedMessageId === message.id;

    return (
        <div
            className={`
                flex w-full px-2 py-1 sm:px-4 sm:py-2 
                ${isOwnMessage ? "justify-end" : "justify-start"}
            `}
        >
            <div className="relative">
                {/* Action Popup */}
                {isOwnMessage && isSelected && (
                    <div
                        className="absolute -top-12 right-0 z-10 w-32 max-w-[calc(100vw-1rem)] 
                        border border-zinc-700 bg-zinc-900 p-1 shadow-lg rounded-lg"
                    >
                        <button
                            className="w-full rounded-md px-3 py-2 text-left text-sm text-red-400 hover:bg-zinc-800"
                            onClick={(e) => {
                                e.stopPropagation();

                                // emit unsend message event
                                socket.emit("unsend-message", {
                                    messageId: message.id
                                })

                                onSelectMessageId(null);
                            }}
                        >
                            Unsend
                        </button>
                    </div>
                )}

                {/* Message Bubble */}
                <div
                    onClick={() => {
                        if (!isOwnMessage) return;

                        onSelectMessageId((prev) =>
                            prev === message.id ? null : message.id
                        );
                    }}

                    className={`
                        max-w-xl rounded-2xl px-3 py-2
                        text-sm sm:px-4 sm:py-2.5 break-words whitespace-pre-wrap 
                        ${isOwnMessage
                            ? "rounded-br-md bg-blue-600"
                            : "rounded-bl-md bg-zinc-800"
                        }
                    `}
                >
                    <p className="whitespace-pre-wrap break-all text-xs leading-5 text-white sm:text-sm lg:text-base">
                        {message.content}
                    </p>

                    <p
                        className={`mt-1 text-[9px] sm:mt-2 sm:text-[10px] lg:text-xs ${isOwnMessage
                            ? "text-right text-blue-100"
                            : "text-left text-zinc-400"
                            }`}
                    >
                        {formatTime(message.createdAt)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;