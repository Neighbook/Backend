import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type MessageType = {
	idMessage: string;
	senderId: string;
	receiverOrRoomId: string;
	isRoomMessage: boolean;
	content: string;
	date: Date;
};

export type MessageInput = Omit<MessageType, 'idMessage'>;

@Entity('Messages')
export class Message implements MessageType {
	@PrimaryGeneratedColumn()
	idMessage!: string;

	@Column()
	senderId!: string;

	@Column()
	receiverOrRoomId!: string;

	@Column()
	isRoomMessage!: boolean;

	@Column()
	content!: string;

	@Column()
	date!: Date;
}
