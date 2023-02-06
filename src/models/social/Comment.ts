import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinTable,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';

import { Post } from './Post';

@Entity('Commentaires')
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

	@Column()
	contenu!: string;

	@Column()
	idUtilisateur!: string;

	@ManyToOne(() => Post)
	@JoinTable()
	post!: Post;

	@ManyToOne(() => Comment)
	@JoinTable()
	@JoinColumn({ name: 'idCommentaire' })
	commentaire!: Comment;

	@Column({ nullable: true })
	idCommentaire!: string;

	@CreateDateColumn()
	dateDeCreation!: Date;

	@UpdateDateColumn()
	dateDeModification!: Date;

	@DeleteDateColumn()
	dateDeSuppression?: Date;
}
