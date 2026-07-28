const MessageBubble = () => {
    return (
        <div className="flex justify-end px-4 py-2">
            <div className="max-w-md rounded-2xl rounded-br-md bg-blue-600 px-4 py-3">
                <p className="text-sm text-white">
                    Hey! The UI is looking great. Let's integrate the APIs next.
                </p>

                <p className="mt-2 text-right text-xs text-blue-100">
                    10:24 AM
                </p>
            </div>
        </div>
    );
};

export default MessageBubble;