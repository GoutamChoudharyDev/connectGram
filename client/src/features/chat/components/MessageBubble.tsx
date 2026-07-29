import type { MessageBubbleProps } from "../types/chat.types";

const MessageBubble = ({ message }: MessageBubbleProps) => {
    return (
        <div className="flex justify-end px-12 py-2">
            <div className="max-w-md rounded-2xl rounded-br-md bg-blue-600 px-4 py-3">
                <p className="text-sm text-white">
                    {message.content}
                </p>

                <p className="mt-2 text-right text-xs text-blue-100">
                    {message.createdAt}
                </p>
            </div>
        </div>
    );
};

export default MessageBubble;