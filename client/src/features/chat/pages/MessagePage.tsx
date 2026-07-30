import { useEffect, useState } from "react";
import MainLayout from "../../../components/layout/MainLayout";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import ConversationList from "../components/ConversationList";
import MessageList from "../components/MessageList";
import SearchMessages from "../components/SearchMessage";
import { getMessageApi, getMyConversationApi } from "../services/chat.service";
import type { Conversation, Message } from "../types/chat.types";
import EmptyChat from "../components/EmptyChat";
import { useAuth } from "../../../hooks/useAuth";
import { socket } from "../../../socket/socket";

const MessagesPage = () => {
    // use states
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    // get user
    const { user } = useAuth();

    // fetch Conversations
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                setLoading(true);

                const conversationResponse = await getMyConversationApi();
                setConversations(conversationResponse.data);

                // console.log("conversation respones : ", conversationResponse);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        }

        fetchConversations();
    }, [])

    // fetch Messages
    useEffect(() => {
        if (!selectedConversation) return;

        const fetchMessages = async (conversationId: number) => {
            try {
                const messageResponse = await getMessageApi(conversationId);
                setMessages(messageResponse.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchMessages(selectedConversation.id);
    }, [selectedConversation]);

    // Listen for new messages
    useEffect(() => {
        const handleNewMessage = (message: Message) => {
            // append only new message instead of every message
            if (message.conversation.id === selectedConversation?.id) {
                setMessages((prev) => [...prev, message]);
            }
        }

        socket.on("new-message", handleNewMessage);

        return () => {
            socket.off("new-message", handleNewMessage);
        }
    }, [selectedConversation]);


    return (
        <MainLayout>
            <div className="flex h-[calc(100vh-4rem)] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
                {/* Left Panel */}
                <div className="w-80 border-r border-zinc-800">
                    <SearchMessages />
                    {loading ? (
                        <p className="p-4 text-center text-zinc-400">Loading...</p>
                    ) :
                        <ConversationList
                            conversations={conversations}
                            selectedConversation={selectedConversation}
                            onSelect={setSelectedConversation}
                        />
                    }
                </div>

                {/* Right Panel */}
                {selectedConversation ? (
                    <div className="flex flex-1 flex-col">
                        <ChatHeader
                            conversation={selectedConversation}
                            currentUserId={user?.id}
                        />

                        {/* Replace with <EmptyChat /> when no conversation is selected */}
                        <MessageList messages={messages} />

                        <ChatInput conversationId={selectedConversation.id} />
                    </div>
                ) : (
                    <EmptyChat />
                )}
            </div>
        </MainLayout>
    );
};

export default MessagesPage;