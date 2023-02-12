import { Request, Response } from 'express';

import { UserService } from '../../services/users_service/user_service';

export class UserController {
	static async getUser(req: Request, res: Response): Promise<void> {
		await UserService.getDUser(req.params.user_id)
			.then((response) => {
				if (response === null) {
					res.status(404).json({ message: 'User not found' });
				}
				res.status(200).json(response);
			})
			.catch((error) => {
				res.status(404).json(error);
			});
	}

	static async getUsers(req: Request, res: Response): Promise<void> {
		await UserService.getDUsers()
			.then((users) => {
				res.status(200).json(users);
			})
			.catch((error) => {
				res.status(404).json(error);
			});
	}

	static async deleteUser(req: Request, res: Response): Promise<void> {
		await UserService.deleteUser(req.params.user_id)
			.then(() => {
				res.status(200).json({ message: 'User deleted' });
			})
			.catch((error) => {
				res.status(404).json(error);
			});
	}

	static async updateUser(req: Request, res: Response): Promise<void> {
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
	}
}
