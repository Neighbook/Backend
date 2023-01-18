import {Entity, Column, JoinColumn, PrimaryGeneratedColumn, OneToOne} from 'typeorm'
import {Post} from "./Post";
import {Reaction} from "./Reaction";

@Entity('postReactions')
export class PostReaction {
    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(()=>Reaction)@JoinColumn()
    reaction!: Reaction

    @OneToOne(()=>Post)
    post!: Post

    @Column()
    idUtilisateur!: string
}
