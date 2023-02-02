import { Request, Response } from 'express';

import { UserPreferenceService } from '../../services/users_service/user_preferences_service';

export class UserPreferenceController {
	static async getUserPreference(req: Request, res: Response): Promise<void> {
		const user_id = req.body.user._user_id;
		await UserPreferenceService.getUserPreference(user_id)
			.then((user_preference) => {
				res.status(200).json(user_preference);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}

	static async updateUserPreference(req: Request, res: Response): Promise<void> {
		const user_id = req.body.user._user_id;
		const user_preference = req.body;
		await UserPreferenceService.updateUserPreference(user_preference)
			.then((user_preference) => {
				res.status(200).json(user_preference);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}

	static async getUserPreferenceByUserId(req: Request, res: Response): Promise<void> {
		const user_id = req.params.user_id;
		await UserPreferenceService.getUserPreferenceByUserId(user_id)
			.then((user_preference) => {
				res.status(200).json(user_preference);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}
}
