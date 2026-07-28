import ConversationItem from "./ConversationItem";

const ConversationList = () => {
    return (
        <div className="w-full overflow-y-auto">
            <ConversationItem />
            {/* {conversations.map((conversation) => (
                <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                />
            ))} */}
        </div>
    );
};

export default ConversationList;