import { Search } from "lucide-react";
import type { SearchMessagesProps } from "../types/chat.types";

const SearchMessages = ({ search, setSearch }: SearchMessagesProps) => {

    return (
        <div className="border-b border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
                <Search size={18} className="text-zinc-500" />

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search messages..."
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                />
            </div>
        </div>
    );
};

export default SearchMessages;