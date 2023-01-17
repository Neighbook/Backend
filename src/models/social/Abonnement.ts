import {Entity, Column, JoinColumn, ManyToMany} from 'typeorm'
import {Event} from "./Evenement";

@Entity('Abonnements')
export class Abonnement {
    @ManyToMany(() => Event) @JoinColumn()
    IdEvenement!: Event

    @Column()
    IdUtilisateur!: string;
}
