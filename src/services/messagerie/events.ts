import { Socket } from 'socket.io';
import { v5 as uuidv5 } from 'uuid';

import { ConnectionEventData } from '../../models/messagerie/events';

export const joinRoom = (event: ConnectionEventData, socket: Socket): string => {
	const id =
		event.senderId > event.receiverId ? event.receiverId + event.senderId : event.senderId + event.receiverId;
	const idRoom = uuidv5(id, 'e4cf1701-36da-492f-bf79-4739b5bae169');

	socket.join(idRoom);

	return idRoom;
};
