import { Request, Response, Router } from 'express';

import { managedResourceMiddleware, authMiddleware } from '../../../middlewares/auth/auth_middleware';
import { UserController } from '../../controllers/user_controller';

const userRoutes = Router();

userRoutes.get('/user/:user_id', authMiddleware, managedResourceMiddleware, async (req: Request, res: Response) => {
	// #swagger.tags = ['User']
	// #swagger.description = 'Endpoint to get a user details'
	// #swagger.summary = 'Get a user'
	// #swagger.parameters['user_id'] = { description: 'User id' }
	// #swagger.responses[200] = { description: 'Success' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }
	// #swagger.responses[404] = { description: 'User not found' }
	// #swagger.responses[401] = { description: 'Unauthorized' }
	await UserController.getUser(req, res);
});

userRoutes.get('/users', authMiddleware, async (req: Request, res: Response) => {
	// #swagger.tags = ['User']
	// #swagger.description = 'Endpoint to get all users'
	// #swagger.summary = 'Get all users'
	// #swagger.responses[200] = { description: 'Success' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }
	// #swagger.responses[401] = { description: 'Unauthorized' }
	await UserController.getUsers(req, res);
});

userRoutes.delete('/user', authMiddleware, managedResourceMiddleware, async (req: Request, res: Response) => {
	// #swagger.tags = ['User']
	// #swagger.description = 'Endpoint to delete a user'
	// #swagger.summary = 'Delete a user'
	// #swagger.parameters['user_id'] = { description: 'User id' }
	/* #swagger.parameters['user_id'] = {'in': 'body', 'required': true, 'schema': {'user_id': 'string'}} */
	// #swagger.responses[200] = { description: 'Success' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }
	// #swagger.responses[404] = { description: 'User not found' }
	// #swagger.responses[401] = { description: 'Unauthorized' }
	await UserController.deleteUser(req, res);
});

userRoutes.put('/user', authMiddleware, managedResourceMiddleware, async (req: Request, res: Response) => {
	// #swagger.tags = ['Profile']
	// #swagger.description = 'Endpoint to update a user'
	// #swagger.summary = 'Update a user'
	/* #swagger.parameters['user_id'] = {'in': 'body', 'required': true,
    'schema': {'user_id': 'string',
    'nom': 'string', 'prenom': 'string',
    'sexe': 'string', 'date_naissance': 'string',
    'telephone': 'string', 'email': 'string',
    'photo': 'string', 'code_pays': 'string'}}
    */
	// #swagger.responses[200] = { description: 'Success' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }
	// #swagger.responses[404] = { description: 'User not found' }
	// #swagger.responses[401] = { description: 'Unauthorized' }
	await UserController.updateUser(req, res);
});

export { userRoutes };
