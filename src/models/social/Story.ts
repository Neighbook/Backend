import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn,
	JoinTable,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	ManyToOne,
} from 'typeorm';

import { Image } from './Image';

@Entity('stories')
export class Story {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	idUtilisateur!: string;

    @Column()
	instaStoryObject!: string;

	@CreateDateColumn()
	dateDeCreation!: Date;

    @UpdateDateColumn()
	dateDeModification!: Date;

	@DeleteDateColumn()
	dateDeSuppression?: Date;
}
