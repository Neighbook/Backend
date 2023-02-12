import { Socket } from 'socket.io';

import {
	ClientToServerEvents,
	ConnectionEventData,
	InterServerEvents,
	MessageEventData,
	ServerToClientEvents,
} from '../../models/messagerie/events';
import { joinRoom } from './events';

export const initializeSocketEvents = (
	socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, any>
): void => {
	socket.on('connectToSomeone', (event: ConnectionEventData) => {
		if (!event.senderId || !event.receiverId) return;

		const roomId = joinRoom(event, socket);

		socket.emit('roomJoined', {
			senderId: event.senderId,
			receiverId: event.receiverId,
			roomId,
		});
	});

	socket.on('messageSended', (event: MessageEventData) => {
		if (!event.roomId || !event.message) return;

		socket.to(event.roomId).emit('messageReceived', {
			roomId: event.roomId,
			message: event.message,
		});
	});
};
