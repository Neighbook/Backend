import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

import { Event } from './Evenement';

@Entity('Abonnements')
export class Abonnement {
	@PrimaryGeneratedColumn()
	id!: number;

	@OneToOne(() => Event)
	@JoinColumn()
	evenement!: Event;

	@Column()
	idUtilisateur!: string;
}
