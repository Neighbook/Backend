import express from 'express';

import { RoomGroupService } from '../../../services/messagerie/group_service';

export const messagerieRoutes = express.Router();

messagerieRoutes.get('/groups', async (req: express.Request, res: express.Response) => {
	// #swagger.tags = ['Messagerie']
	// #swagger.description = 'Endpoint to get groups of a user.'
	// #swagger.summary = 'Get groups of a user'
	if (req.body.idUser) {
		RoomGroupService.getGroups(req.body.idUser).then((comment) => res.status(200).send(comment));
	} else {
		res.status(400).json('invalid fields');
	}
});

messagerieRoutes.post('/group', async (req: express.Request, res: express.Response) => {
	// #swagger.tags = ['Messagerie']
	// #swagger.description = 'Endpoint to create group.'
	// #swagger.summary = 'Create group'
	if (req.body.groupName && req.body.idUtilisateurs) {
		RoomGroupService.createGroup(req.body.groupName, req.body.idUtilisateurs).then((comment) =>
			res.status(200).send(comment)
		);
	} else {
		res.status(400).json('invalid fields');
	}
});
