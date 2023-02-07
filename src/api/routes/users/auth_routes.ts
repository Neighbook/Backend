import { Request, Response, Router } from 'express';

import { authMiddleware } from '../../../middlewares/auth/auth_middleware';
import { AuthController } from '../../controllers/auth_controller';

const authRoutes = Router();

authRoutes.post('/auth/login', async (req: Request, res: Response) => {
	// #swagger.tags = ['Auth']
	// #swagger.description = 'Endpoint to login'
	// #swagger.summary = 'Login'
	/*#swagger.parameters['obj'] = {
		description: 'User object',
		in: 'body',
		required: true,
		type: 'object',
		schema: { email: 'string', password: 'string' }
	}; */
	// #swagger.responses[200] = { description: 'User logged in' }
	// #swagger.responses[401] = { description: 'Invalid user credentials' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }
	await AuthController.login(req, res);
});

authRoutes.post('/auth/register', async (req: Request, res: Response) => {
	// #swagger.tags = ['Auth']
	// #swagger.description = 'Endpoint to register'
	// #swagger.summary = 'Register new'
	/*#swagger.parameters['obj'] = {
		description: 'User object',
		in: 'body',
		required: true,
		type: 'object',
		schema: {
			prenom: 'string',
			nom: 'string',
			sexe: 'string',
			nom_utilisateur: 'string',
			date_naissance: 'string',
			email: 'string',
			password: 'string',
			telephone: 'string',
			code_pays: 'string',
			photo: 'string',
		}
	}; */
	// #swagger.responses[200] = { description: 'User Created' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }
	// #swagger.responses[500] = { description: 'Invalid credentials' }
	await AuthController.register(req, res);
});

authRoutes.post('/auth/refresh_token', authMiddleware, async (req: Request, res: Response) => {
	// #swagger.tags = ['Auth']
	// #swagger.description = 'Endpoint to refresh token'
	// #swagger.summary = 'Login'
	// #swagger.responses[200] = { description: 'User logged in' }
	// #swagger.responses[401] = { description: 'Invalid user credentials' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }
	await AuthController.refreshTokens(req, res);
});

export { authRoutes };
