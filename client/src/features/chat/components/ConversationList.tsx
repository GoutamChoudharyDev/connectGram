import type { ConversationListProps } from "../types/chat.types";
import ConversationItem from "./ConversationItem";

const ConversationList = ({ conversations, selectedConversation, onSelect }: ConversationListProps) => {
    return (
        <div className="w-full overflow-y-auto">
            {conversations.map((conversation) => (
                <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    selected={selectedConversation?.id === conversation.id}
                    onClick={() => onSelect(conversation)}
                />
            ))}
        </div>
    );
};

export default ConversationList;