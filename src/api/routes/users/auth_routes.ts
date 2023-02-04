import { Request, Response, Router } from 'express';

import { authMiddleware } from '../../../middlewares/auth/auth_middleware';
import { User } from '../../../models/users/user';
import { AuthService } from '../../../services/users_service/auth_service';

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
	await AuthService.login(req.body.email, req.body.password)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
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
	const user = new User();
	user.prenom = req.body.prenom;
	user.nom = req.body.nom;
	user.sexe = req.body.sexe;
	user.nom_utilisateur = req.body.nom_utilisateur;
	user.date_naissance = req.body.date_naissance;
	user.email = req.body.email;
	user.password = req.body.password;
	user.telephone = req.body.telephone;
	user.code_pays = req.body.code_pays;
	user.photo = req.body.photo;
	await AuthService.resgiter(user)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

authRoutes.post('/auth/refresh_token', authMiddleware, async (req: Request, res: Response) => {
	// #swagger.tags = ['Auth']
	// #swagger.description = 'Endpoint to refresh token'
	// #swagger.summary = 'Login'
	// #swagger.responses[200] = { description: 'User logged in' }
	// #swagger.responses[401] = { description: 'Invalid user credentials' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }
	const token = req.headers.authorization?.split(' ')[1];
	if (token == null) {
		res.status(500).json({ message: 'not auth' });
		return;
	}
	await AuthService.refreshToken(token)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

export { authRoutes };
