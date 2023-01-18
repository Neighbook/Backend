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

@Entity('Commentaire')
export class Comment {
    @PrimaryGeneratedColumn()
    Id!: number

    @Column()
    Contenu!: string

    @Column()
    IdUtilisateur!: string;

    @OneToOne(() => Post) @JoinTable()
    IdPoste!: Post;

    @OneToOne(() => Comment) @JoinTable()
    IdCommentaire!: Comment;

    @CreateDateColumn({ type: 'timestamptz' })
    dateDeCreation!: Date

    @UpdateDateColumn({ type: 'timestamptz' })
    dateDeModification!: Date

    @DeleteDateColumn({ type: 'timestamptz' })
    dateDeSuppression?: Date
}
