const MessageImage = () => {
    return (
        <div className="flex justify-end px-4 py-2">
            <div className="max-w-xs overflow-hidden rounded-2xl rounded-br-md bg-zinc-900">
                <img
                    src="https://picsum.photos/400/300"
                    alt="Message"
                    className="h-auto w-full object-cover"
                />

                <p className="px-3 py-2 text-right text-xs text-zinc-400">
                    10:24 AM
                </p>
            </div>
        </div>
    );
};

export default MessageImage;