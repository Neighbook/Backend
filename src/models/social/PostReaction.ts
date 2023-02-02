import {Entity, Column, ManyToOne, JoinColumn, PrimaryColumn} from 'typeorm';
import {Post} from './Post';

@Entity('postReactions')
export class PostReaction {
    @Column({nullable: false})
    reactionId!: number;

    @ManyToOne(()=>Post)
    @JoinColumn({ name: 'idPost' })
    post!: Post;

    @PrimaryColumn({nullable: false})
    idPost!: number;

    @PrimaryColumn()
    idUtilisateur!: string;
}
