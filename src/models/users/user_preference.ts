import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
} from "typeorm";
import { User } from "./user";

@Entity("user_preferences")
export class UserPreference {
    @PrimaryGeneratedColumn("uuid")
    id!: number;

    @Column()
    cle_preference!: string;

    @Column()
    valeur_preference!: string;

    @Column()
    @ManyToOne(() => User, (user) => user.id)
    id_utilisateur!: string;

    @CreateDateColumn()
    date_creation!: Date;

    @UpdateDateColumn()
    date_modification!: Date;

    @DeleteDateColumn()
    date_suppression!: Date;
}
