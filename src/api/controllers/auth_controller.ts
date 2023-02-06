import { Request, Response } from 'express';

import { User } from '../../models/users/user';
import { AuthService } from '../../services/users_service/auth_service';

class AuthController {
	static async login(req: Request, res: Response): Promise<void> {
		await AuthService.login(req.body.email, req.body.password)
			.then((response) => {
				res.status(200).json(response);
			})
			.catch((error) => {
				res.status(500).json(error);
			});
	}

	static async register(req: Request, res: Response): Promise<void> {
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
		await AuthService.register(user)
			.then((response) => {
				res.status(200).json(response);
			})
			.catch((error) => {
				res.status(500).json(error);
			});
	}

	static async logout(req: Request, res: Response): Promise<void> {
		await AuthService.logout(req.body.user._user_id)
			.then((response) => {
				res.status(200).json(response);
			})
			.catch((error) => {
				res.status(500).json(error);
			});
	}

	static async forgotPassword(req: Request, res: Response): Promise<void> {
		await AuthService.forgotPassword(req.body.email)
			.then((response) => {
				res.status(200).json(response);
			})
			.catch((error) => {
				res.status(500).json(error);
			});
	}

	static async resetPassword(req: Request, res: Response): Promise<void> {
		await AuthService.resetPassword(req.body.email, req.body.password, req.body.token)
			.then((response) => {
				res.status(200).json(response);
			})
			.catch((error) => {
				res.status(500).json(error);
			});
	}

	static async changePassword(req: Request, res: Response): Promise<void> {
		await AuthService.changePassword(req.body.user._user_id, req.body.old_password, req.body.new_password)
			.then((response) => {
				res.status(200).json(response);
			})
			.catch((error) => {
				res.status(500).json(error);
			});
	}

	static async changeEmail(req: Request, res: Response): Promise<void> {
		await AuthService.changeEmail(req.body.user._user_id, req.body.email)
			.then((response) => {
				res.status(200).json(response);
			})
			.catch((error) => {
				res.status(500).json(error);
			});
	}

	static async changeUsername(req: Request, res: Response): Promise<void> {
		await AuthService.changeUsername(req.body.user._user_id, req.body.username)
			.then((response) => {
				res.status(200).json(response);
			})
			.catch((error) => {
				res.status(500).json(error);
			});
	}

	static async changePhone(req: Request, res: Response): Promise<void> {
		await AuthService.changePhone(req.body.user._user_id, req.body.phone)
			.then((response) => {
				res.status(200).json(response);
			})
			.catch((error) => {
				res.status(500).json(error);
			});
	}
}

export { AuthController };
