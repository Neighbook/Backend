import {Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn} from 'typeorm'
import {Post} from "./Post";
import {Reaction} from "./Reaction";

@Entity('postReactions')
export class PostReaction {
    @PrimaryGeneratedColumn()
    Id!: number

    @ManyToOne(()=>Reaction)@JoinColumn()
      idReaction!: Reaction

    @ManyToOne(()=>Post)
    idPost!: Post

    @Column()
    idUtilisateur!: string
}
