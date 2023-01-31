import express from 'express';

import { authMiddleware, managedResourceMiddleware } from '../../../middlewares/auth/auth_middleware';
import { UserService } from '../../../services/users_service/user_service';

export const userRoutes = express.Router();

userRoutes.get('/user/:user_id', authMiddleware, managedResourceMiddleware, async (req: express.Request, res) => {
	// #swagger.tags = ['User']
	// #swagger.description = 'Endpoint to get a user details'
	// #swagger.summary = 'Get a user'
	// #swagger.parameters['user_id'] = { description: 'User id' }
	// #swagger.responses[200] = { description: 'Success' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }
	// #swagger.responses[404] = { description: 'User not found' }
	// #swagger.responses[401] = { description: 'Unauthorized' }
	await UserService.getUser(req.params.user_id)
		.then((response) => {
			if (response === null) {
				res.status(404).json({ message: 'User not found' });
			}
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(404).json(error);
		});
});

userRoutes.get('/users', authMiddleware, async (req: express.Request, res) => {
	// #swagger.tags = ['User']
	// #swagger.description = 'Endpoint to get all users'
	// #swagger.summary = 'Get all users'
	// #swagger.auth = true
	// #swagger.security = [{ "bearerAuth": [] }]
	// #swagger.responses[200] = { description: 'Success' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }
	// #swagger.responses[401] = { description: 'Unauthorized' }
	await UserService.getUsers()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((error) => {
			res.status(404).json(error);
		});
});

userRoutes.delete('/user/:user_id', authMiddleware, managedResourceMiddleware, async (req: express.Request, res) => {
	// #swagger.tags = ['User']
	// #swagger.description = 'Endpoint to delete a user'
	// #swagger.summary = 'Delete a user'
	// #swagger.parameters['user_id'] = { description: 'User id' }
	// #swagger.responses[200] = { description: 'Success' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }
	// #swagger.responses[404] = { description: 'User not found' }
	// #swagger.responses[401] = { description: 'Unauthorized' }
	await UserService.deleteUser(req.params.user_id)
		.then(() => {
			res.status(200).json({ message: 'User deleted' });
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

export { userRoutes };
