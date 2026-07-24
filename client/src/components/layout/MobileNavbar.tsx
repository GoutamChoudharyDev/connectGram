import { Bell, MessageCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";

const MobileNavbar = () => {
    return (
        <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black lg:hidden">
            <div className="flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link to="/">
                    <h1 className="text-2xl font-bold tracking-tight">
                        ConnectGram
                    </h1>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <button className="rounded-full p-2 transition hover:bg-zinc-900">
                        <Search
                            size={22}
                            className="text-zinc-300"
                        />
                    </button>

                    <button className="relative rounded-full p-2 transition hover:bg-zinc-900">
                        <Bell
                            size={22}
                            className="text-zinc-300"
                        />

                        {/* Notification Badge */}
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
                    </button>

                    <button className="relative rounded-full p-2 transition hover:bg-zinc-900">
                        <MessageCircle
                            size={22}
                            className="text-zinc-300"
                        />

                        {/* Message Badge */}
                        <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-semibold text-white">
                            2
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default MobileNavbar;