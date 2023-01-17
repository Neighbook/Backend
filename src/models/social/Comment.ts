import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinTable} from 'typeorm'
import { Post } from './Post'

@Entity('Commentaire')
export class Comment {
    @PrimaryGeneratedColumn()
    Id!: number

    @Column()
    Contenu!: string

    @Column()
    Email!: string

    @Column()
    IdUtilisateur!: string;

    @OneToOne(() => Post) @JoinTable()
    IdPoste!: Post;

    @OneToOne(() => Comment) @JoinTable()
    IdCommentaire!: Comment;

    @Column({ type: 'timestamptz' })
    DateDeCreation!: Date

    @Column({ type: 'timestamptz' })
    DateDeModification!: Date

    @Column({ type: 'timestamptz' })
    DateDeSuppression!: Date
}
