import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm'
import {Post} from "./Post";
import {Reaction} from "./Reaction";

@Entity('postReactions')
export class PostReaction {
    @ManyToOne(()=>Reaction)@JoinColumn()
    idReaction!: Reaction

    @ManyToOne(()=>Post)
    idPost!: Post

    @Column()
    idUtilisateur!: string
}
