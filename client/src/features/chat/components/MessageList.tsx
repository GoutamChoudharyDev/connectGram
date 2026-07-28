import MessageBubble from "./MessageBubble";
import MessageImage from "./MessageImage";

const MessageList = () => {
    return (
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto bg-zinc-950 px-4 py-6">
            <MessageBubble />
            <MessageBubble />
            <MessageImage />
        </div>

        //         {messages.map((message) =>
        //     message.type === "IMAGE" ? (
        //         <MessageImage key={message.id} />
        //     ) : (
        //         <MessageBubble key={message.id} />
        //     )
        // )}
    );
};

export default MessageList;