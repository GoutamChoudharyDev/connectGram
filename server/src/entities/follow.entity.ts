import { CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { User } from "./user.entity.js";

@Entity("followers")
// unique index so the same user can't follow the same person twice
@Index(["follower", "following"], { unique: true })
export class Follow {
    @PrimaryGeneratedColumn()
    id!: number;

    // user who follows
    @ManyToOne(() => User, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "followerId" })
    follower!: Relation<User>;

    // followed user
    @ManyToOne(() => User, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "followingId" })
    following!: Relation<User>;

    @CreateDateColumn()
    createdAt!: Date;
}