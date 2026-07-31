import type { ConversationItemProps } from "../types/chat.types";

const ConversationItem = ({ conversation, selected, onClick, currentUserId, onlineUsers }: ConversationItemProps) => {

    // find other participant
    const otherParticipant = conversation.participants.find(
        participant => participant.user.id !== currentUserId
    )

    if (!otherParticipant) return null;

    const user = otherParticipant.user;

    const isOnline = onlineUsers.includes(otherParticipant?.user.id ?? -1);

    return (
        <button
            onClick={onClick}
            className={`flex w-full items-center gap-3 px-3 py-3 transition hover:bg-zinc-800 sm:px-4 sm:py-4 ${selected
                    ? "border-l-2 border-blue-600 bg-zinc-900"
                    : "border-l-2 border-transparent"
                }`}
        >
            <div className="relative shrink-0">
                <img
                    src={
                        user.profilePicture ||
                        "https://i.pravatar.cc/150?img=12"
                    }
                    alt={user.username}
                    className="h-12 w-12 rounded-full object-cover sm:h-14 sm:w-14"
                />

                {/* Online / Offline */}
                <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-900 sm:h-3.5 sm:w-3.5 ${isOnline
                            ? "bg-emerald-500"
                            : "bg-zinc-500"
                        }`}
                />
            </div>

            <div className="min-w-0 flex-1 text-left">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-base font-semibold text-white sm:text-lg">
                        {user.username}
                    </h3>

                    <span className="shrink-0 text-[10px] font-medium text-blue-500 sm:text-xs">
                        2m ago
                    </span>
                </div>

                <p className="mt-1 truncate text-xs text-zinc-500 sm:text-sm">
                    {isOnline ? "Online" : "Offline"}
                </p>
            </div>
        </button>
    );
};

export default ConversationItem;