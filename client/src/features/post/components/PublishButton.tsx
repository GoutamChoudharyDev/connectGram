import { Send } from "lucide-react";

const PublishButton = () => {
    return (
        <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500"
        >
            <Send size={18} />
            Share Post
        </button>
    );
};

export default PublishButton;