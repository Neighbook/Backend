import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('events')
export class Event {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    titre!: string

    @Column({ type: 'timestamptz' })
    dateEvenement!: Date

    @Column()
    addresse!: string

    @Column()
    dateDeCreation!: Date

    @Column({ type: 'timestamptz' })
    dateDeModification!: Date

    @Column({ type: 'timestamptz' })
    dateDeSuppression!: Date

}
