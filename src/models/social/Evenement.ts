import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from 'typeorm';

@Entity('events')
export class Event {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	titre!: string;

	@Column()
	dateEvenement!: Date;

	@Column('decimal', { nullable: true })
	longitude!: number;

	@Column('decimal', { nullable: true })
	latitude!: number;

	adresse!: string;

	@CreateDateColumn()
	dateDeCreation!: Date;

	@UpdateDateColumn()
	dateDeModification!: Date;

	@DeleteDateColumn()
	dateDeSuppression?: Date;
}
