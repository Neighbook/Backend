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

    @CreateDateColumn()
    dateDeCreation!: Date

    @UpdateDateColumn()
    dateDeModification!: Date

    @DeleteDateColumn()
    dateDeSuppression?: Date

    @OneToOne(()=>Post)@JoinColumn()
    post!: Post
}
