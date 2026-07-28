import { Bell, MessageCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";

const MobileNavbar = () => {
    return (
        <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black lg:hidden">
            <div className="flex h-14 items-center justify-between px-3 sm:h-16 sm:px-4">
                {/* Logo */}
                <Link to="/">
                    <h1 className="text-lg font-bold tracking-tight sm:text-2xl">
                        ConnectGram
                    </h1>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-1 sm:gap-2">
                    <button className="rounded-full p-2 transition hover:bg-zinc-900">
                        <Search
                            size={20}
                            className="text-zinc-300 sm:h-[22px] sm:w-[22px]"
                        />
                    </button>

                    <button className="relative rounded-full p-2 transition hover:bg-zinc-900">
                        <Bell
                            size={20}
                            className="text-zinc-300 sm:h-[22px] sm:w-[22px]"
                        />

                        {/* Notification Badge */}
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
                    </button>

                    <button className="relative rounded-full p-2 transition hover:bg-zinc-900">
                        <MessageCircle
                            size={20}
                            className="text-zinc-300 sm:h-[22px] sm:w-[22px]"
                        />

                        {/* Message Badge */}
                        <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[8px] font-semibold text-white sm:right-2 sm:top-2 sm:text-[9px]">
                            2
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default MobileNavbar;