import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity.js";
import { Post } from "./post.entity.js";

@Entity("comments")
export class Comment {
    // id
    @PrimaryGeneratedColumn()
    id!: number;

    // content
    @Column({
        type: "text"
    })
    content!: string;

    // user
    @ManyToOne(() => User, (user) => user.comments, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "userId" })
    user!: Relation<User>;

    // post
    @ManyToOne(() => Post, (post) => post.comments, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "postId" })
    post!: Relation<Post>;

    // parentComment (nullable)
    @ManyToOne(() => Comment, (comment) => comment.replies, {
        nullable: true,
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "parentCommentId" })
    parentComment!: Relation<Comment> | null;

    // replies
    @OneToMany(() => Comment, (comment) => comment.parentComment)
    replies!: Relation<Comment[]>;

    // createdAt
    @CreateDateColumn()
    createdAt!: Date;

    // updatedAt
    @UpdateDateColumn()
    updatedAt!: Date;
}