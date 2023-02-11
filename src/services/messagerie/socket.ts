import { Socket } from 'socket.io';

import { ConnectionEventData, MessageEventData } from '../../models/messagerie/events';
import { joinRoom } from './events';

export const initializeSocketEvents = (socket: Socket): void => {
	socket.on('connectToOther', (event: ConnectionEventData) => {
		if (!event.senderId || !event.receiverId) return;

		const idRoom = joinRoom(event, socket);
		socket.send('roomJoined', {
			senderId: event.senderId,
			receiverId: event.receiverId,
			idRoom,
		});
	});

	socket.on('message', (event: MessageEventData) => {
		if (!event.roomId || !event.message) return;

		socket.to(event.roomId).emit('message', event.message);
	});
};
