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
	@PrimaryGeneratedColumn()
	id!: number;

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
	idCommentaire!: number;

	@CreateDateColumn()
	dateDeCreation!: Date;

	@UpdateDateColumn()
	dateDeModification!: Date;

	@DeleteDateColumn()
	dateDeSuppression?: Date;
}
