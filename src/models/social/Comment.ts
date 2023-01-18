import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn, DeleteDateColumn
} from 'typeorm'
import { Post } from './Post'

@Entity('Commentaires')
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    contenu!: string

    @Column()
    idUtilisateur!: string;

    @OneToOne(() => Post) @JoinTable()
    post!: Post;

    @OneToOne(() => Comment) @JoinTable()
    commentaire!: Comment;

    @CreateDateColumn({ type: 'timestamptz' })
    dateDeCreation!: Date

    @UpdateDateColumn({ type: 'timestamptz' })
    dateDeModification!: Date

    @DeleteDateColumn({ type: 'timestamptz' })
    dateDeSuppression?: Date
}
