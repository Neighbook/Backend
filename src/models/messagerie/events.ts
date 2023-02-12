export type MessageEventData = {
	roomId: string;
	message: string;
};

export type ConnectionEventData = {
	senderId: string;
	receiverId: string;
};

export type RoomCreatedEventData = {
	senderId: string;
	receiverId: string;
	roomId: string;
};

export type ServerToClientEvents = {
	hello: () => void;
	roomJoined: (event: RoomCreatedEventData) => void;
	messageReceived: (event: MessageEventData) => void;
};

export type ClientToServerEvents = {
	connectToSomeone: (event: ConnectionEventData) => void;
	messageSended: (event: MessageEventData) => void;
};

export type InterServerEvents = {
	ping: () => void;
};
