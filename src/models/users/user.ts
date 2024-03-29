import * as argon from 'argon2';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BeforeUpdate,
	BeforeInsert,
	DeleteDateColumn,
	UpdateDateColumn,
	CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	prenom!: string;

	@Column()
	nom!: string;

	@Column()
	sexe!: string;

	@Column({ unique: true })
	nom_utilisateur!: string;

	@Column({ type: 'date' })
	date_naissance!: string;

	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@Column()
	telephone!: string;

	@Column()
	code_pays!: string;

	@Column({ nullable: true })
	photo!: string;

	@CreateDateColumn()
	date_creation!: Date;

	@UpdateDateColumn()
	date_modification!: Date;

	@DeleteDateColumn()
	date_suppression!: Date;

	@Column({ default: true })
	actif!: boolean;

	@BeforeUpdate()
	async hashPassword(): Promise<void> {
		this.password = await argon.hash(this.password);
	}

	@BeforeInsert()
	async hashPasswordBeforeInsert(): Promise<void> {
		this.password = await argon.hash(this.password);
	}
}
