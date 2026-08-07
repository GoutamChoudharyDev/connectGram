import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

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

// const RightSidebar = () => {
//     const { user } = useAuth();
//     return (
//         <aside className="hidden xl:block w-80 p-6">
//             <div className="sticky top-24 space-y-6">
//                 {/* Current User */}
//                 <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
//                     <div className="flex items-center gap-3">
//                         <img
//                             src={user?.profilePicture || "https://i.pravatar.cc/150?img=12"}
//                             alt="Profile"
//                             className="h-14 w-14 rounded-full object-cover"
//                         />

//                         <div>
//                             <h3 className="font-semibold text-white">
//                                 {user?.fullName}
//                             </h3>

//                             <p className="text-sm text-zinc-400">
//                                 @{user?.username}
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Suggestions */}
//                 <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
//                     <div className="mb-4 flex items-center justify-between">
//                         <h3 className="font-semibold">
//                             Suggested for you
//                         </h3>

//                         <Link
//                             to="/explore"
//                             className="text-sm text-blue-500 hover:text-blue-400"
//                         >
//                             See all
//                         </Link>
//                     </div>

//                     <div className="space-y-4">
//                         {suggestions.map((user) => (
//                             <div
//                                 key={user.id}
//                                 className="flex items-center justify-between"
//                             >
//                                 <div className="flex items-center gap-3">
//                                     <img
//                                         src={user.avatar}
//                                         alt={user.name}
//                                         className="h-10 w-10 rounded-full object-cover"
//                                     />

//                                     <div>
//                                         <p className="text-sm font-medium">
//                                             {user.name}
//                                         </p>

//                                         <p className="text-xs text-zinc-500">
//                                             {user.username}
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <button className="text-sm font-medium text-blue-500 hover:text-blue-400">
//                                     Follow
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="text-xs leading-6 text-zinc-500">
//                     © 2026 ConnectGram
//                 </div>
//             </div>
//         </aside>
//     );    
// };

const RightSidebar = () => {
    const { user } = useAuth();

    return (
        <aside className="sticky top-0 hidden h-screen w-80 shrink-0 xl:block">
            <div className="sticky top-24 space-y-6 px-4 py-6">
                {/* Current User */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                    <div className="flex items-center gap-3">
                        <img
                            src={
                                user?.profilePicture ||
                                "https://i.pravatar.cc/150?img=12"
                            }
                            alt="Profile"
                            className="h-14 w-14 rounded-full object-cover"
                        />

                        <div className="min-w-0">
                            <h3 className="truncate font-semibold text-white">
                                {user?.fullName}
                            </h3>

                            <p className="truncate text-sm text-zinc-400">
                                @{user?.username}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Suggestions */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-base font-semibold text-white">
                            Suggested for you
                        </h3>

                        <Link
                            to="/explore"
                            className="text-sm font-medium text-blue-500 transition hover:text-blue-400"
                        >
                            See all
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {suggestions.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between gap-3"
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-white">
                                            {user.name}
                                        </p>

                                        <p className="truncate text-xs text-zinc-500">
                                            {user.username}
                                        </p>
                                    </div>
                                </div>

                                <button className="shrink-0 text-sm font-medium text-blue-500 transition hover:text-blue-400">
                                    Follow
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-zinc-800 pt-4 text-center text-xs text-zinc-500">
                    © 2026 ConnectGram
                </div>
            </div>
        </aside>
    );
};

export default RightSidebar;