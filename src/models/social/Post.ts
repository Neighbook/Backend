import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, JoinTable, OneToMany} from 'typeorm'
import {Event} from "./Evenement";
import {Comment} from "./Comment";
import {Image} from "./Image";


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
    idEvenement!: Event

    @Column({ type: 'timestamptz' })
    dateDeCreation!: Date

    @Column({ type: 'timestamptz' })
    dateDeModification!: Date

    @Column({ type: 'timestamptz' })
    dateDeSuppression!: Date

    @OneToMany(() => Comment, (comment)=>comment.IdPoste) @JoinTable()
    commentaires!: Comment[];

    @OneToMany(() => Image, (image)=>image.idPost) @JoinTable()
    images!: Image[]

}
