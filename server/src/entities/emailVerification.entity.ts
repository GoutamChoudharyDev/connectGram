import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { User } from "./user.entity.js";

// Email verification entity
@Entity("email_verification")
export class EmailVerification {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 6
    })
    otp!: string;

    @Column()
    expiresAt!: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => User, (user) => user.emailVerifications, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "userId" })
    user!: Relation<User>;
}