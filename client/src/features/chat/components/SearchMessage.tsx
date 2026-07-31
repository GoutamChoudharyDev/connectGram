import { Search } from "lucide-react";
import type { SearchMessagesProps } from "../types/chat.types";

const SearchMessages = ({ search, setSearch }: SearchMessagesProps) => {

    return (
        <div className="border-b border-zinc-800 bg-zinc-950 p-3 sm:p-4">
            <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
                <Search
                    size={18}
                    className="h-4 w-4 text-zinc-500 sm:h-[18px] sm:w-[18px]"
                />

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search messages..."
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-xs placeholder:text-zinc-500 focus:outline-none sm:placeholder:text-sm"
                />
            </div>
        </div>
    );
};

export default SearchMessages;