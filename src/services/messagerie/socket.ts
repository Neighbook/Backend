import { Socket } from 'socket.io';

import { Message } from '../../models/messagerie/Message';
import {
	ClientToServerEvents,
	ConnectionEventData,
	GroupConnectionEventData,
	InterServerEvents,
	MessageEventData,
	ServerToClientEvents,
} from '../../models/messagerie/events';
import { joinRoom } from './events';
import { MessagerieService } from './messagerie_service';

export const initializeSocketEvents = (
	socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, any>
): void => {
	socket.on('connectToSomeone', (event: ConnectionEventData) => {
		if (!event.senderId || !event.receiverId) return;

		const roomId = joinRoom(event, socket);

		socket.emit('roomJoined', {
			roomId,
		});
	});

	socket.on('messageSended', (event: MessageEventData) => {
		if (!event.roomId || !event.content) return;

		socket.to(event.roomId).emit('messageReceived', {
			roomId: event.roomId,
			senderId: event.senderId,
			receiverId: event.receiverId,
			isRoomMessage: event.isRoomMessage,
			content: event.content,
			date: event.date,
		});

		const message = new Message();
		message.content = event.content;
		message.date = event.date;
		message.isRoomMessage = event.isRoomMessage;
		message.receiverId = event.receiverId;
		message.roomId = event.roomId;
		message.senderId = event.senderId;

		MessagerieService.createMessage(message);
	});

	socket.on('connectToGroup', (event: GroupConnectionEventData) => {
		if (!event.roomId) return;

		socket.join(event.roomId);

		socket.emit('roomJoined', {
			roomId: event.roomId,
		});
	});
};
