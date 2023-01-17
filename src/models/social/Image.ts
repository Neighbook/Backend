import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm'
import {Post} from "./Post";

@Entity('images')
export class Image {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    ulr!: string

    @Column()
    lastName!: string

    @Column({ type: 'timestamptz' })
    dateDeCreation!: Date

    @Column({ type: 'timestamptz' })
    dateDeModification!: Date

    @Column({ type: 'timestamptz' })
    dateDeSuppression!: Date

    @ManyToOne(()=>Post)@JoinColumn()
    idPost!: Post
}
