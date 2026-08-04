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
    const [onlineUsers, setOnlineUsers] = useState<number[]>([]);
    const [search, setSearch] = useState("");
    const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);

    // get user
    const { user } = useAuth();

    // fetch Conversations + Online/Offline status
    useEffect(() => {
        // fetch coversations
        const fetchConversations = async () => {
            try {
                setLoading(true);

                const conversationResponse = await getMyConversationApi();
                setConversations(conversationResponse.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchConversations();

        // handle message unsent
        const handleMessageUnsent = ({ messageId }: { messageId: number }) => {
            setMessages((prev) =>
                prev.filter((message) => message.id !== messageId)
            );
        };

        // handle user online
        const handleUserOnline = (userId: number) => {
            setOnlineUsers((prev) =>
                prev.includes(userId) ? prev : [...prev, userId]
            );
        };

        // handle user offline
        const handleUserOffline = (userId: number) => {
            setOnlineUsers((prev) =>
                prev.filter((id) => id !== userId)
            );
        };

        // socet events listen
        socket.on("message-unsent", handleMessageUnsent);
        socket.on("user-online", handleUserOnline);
        socket.on("user-offline", handleUserOffline);

        // socet events off
        return () => {
            socket.off("message-unsent", handleMessageUnsent);
            socket.off("user-online", handleUserOnline);
            socket.off("user-offline", handleUserOffline);
        };
    }, []);

    // fetch Messages + Listen for new messages
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

        // Listen for new messages
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

    // filter conversation
    const filteredConversations = conversations.filter((conversation) => {
        // Find the other participant
        const otherParticipant = conversation.participants.find(
            (participant) => participant.user.id !== user?.id
        );

        // If no other participant, don't show it
        if (!otherParticipant) return false;

        // Search by username or full name
        return (
            otherParticipant.user.username
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            otherParticipant.user.fullName
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    });

    return (
        <MainLayout fullWidth>
            <div className="flex h-[calc(100dvh-8rem)] overflow-hidden bg-zinc-950 md:h-[calc(100dvh-7rem)] md:rounded-xl md:border md:border-zinc-800">
                {/* Left Panel */}
                <aside
                    className={`
                        ${selectedConversation
                            ? "hidden md:flex"
                            : "flex"
                        }
                    w-full flex-col border-r border-zinc-800
                    md:w-80 lg:w-96
                `}
                >
                    <SearchMessages
                        search={search}
                        setSearch={setSearch}
                    />

                    <div className="min-h-0 flex-1 overflow-y-auto">
                        {loading ? (
                            <p className="p-4 text-center text-zinc-400">
                                Loading...
                            </p>
                        ) : (
                            <ConversationList
                                conversations={filteredConversations}
                                selectedConversation={selectedConversation}
                                onSelect={setSelectedConversation}
                                onlineUsers={onlineUsers}
                            />
                        )}
                    </div>
                </aside>

                {/* Right Panel */}
                <section
                    className={`
                    ${selectedConversation
                            ? "flex"
                            : "hidden md:flex"
                        }
                    min-h-0 flex-1 flex-col overflow-hidden
                `}
                >
                    {selectedConversation ? (
                        <>
                            <ChatHeader
                                conversation={selectedConversation}
                                currentUserId={user?.id}
                                onlineUsers={onlineUsers}
                            />

                            <MessageList
                                messages={messages}
                                selectedMessageId={selectedMessageId}
                                onSelectMessageId={setSelectedMessageId}
                            />

                            <ChatInput
                                conversationId={
                                    selectedConversation.id
                                }
                            />
                        </>
                    ) : (
                        <EmptyChat />
                    )}
                </section>
            </div>
        </MainLayout>
    );
};

export default MessagesPage;