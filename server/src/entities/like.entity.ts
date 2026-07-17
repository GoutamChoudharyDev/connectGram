import { CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { User } from "./user.entity.js";
import { Post } from "./post.entity.js";

@Index(["user", "post"], { unique: true }) // it's like composite key(combination of user and post should be unique)
@Entity("likes")
export class Like {
    @PrimaryGeneratedColumn()
    id!: number;

    // User who liked the post
    @ManyToOne(() => User, (user) => user.likes, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "userId" })
    user!: Relation<User>;

    // Liked post
    @ManyToOne(() => Post, (post) => post.likes, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    post!: Relation<Post>

    // createdAt
    @CreateDateColumn()
    createdAt!: Date;
}
