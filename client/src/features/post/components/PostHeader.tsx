import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { PostHeaderProps } from "../types/post.types";

const PostHeader = ({ user, createdAt, isOwner = true, onEdit, onDelete }: PostHeaderProps) => {
    // useStates
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
                <img
                    src={user.profilePicture}
                    alt={user.fullName}
                    className="h-11 w-11 rounded-full object-cover"
                />

                <div>
                    <h3 className="text-sm font-semibold text-white">
                        {user.username}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <span>@{user.username}</span>
                        <span>•</span>
                        <span>{createdAt}</span>
                    </div>
                </div>
            </div>

            <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="rounded-full p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"
                >
                    <MoreHorizontal className="cursor-pointer" size={20} />
                </button>

                {open && (
                    <div className="absolute cursor-pointer right-0 mt-2 w-40 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl">
                        {isOwner ? (
                            <>
                                <button
                                    onClick={() => {
                                        setOpen(false);
                                        onEdit?.();
                                    }}
                                    className="flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-sm text-white hover:bg-zinc-800"
                                >
                                    <Pencil className="cursor-pointer" size={16} />
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        setOpen(false);
                                        onDelete?.();
                                    }}
                                    className="flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-zinc-800"
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </button>
                            </>
                        ) : (
                            <button className="w-full cursor-pointer px-4 py-3 text-left text-sm text-red-500 hover:bg-zinc-800">
                                Report
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostHeader;