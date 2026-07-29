import { Info, Phone, Video } from "lucide-react";
import type { ChatHeaderProps } from "../types/chat.types";

const ChatHeader = ({ conversation, currentUserId }: ChatHeaderProps) => {

    // find other participant
    const otherParticipant = conversation.participants.find(
        participant => participant.user.id !== currentUserId
    )

    if (!otherParticipant) return null;

    const user = otherParticipant.user;

    return (
        <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <img
                        src={user.profilePicture || "https://i.pravatar.cc/150?img=12"}
                        alt="Profile"
                        className="h-12 w-12 rounded-full object-cover"
                    />

                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-zinc-950 bg-emerald-500" />
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-white">
                        {user.username}
                    </h2>

                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                        Online
                    </p>
                </div>
            </div>

            <div className="flex items-center divide-x divide-zinc-800">
                <button className="px-5 py-3 text-zinc-400 transition hover:text-white">
                    <Phone size={20} />
                </button>

                <button className="px-5 py-3 text-zinc-400 transition hover:text-white">
                    <Video size={20} />
                </button>

                <button className="px-5 py-3 text-zinc-400 transition hover:text-white">
                    <Info size={20} />
                </button>
            </div>
        </header>
    );
};

export default ChatHeader;

