import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity.js";
import { PostMedia } from "./postMedia.entity.js";
import { Relation } from "typeorm";
import { Like } from "./like.entity.js";
import { Comment } from "./comment.entity.js";

@Entity("posts")
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "text",
        nullable: true
    })
    caption!: string | null;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true
    })
    location!: string | null;

    // Post owner
    @ManyToOne(() => User, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "userId" })
    user!: Relation<User>

    // Post media(images/videos)
    @OneToMany(() => PostMedia, (media) => media.post, {
        cascade: true
    })
    media!: Relation<PostMedia[]>;

    // Post likes
    @OneToMany(() => Like, (like) => like.post)
    likes!: Relation<Like[]>

    // Post comments
    @OneToMany(() => Comment, (comment) => comment.post)
    comments!: Relation<Comment[]>;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}