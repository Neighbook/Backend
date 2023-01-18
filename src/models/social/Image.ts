import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'
import {Post} from "./Post";

@Entity('images')
export class Image {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    url!: string

    @CreateDateColumn({ type: 'timestamptz' })
    dateDeCreation!: Date

    @UpdateDateColumn({ type: 'timestamptz' })
    dateDeModification!: Date

    @DeleteDateColumn({ type: 'timestamptz' })
    dateDeSuppression?: Date

    @OneToOne(()=>Post)@JoinColumn()
    idPost!: Post
}
