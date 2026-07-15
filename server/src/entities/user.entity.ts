import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({ default: false })
    isVerified!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}