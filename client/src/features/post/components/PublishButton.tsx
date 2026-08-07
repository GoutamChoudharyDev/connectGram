import { Send } from "lucide-react";
import type { PublishButtonProps } from "../types/post.types";

const PublishButton = ({ onClick, text = "Share Post", loading }: PublishButtonProps) => {

    return (
        <button
            type="button"
            disabled={loading}
            onClick={onClick}
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium text-white transition hover:bg-blue-500 ${loading ? "bg-gray-600" : "bg-blue-600"}`}
        >
            <Send size={18} />
            {loading ? "Loading..." : text}
        </button >
    );
};

export default PublishButton;