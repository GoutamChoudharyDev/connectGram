import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity.js";
import { PostMedia } from "./postMedia.entity.js";

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
    user!: User

    // Post media(images/videos)
    @OneToMany(() => PostMedia, (media) => media.post, {
        cascade: true
    })
    media!: PostMedia[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}