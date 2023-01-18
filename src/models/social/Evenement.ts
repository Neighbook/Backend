import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterUpdate,
  AfterInsert,
  AfterSoftRemove,
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

    @UpdateDateColumn({ type: 'timestamptz' })
    dateDeModification!: Date

    @DeleteDateColumn({ type: 'timestamptz' })
    dateDeSuppression?: Date


}
