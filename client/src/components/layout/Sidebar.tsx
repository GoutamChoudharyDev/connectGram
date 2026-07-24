import {
    Home,
    Search,
    Bell,
    MessageCircle,
    User,
    Plus,
    Settings,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const menuItems = [
    {
        name: "Home",
        icon: Home,
        path: "/",
    },
    {
        name: "Explore",
        icon: Search,
        path: "/explore",
    },
    {
        name: "Notifications",
        icon: Bell,
        path: "/notifications",
    },
    {
        name: "Messages",
        icon: MessageCircle,
        path: "/messages",
    },
    {
        name: "Profile",
        icon: User,
        path: "/profile",
    },
];

const Sidebar = () => {
    return (
        <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-zinc-800 bg-black lg:flex lg:flex-col">
            {/* Logo */}
            <div className="border-b border-zinc-800 px-6 py-7">
                <Link to="/" className="inline-block">
                    <h1 className="text-3xl font-bold tracking-tight">
                        ConnectGram
                    </h1>
                    <p className="mt-1 text-xs uppercase tracking-[0.3em] text-zinc-500">
                        Premium Network
                    </p>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <li key={item.name}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-xl px-4 py-3 transition ${isActive
                                            ? "bg-blue-600 text-white"
                                            : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                                        }`
                                    }
                                >
                                    <Icon size={20} />
                                    <span>{item.name}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Create Post */}
            <div className="px-4">
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium transition hover:bg-blue-500">
                    <Plus size={18} />
                    Create Post
                </button>
            </div>

            {/* User */}
            <div className="m-4 mt-6 flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-3">
                <div className="flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/100?img=12"
                        alt="User"
                        className="h-11 w-11 rounded-full object-cover"
                    />

                    <div>
                        <h3 className="text-sm font-semibold">
                            Alex Rivera
                        </h3>
                        <p className="text-xs text-zinc-400">
                            @alexrivera
                        </p>
                    </div>
                </div>

                <button className="text-zinc-400 transition hover:text-white">
                    <Settings size={18} />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;