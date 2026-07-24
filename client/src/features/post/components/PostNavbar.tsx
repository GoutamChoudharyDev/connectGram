import { Search, Settings, EllipsisVertical } from "lucide-react";

const PostNavbar = () => {
    return (
        <header className="sticky top-0 z-40 border-b border-zinc-800 bg-black/90 backdrop-blur">
            <div className="flex h-16 items-center justify-between px-4 lg:ml-64 lg:px-8">
                {/* Search */}
                <div className="relative w-full max-w-md">
                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                    />

                    <input
                        type="text"
                        placeholder="Search the network..."
                        className="h-11 w-full rounded-full border border-zinc-800 bg-zinc-950 pl-11 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500"
                    />
                </div>

                {/* Actions */}
                <div className="ml-6 flex items-center gap-2">
                    <button className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
                        <Settings size={20} />
                    </button>

                    <button className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
                        <EllipsisVertical size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default PostNavbar