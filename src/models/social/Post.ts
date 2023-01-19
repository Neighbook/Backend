import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  JoinTable,
  OneToMany,
  CreateDateColumn, UpdateDateColumn, DeleteDateColumn
} from 'typeorm'
import {Event} from "./Evenement";
import {Comment} from "./Comment";
import {Image} from "./Image";
import {PostReaction} from "./PostReaction";


@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    titre!: string

    @Column()
    description!: string

    @Column()
    estPartage!: boolean

    @Column()
    idUtilisateur!: string

    @OneToOne(() => Event) @JoinColumn()
    evenement!: Event

    @CreateDateColumn()
    dateDeCreation!: Date

    @UpdateDateColumn()
    dateDeModification!: Date

    @DeleteDateColumn()
    dateDeSuppression?: Date

    @OneToMany(() => Comment, (comment)=>comment.post) @JoinTable()
    commentaires!: Comment[];

    @OneToMany(() => Image, (image)=>image.post) @JoinTable()
    images!: Image[]

    @OneToMany(() => PostReaction, postReaction=>postReaction.post) @JoinTable()
    reactions!: PostReaction[]

    nlike!: number
    nmdr!: number
    nOo!: number
    nsnif!: number
    ngrr!: number
    nok!: number
}
