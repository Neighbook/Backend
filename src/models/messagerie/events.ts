export type MessageEventData = {
	roomId: string;
	message: string;
};

export type ConnectionEventData = {
	senderId: string;
	receiverId: string;
};
