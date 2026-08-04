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
                flex w-full px-2 py-1.5 sm:px-4 sm:py-2 
                ${isOwnMessage ? "justify-end" : "justify-start"}
            `}
        >
            <div className="relative">
                {/* Action Popup */}
                {isOwnMessage && isSelected && (
                    <div className="absolute -top-12 right-0 z-10 w-32 rounded-lg border border-zinc-700 bg-zinc-900 p-1 shadow-lg">
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
                    className={`min-w-0 max-w-[85%] break-words rounded-2xl px-3 py-2 sm:max-w-lg sm:px-4 sm:py-3 
                        ${isOwnMessage
                            ? "rounded-br-md bg-blue-600"
                            : "rounded-bl-md bg-zinc-800"
                        }`}
                >
                    <p className="break-words whitespace-pre-wrap text-sm leading-5 text-white">
                        {message.content}
                    </p>

                    <p
                        className={`mt-2 text-[10px] sm:text-xs ${isOwnMessage
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