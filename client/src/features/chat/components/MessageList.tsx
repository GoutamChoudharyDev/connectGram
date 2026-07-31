import { useEffect, useRef } from "react";
import { useAuth } from "../../../hooks/useAuth";
import type { MessageListProps } from "../types/chat.types";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages }: MessageListProps) => {
    // get logged in user
    const { user } = useAuth();

    // create a ref for autoscrolling
    const bottomRef = useRef<HTMLDivElement>(null);

    // useEffect
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages])

    return (
        <div
            className="min-h-0 flex-1 overflow-y-auto bg-zinc-950 px-2 py-3 sm:px-4 sm:py-6"
        >
            <div className="flex flex-col gap-2">
                {messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                        currentUserId={user?.id}
                    />
                ))}
            </div>

            {/* Auto scroll target */}
            <div ref={bottomRef} />
        </div>
    );
};

export default MessageList;