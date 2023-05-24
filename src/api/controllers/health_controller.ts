import { Request, Response } from 'express';

import { AuthService } from '../../services/users_service/auth_service';
import { StorageService } from '../../services/users_service/storage_service';
import { UserService } from '../../services/users_service/user_service';

export class HealthCheckController {
	static async healthCheck(req: Request, res: Response): Promise<void> {
		res.status(200).json({
			status: 'ok',
			services: {
				storage: (await StorageService.healthCheck()) ? 'up' : 'down',
				user: (await UserService.healthCheck()) ? 'up' : 'down',
				auth: (await AuthService.healthCheck()) ? 'up' : 'down',
			},
		});
	}
}
