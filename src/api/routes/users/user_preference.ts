import { Request, Response, Router } from 'express';

import { UserPreferenceController } from '../../controllers/user_preference_controller';

const userPreferenceRoutes = Router();

userPreferenceRoutes.get('/user_preference/', async (req: Request, res: Response) => {
	// #swagger.tags = ['User Preferences']
	// #swagger.summary = 'Get user preference'
	// #swagger.description = 'Endpoint to get user preference'
	UserPreferenceController.getUserPreference(req, res);
});

userPreferenceRoutes.put('/user_preference/', async (req: Request, res: Response) => {
	// #swagger.tags = ['User Preferences']
	// #swagger.summary = 'Update user preference'
	// #swagger.description = 'Endpoint to update user preference'
	UserPreferenceController.updateUserPreference(req, res);
});

userPreferenceRoutes.get('/user_preferences/', (req: Request, res: Response) => {
	// #swagger.tags = ['User Preferences']
	// #swagger.summary = 'Get user preference by user id'
	// #swagger.description = 'Endpoint to get user preference by user id'
	UserPreferenceController.getUserPreferenceByUserId(req, res);
});

export { userPreferenceRoutes };
