import {Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne} from 'typeorm'
import {Post} from "./Post";

@Entity('postReactions')
export class PostReaction {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({nullable: false})
    reactionId!: number

    @ManyToOne(()=>Post)
    post!: Post

    @Column()
    idUtilisateur!: string
}
