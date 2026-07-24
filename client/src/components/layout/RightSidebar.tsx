import { Link } from "react-router-dom";

const suggestions = [
    {
        id: 1,
        name: "Emma Watson",
        username: "@emma",
        avatar: "https://i.pravatar.cc/150?img=32",
    },
    {
        id: 2,
        name: "John Doe",
        username: "@john",
        avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
        id: 3,
        name: "Sophia",
        username: "@sophia",
        avatar: "https://i.pravatar.cc/150?img=25",
    },
];

const RightSidebar = () => {
    return (
        <aside className="hidden xl:block w-80 p-6">
            <div className="sticky top-24 space-y-6">
                {/* Current User */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://i.pravatar.cc/150?img=12"
                            alt="Profile"
                            className="h-14 w-14 rounded-full object-cover"
                        />

                        <div>
                            <h3 className="font-semibold text-white">
                                Alex Rivera
                            </h3>

                            <p className="text-sm text-zinc-400">
                                @alexrivera
                            </p>
                        </div>
                    </div>
                </div>

                {/* Suggestions */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold">
                            Suggested for you
                        </h3>

                        <Link
                            to="/explore"
                            className="text-sm text-blue-500 hover:text-blue-400"
                        >
                            See all
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {suggestions.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />

                                    <div>
                                        <p className="text-sm font-medium">
                                            {user.name}
                                        </p>

                                        <p className="text-xs text-zinc-500">
                                            {user.username}
                                        </p>
                                    </div>
                                </div>

                                <button className="text-sm font-medium text-blue-500 hover:text-blue-400">
                                    Follow
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="text-xs leading-6 text-zinc-500">
                    © 2026 ConnectGram
                </div>
            </div>
        </aside>
    );
};

export default RightSidebar;