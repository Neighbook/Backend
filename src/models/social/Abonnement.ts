import {Entity, Column, JoinColumn, PrimaryGeneratedColumn, OneToOne} from 'typeorm'
import {Event} from "./Evenement";

@Entity('Abonnements')
export class Abonnement {
    @PrimaryGeneratedColumn()
    Id!: number

    @OneToOne(() => Event) @JoinColumn()
    IdEvenement!: Event

    @Column()
    IdUtilisateur!: string;
}
