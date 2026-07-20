import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity.js";
import { Like } from "./like.entity.js";
import { Follow } from "./follow.entity.js";
import { Comment } from "./comment.entity.js";
import { EmailVerification } from "./emailVerification.entity.js";

// user entity
@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        unique: true,
        length: 30
    })
    username!: string;

    @Column({
        unique: true,
    })
    email!: string;

    @Column()
    password!: string;

    @Column({
        length: 100
    })
    fullName!: string;

    @Column({
        type: "varchar",
        nullable: true
    })
    profilePicture!: string | null;

    @Column({
        type: "varchar",
        nullable: true
    })
    profilePicturePublicId!: string | null;

    @Column({
        type: "text",
        nullable: true
    })
    bio!: string | null;

    @Column({
        type: "varchar",
        nullable: true
    })
    website!: string | null;

    @OneToMany(() => EmailVerification, (verification) => verification.user)
    emailVerifications!: Relation<EmailVerification[]>;

    // Posts created by this user
    @OneToMany(() => Post, (post) => post.user)
    posts!: Relation<Post[]>;

    // Posts liked by this user
    @OneToMany(() => Like, (like) => like.user)
    likes!: Relation<Like[]>;

    // Users this user follows
    @OneToMany(() => Follow, (follow) => follow.follower)
    followings!: Relation<Follow[]>;

    // Users following this user
    @OneToMany(() => Follow, (follow) => follow.following)
    followers!: Relation<Follow[]>;

    // Comments created by this user
    @OneToMany(() => Comment, (comment) => comment.user)
    comments!: Relation<Comment[]>;

    @Column({ default: false })
    isVerified!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}