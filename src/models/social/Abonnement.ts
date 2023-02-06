import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { Event } from './Evenement';

@Entity('Abonnements')
export class Abonnement {
	@OneToOne(() => Event)
	@JoinColumn({ name: 'idEvenement' })
	evenement!: Event;

	@PrimaryColumn()
	idUtilisateur!: string;

	@PrimaryColumn({ nullable: false })
	idEvenement!: string;
}
