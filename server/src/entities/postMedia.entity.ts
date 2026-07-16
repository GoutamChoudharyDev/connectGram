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

    @Column()
    url!: string;

    @Column()
    publicId!: string;

    @Column({
        type: "enum",
        enum: MediaType
    })
    type!: "IMAGE" | "VIDEO";

    @ManyToOne(() => Post, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "postId" })
    post!: Post;

    @CreateDateColumn()
    createdAt!: Date
}