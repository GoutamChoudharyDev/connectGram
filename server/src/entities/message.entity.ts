import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { Conversation } from "./conversation.entity.js";
import { User } from "./user.entity.js";

@Entity("messages")
export class Message {
    @PrimaryGeneratedColumn()
    id!: number;

    // conversation
    @ManyToOne(() => Conversation, (conversation) => conversation.messages, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "conversationId" })
    conversation!: Relation<Conversation>;

    // sender
    @ManyToOne(() => User, (sender) => sender.messages, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "senderId" })
    sender!: Relation<User>;

    // content
    @Column({
        type: "text",
        nullable: true
    })
    content!: string | null;

    // isRead
    @Column({
        default: false
    })
    isRead!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}