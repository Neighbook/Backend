import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn, UpdateDateColumn, DeleteDateColumn
} from 'typeorm'

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

    @CreateDateColumn()
    dateDeCreation!: Date

    @UpdateDateColumn()
    dateDeModification!: Date

    @DeleteDateColumn()
    dateDeSuppression?: Date


}
