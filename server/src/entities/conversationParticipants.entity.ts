import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { User } from "./user.entity.js";
import { Conversation } from "./conversation.entity.js";

@Entity("conversation_participants")
export class ConversationParticipant {
    @PrimaryGeneratedColumn()
    id!: number;

    // user who participats
    @ManyToOne(() => Conversation, (conversation) => conversation.participants, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "conversationId" })
    conversation!: Relation<Conversation>;

    // user who participats
    @ManyToOne(() => User, (user) => user.conversationParticipants, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "userId" })
    user!: Relation<User>;

    @CreateDateColumn()
    joinedAt!: Date;
}