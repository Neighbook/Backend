import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity('Reactions')
export class Reaction {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    label!: string
}
