import { Send } from "lucide-react";
import type { PublishButtonProps } from "../types/post.types";

const PublishButton = ({ onClick, text = "Shar Post" }: PublishButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500"
        >
            <Send size={18} />
            {text}
        </button>
    );
};

export default PublishButton;