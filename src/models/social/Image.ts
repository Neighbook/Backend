import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	ManyToOne,
} from 'typeorm';

import { Post } from './Post';

@Entity('images')
export class Image {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ nullable: false })
	mimetype!: string;

	@Column()
	url!: string;

	@Column()
	idUtilisateur!: string;

	@CreateDateColumn()
	dateDeCreation!: Date;

	@UpdateDateColumn()
	dateDeModification!: Date;

	@DeleteDateColumn()
	dateDeSuppression?: Date;

	@ManyToOne(() => Post)
	@JoinColumn({ name: 'idPost' })
	post!: Post;

	@Column({ nullable: false })
	idPost!: string;
}
