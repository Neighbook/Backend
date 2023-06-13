import express from 'express';

import { GroupRoomService } from '../../../services/messagerie/group_service';
import { MessagerieService } from '../../../services/messagerie/messagerie_service';

export const messagerieRoutes = express.Router();

messagerieRoutes.get('/groups', async (req: express.Request, res: express.Response) => {
	// #swagger.tags = ['Messagerie']
	// #swagger.description = 'Endpoint to get groups of a user.'
	// #swagger.summary = 'Get groups of a user'
	// #swagger.parameters['idUser'] = { description: 'id user', type: "string" }
	if (req.query.idUser) {
		GroupRoomService.getGroups(req.query.idUser.toString()).then((group) => res.status(200).send(group));
	} else {
		res.status(400).json('invalid fields');
	}
});

messagerieRoutes.get('/messages', async (req: express.Request, res: express.Response) => {
	// #swagger.tags = ['Messagerie']
	// #swagger.description = 'Endpoint to get messages of a room.'
	// #swagger.summary = 'Get messages of a room'
	// #swagger.parameters['idUser'] = { description: 'id user', type: "string" }
	// #swagger.parameters['receiverOrRoomId'] = { description: 'receiverOrRoom id', type: "string" }
	if (req.query.idUser && req.query.receiverOrRoomId) {
		MessagerieService.getRoomMessages(
			req.query.idUser.toString(),
			req.query.receiverOrRoomId.toString()
		).then((messages) => res.status(200).send(messages));
	} else {
		res.status(400).json('invalid fields');
	}
});

messagerieRoutes.post('/group', async (req: express.Request, res: express.Response) => {
	// #swagger.tags = ['Messagerie']
	// #swagger.description = 'Endpoint to create group.'
	// #swagger.summary = 'Create group'
	// #swagger.parameters['groupName'] = { description: 'group name', type: "string"  }
	// #swagger.parameters['idUtilisateurs'] = { description: 'ids utilisateurs', type: "string" }
	// #swagger.responses[200] = { description: 'Success' }
	// #swagger.responses[400] = { description: 'fields group name or idUtilisateurs missing' }
	if (req.body.groupName && req.body.idUtilisateurs) {
		GroupRoomService.createGroup(req.body.groupName, req.body.idUtilisateurs).then((group) =>
			res.status(200).send(group)
		);
	} else {
		res.status(400).json('fields group name or idUtilisateurs missing');
	}
});
