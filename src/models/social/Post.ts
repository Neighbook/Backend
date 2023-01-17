import {Entity, PrimaryGeneratedColumn, Column, OneToOne} from 'typeorm'
import {JoinColumn} from "typeorm/browser";
import {Event} from "./Evenement";


@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    titre!: string

    @Column()
    description!: string

    @Column()
    estPartage!: boolean

    @Column()
    idUtilisateur!: string

    @OneToOne(type => Event) @JoinColumn()
    idEvenement!: number

    @Column({ type: 'timestamptz' })
    dateDeCreation!: Date

    @Column({ type: 'timestamptz' })
    dateDeModification!: Date

    @Column({ type: 'timestamptz' })
    dateDeSuppression!: Date
}
