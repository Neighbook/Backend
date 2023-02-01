import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import {Post} from './Post';

@Entity('postReactions')
export class PostReaction {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    reactionId!: number;

    @ManyToOne(()=>Post)
    @JoinColumn({ name: 'idPost' })
    post!: Post;

    @Column({nullable: false})
    idPost!: number;

    @Column()
    idUtilisateur!: string;
}
