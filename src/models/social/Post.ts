import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm'
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

    @OneToOne(() => Event) @JoinColumn()
    idEvenement!: Event

    @Column({ type: 'timestamptz' })
    dateDeCreation!: Date

    @Column({ type: 'timestamptz' })
    dateDeModification!: Date

    @Column({ type: 'timestamptz' })
    dateDeSuppression!: Date
}
