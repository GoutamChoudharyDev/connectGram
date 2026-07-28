import MainLayout from "../../../components/layout/MainLayout";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import ConversationList from "../components/ConversationList";
import MessageList from "../components/MessageList";
import SearchMessages from "../components/SearchMessage";

const MessagesPage = () => {
    return (
        <MainLayout>
            <div className="flex h-[calc(100vh-4rem)] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
                {/* Left Panel */}
                <div className="w-80 border-r border-zinc-800">
                    <SearchMessages />
                    <ConversationList />
                </div>

                {/* Right Panel */}
                <div className="flex flex-1 flex-col">
                    <ChatHeader />

                    {/* Replace with <EmptyChat /> when no conversation is selected */}
                    <MessageList />

                    <ChatInput />
                </div>
            </div>
        </MainLayout>
    );
};

export default MessagesPage;