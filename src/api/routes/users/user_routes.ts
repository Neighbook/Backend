import { Request, Response, Router } from 'express';

import { managedResourceMiddleware } from '../../../middlewares/auth/auth_middleware';
import { UserService } from '../../../services/users_service/user_service';

const userRoutes = Router();

userRoutes.get('/user/:user_id', managedResourceMiddleware, async (req: Request, res: Response) => {
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

userRoutes.get('/users', async (req: Request, res: Response) => {
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

userRoutes.delete('/user', managedResourceMiddleware, async (req: Request, res: Response) => {
	// #swagger.tags = ['User']
	// #swagger.description = 'Endpoint to delete a user'
	// #swagger.summary = 'Delete a user'
	// #swagger.parameters['user_id'] = { description: 'User id' }
	/* #swagger.parameters['user_id'] = {'in': 'body', 'required': true, 'schema': {'user_id': 'string'}} */
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

userRoutes.put('/user', managedResourceMiddleware, async (req: Request, res: Response) => {
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
	await UserService.updateUser(
		req.body.user._user_id,
		req.body.nom ? req.body.nom : '',
		req.body.prenom ? req.body.prenom : '',
		req.body.sexe ? req.body.sexe : '',
		req.body.date_naissance ? req.body.date_naissance : '',
		req.body.telephone ? req.body.telephone : '',
		req.body.email ? req.body.email : '',
		req.body.photo ? req.body.photo : '',
		req.body.code_pays ? req.body.code_pays : ''
	)
		.then(() => {
			res.status(200).json({ message: 'User updated' });
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

export { userRoutes };
