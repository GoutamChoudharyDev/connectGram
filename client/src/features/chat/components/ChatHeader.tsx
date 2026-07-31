import { Info, Phone, Video } from "lucide-react";
import type { ChatHeaderProps } from "../types/chat.types";

const ChatHeader = ({ conversation, currentUserId, onlineUsers }: ChatHeaderProps) => {

    // find other participant
    const otherParticipant = conversation.participants.find(
        participant => participant.user.id !== currentUserId
    )

    if (!otherParticipant) return null;

    const user = otherParticipant.user;

    const isOnline = onlineUsers.includes(otherParticipant.user.id)

    return (
        <header className="shrink-0 flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-3 sm:h-16 sm:px-5">
            {/* User */}
            <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="relative shrink-0">
                    <img
                        src={
                            user.profilePicture ||
                            "https://i.pravatar.cc/150?img=12"
                        }
                        alt={user.username}
                        className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
                    />

                    <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-900 ${isOnline
                                ? "bg-emerald-500"
                                : "bg-zinc-500"
                            }`}
                    />
                </div>

                <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold text-white sm:text-lg">
                        {user.username}
                    </h2>

                    <p
                        className={`truncate text-[11px] ${isOnline
                                ? "text-emerald-500"
                                : "text-zinc-500"
                            }`}
                    >
                        {isOnline ? "Online" : "Offline"}
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="ml-3 flex shrink-0 items-center">
                <button className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white sm:p-3">
                    <Phone className="h-5 w-5" />
                </button>

                <button className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white sm:p-3">
                    <Video className="h-5 w-5" />
                </button>

                <button className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white sm:p-3">
                    <Info className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
};

export default ChatHeader;