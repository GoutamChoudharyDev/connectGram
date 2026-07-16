import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity.js";

export enum MediaType {
    IMAGE = "IMAGE",
    VIDEO = "VIDEO"
}

@Entity("post_media")
export class PostMedia {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "text"
    })
    url!: string;

    @Column({
        type: "text"
    })
    publicId!: string;

    @Column({
        type: "enum",
        enum: MediaType
    })
    type!: MediaType;

    @ManyToOne(() => Post, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "postId" })
    post!: Post;

    @CreateDateColumn()
    createdAt!: Date
}