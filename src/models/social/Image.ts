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

	@Column()
	url!: string;

	@CreateDateColumn()
	dateDeCreation!: Date;

	@UpdateDateColumn()
	dateDeModification!: Date;

	@DeleteDateColumn()
	dateDeSuppression?: Date;

	@ManyToOne(() => Post)
	@JoinColumn()
	post!: Post;
}
