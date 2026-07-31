import { Bell, MessageCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";

const MobileNavbar = () => {
    return (
        <header
            className="sticky top-0 z-50 border-b border-zinc-800/80 bg-black/95 backdrop-blur-lg lg:hidden"
            style={{
                paddingTop: "env(safe-area-inset-top)",
            }}
        >
            <div className="flex h-14 items-center justify-between px-4 sm:h-16">
                {/* Logo */}
                <Link
                    to="/home-page"
                    className="truncate text-lg font-bold tracking-tight sm:text-xl"
                >
                    ConnectGram
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-1">
                    <Link
                        to="/explore"
                        className="rounded-full p-2.5 transition hover:bg-zinc-900"
                    >
                        <Search className="h-5 w-5 text-zinc-300" />
                    </Link>

                    <Link
                        to="/notifications"
                        className="relative rounded-full p-2.5 transition hover:bg-zinc-900"
                    >
                        <Bell className="h-5 w-5 text-zinc-300" />

                        {/* Notification Badge */}
                        <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
                    </Link>

                    <Link
                        to="/messages"
                        className="relative rounded-full p-2.5 transition hover:bg-zinc-900"
                    >
                        <MessageCircle className="h-5 w-5 text-zinc-300" />

                        {/* Message Badge */}
                        <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-semibold text-white">
                            2
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default MobileNavbar;