import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { ConversationParticipant } from "./conversationParticipants.entity.js";
import { Message } from "./message.entity.js";

@Entity("conversations")
export class Conversation {
    @PrimaryGeneratedColumn()
    id!: number;

    // Users in this conversation
    @OneToMany(() => ConversationParticipant, (participant) => participant.conversation)
    participants!: Relation<ConversationParticipant[]>

    // Message in this conversation
    @OneToMany(() => Message, (message) => message.conversation)
    messages!: Relation<Message[]>;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}