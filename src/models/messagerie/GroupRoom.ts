import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('GroupRooms')
export class GroupRoom {
	@PrimaryGeneratedColumn()
	id!: string;

	@PrimaryColumn()
	name!: string;

	@Column('simple-array')
	idUtilisateurs!: string[];
}
