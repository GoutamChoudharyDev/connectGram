import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(() => User, {
        onDelete: "CASCADE" // it means if user is deleted then all records will automatically deleted
    })
    @JoinColumn({
        name: "userId"
    })
    user!: User;
}