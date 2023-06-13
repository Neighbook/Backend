export type MessageEventData = {
	roomId: string;
	senderId: string;
	receiverId: string;
	isRoomMessage: boolean;
	content: string;
	date: Date;
};

export type ConnectionEventData = {
	senderId: string;
	receiverId: string;
};

export type GroupConnectionEventData = {
	roomId: string;
};

export type RoomCreatedEventData = {
	roomId: string;
};

export type ServerToClientEvents = {
	hello: () => void;
	roomJoined: (event: RoomCreatedEventData) => void;
	messageReceived: (event: MessageEventData) => void;
};

export type ClientToServerEvents = {
	connectToSomeone: (event: ConnectionEventData) => void;
	connectToGroup: (event: GroupConnectionEventData) => void;
	messageSended: (event: MessageEventData) => void;
};

export type InterServerEvents = {
	ping: () => void;
};
