import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { PostHeaderProps } from "../types/post.types";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../../../utils/formatTime";

const PostHeader = ({ user, createdAt, isOwner = true, onEdit, onDelete }: PostHeaderProps) => {
    // useStates
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // navigate
    const navigate = useNavigate();

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
        <div className="flex items-center justify-between gap-2 p-3 sm:p-4">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <img
                    src={user.profilePicture}
                    onClick={() => navigate(`/profile/${user.username}`)}
                    alt={user.fullName}
                    className="h-10 cursor-pointer w-10 rounded-full object-cover sm:h-11 sm:w-11"
                />

                <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-white">
                        {user.fullName}
                    </h3>

                    <div className="flex items-center gap-2 overflow-hidden text-[11px] text-zinc-400 sm:text-xs">
                        <span className="truncate">@{user.username}</span>
                        <span className="shrink-0">•</span>
                        <span className="shrink-0">{formatTime(createdAt)}</span>
                    </div>
                </div>
            </div>

            <div className="relative shrink-0" ref={menuRef}>
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
                >
                    <MoreHorizontal
                        className="cursor-pointer"
                        size={20}
                    />
                </button>

                {open && (
                    <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl">
                        {isOwner ? (
                            <>
                                <button
                                    onClick={() => {
                                        setOpen(false);
                                        onEdit?.();
                                    }}
                                    className="flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-sm text-white hover:bg-zinc-800"
                                >
                                    <Pencil size={16} />
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