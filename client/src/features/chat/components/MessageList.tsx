import type { MessageListProps } from "../types/chat.types";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages }: MessageListProps) => {
    return (
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto bg-zinc-950 px-4 py-6">
            {messages.map((message) => (
                <MessageBubble
                    key={message.id}
                    message={message}
                />
            ))}
        </div>
    );
};

export default MessageList;