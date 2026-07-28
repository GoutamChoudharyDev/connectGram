const TypingIndicator = () => {
    return (
        <div className="flex justify-start px-4 py-2">
            <div className="rounded-2xl rounded-bl-md bg-zinc-800 px-4 py-3">
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" />
                    <span
                        className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"
                        style={{ animationDelay: "0.15s" }}
                    />
                    <span
                        className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"
                        style={{ animationDelay: "0.3s" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TypingIndicator;