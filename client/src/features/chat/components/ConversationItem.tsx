import type { ConversationItemProps } from "../types/chat.types";

const ConversationItem = ({ conversation, selected, onClick, currentUserId }: ConversationItemProps) => {

    // find other participant
    const otherParticipant = conversation.participants.find(
        participant => participant.user.id !== currentUserId
    )

    if (!otherParticipant) return null;

    const user = otherParticipant.user;

    return (
        <button
            onClick={onClick}
            className={`flex w-full items-center gap-3 px-4 py-4 transition hover:bg-zinc-800 ${selected
                ? "border-l-2 border-blue-600 bg-zinc-900"
                : "border-l-2 border-transparent"
                }`}>
            <div className="relative flex-shrink-0">
                <img
                    src={user.profilePicture || "https://i.pravatar.cc/150?img=12"}
                    alt="Alex Rivers"
                    className="h-14 w-14 rounded-full object-cover"
                />

                <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-zinc-900 bg-emerald-500" />
            </div>

            <div className="min-w-0 flex-1 text-left">
                <div className="flex items-center justify-between">
                    <h3 className="truncate text-lg font-semibold text-white">
                        {user.username}
                    </h3>

                    <span className="text-xs font-medium text-blue-500">
                        2m ago
                    </span>
                </div>
            </div>
        </button>
    );
};

export default ConversationItem;