import {Entity, Column, JoinColumn, ManyToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Event} from "./Evenement";

@Entity('Abonnements')
export class Abonnement {
    @PrimaryGeneratedColumn()
    Id!: number

    @ManyToMany(() => Event) @JoinColumn()
      IdEvenement!: Event

    @Column()
    IdUtilisateur!: string;
}
