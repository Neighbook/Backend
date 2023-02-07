import { Logger } from 'tslog';

import { environnement } from '../../config/environnement';
import { ts_logconfig } from '../../config/logger';
import { UsersDataSource } from '../../core/datastores/typeorm_datastores';
import { ServiceException } from '../../core/exeptions/base_exeption';
import { UserPreference } from '../../models/users/user_preference';

const logger = new Logger({ ...ts_logconfig, name: 'UserService' });
export const UserPreferenceRepository = UsersDataSource.manager.getRepository(UserPreference);

export class UserPreferenceService {
	static async healthCheck(): Promise<boolean> {
		try {
			await UserPreferenceRepository.find();
			return true;
		} catch (error) {
			logger.error(`Error while listing users: ${error}`);
			return false;
		}
	}

	static async initUserPreference(user_id: string): Promise<void> {
		for (const preference of environnement.user_default_preferences) {
			const userPreference: UserPreference = new UserPreference();
			userPreference.id_utilisateur = user_id;
			userPreference.cle_preference = preference.cle_preference;
			userPreference.valeur_preference = preference.valeur_preference;
			await UserPreferenceService.createUserPreference(userPreference);
		}
	}

	static async createUserPreference(userPreference: UserPreference): Promise<UserPreference | null> {
		let createdUserPreference: UserPreference | null = null;
		await UserPreferenceRepository.save(userPreference)
			.then((result) => {
				createdUserPreference = result;
			})
			.catch((error) => {
				logger.error('Error: ' + error);
				throw new ServiceException('Internal server error', 500);
			});
		return createdUserPreference;
	}

	static async getUserPreference(id: string): Promise<UserPreference | null> {
		let userPreference: UserPreference | null = null;
		await UserPreferenceRepository.findOne({
			where: {
				id: id,
			},
		})
			.then((result?) => {
				userPreference = result;
			})
			.catch((error) => {
				logger.error('Error: ' + error);
			});
		return userPreference;
	}

	static async getUserPreferenceByUserId(userId: string): Promise<UserPreference | null> {
		let userPreference: UserPreference | null = null;
		await UserPreferenceRepository.findOne({
			where: {
				id_utilisateur: userId,
			},
		})
			.then((result?) => {
				userPreference = result;
			})
			.catch((error) => {
				logger.error('Error: ' + error);
			});
		return userPreference;
	}

	static async updateUserPreference(userPreference: UserPreference): Promise<UserPreference | null> {
		let updatedUserPreference: UserPreference | null = null;
		await UserPreferenceRepository.save(userPreference)
			.then((result) => {
				updatedUserPreference = result;
			})
			.catch((error) => {
				logger.error('Error: ' + error);
			});
		return updatedUserPreference;
	}
}
