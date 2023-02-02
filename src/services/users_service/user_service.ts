import { Logger } from 'tslog';
import { In } from 'typeorm';

import { UsersDataSource } from '../../core/datastores/typeorm_datastores';
import { ServiceException } from '../../core/exeptions/base_exeption';
import { User } from '../../models/users/user';

const logger = new Logger({ name: 'UserService' });
export const userRepository = UsersDataSource.manager.getRepository(User);

export class UserService {
	static async healthCheck(): Promise<boolean> {
		try {
			await userRepository.find();
			return true;
		} catch (error) {
			logger.error(`Error while listing users: ${error}`);
			return false;
		}
	}

	static async createUser(user: User): Promise<User | null> {
		let createdUser: User | null = null;
		await userRepository
			.save(user)
			.then((result) => {
				createdUser = result;
			})
			.catch((error) => {
				logger.error('Error: ' + error);
				throw new ServiceException('Internal server error', 500);
			});
		return createdUser;
	}

	static async getUser(id: string): Promise<User | null> {
		let user: User | null = null;
		await userRepository
			.findOne({
				where: {
					id: id,
				},
			})
			.then((result?) => {
				user = result;
			})
			.catch((error) => {
				logger.error('Error: ' + error);
			});
		return user;
	}

	static async getUsersByIds(ids: string[]): Promise<User[]> {
		let users: User[] = [];
		await userRepository
			.findBy({ id: In(ids) })
			.then((result) => {
				users = result;
			})
			.catch((error) => {
				logger.error('Error: ' + error);
				throw new ServiceException('Internal server error', 500);
			});
		return users;
	}

	static async getUsers(): Promise<User[]> {
		let users: User[] = [];
		await userRepository
			.find()
			.then((result) => {
				users = result;
			})
			.catch((error) => {
				logger.error('Error: ' + error);
				throw new ServiceException('Internal server error', 500);
			});
		return users;
	}

	static async updateUser(
		user_id: string,
		nom?: string,
		prenom?: string,
		sexe?: string,
		date_naissance?: string,
		telephone?: string,
		email?: string,
		photo?: string,
		code_pays?: string
	): Promise<void> {
		await userRepository
			.findOne({
				where: {
					id: user_id,
				},
			})
			.then((user?) => {
				if (user != null) {
					userRepository.update(user_id, {
						nom: nom ? nom : user.nom,
						prenom: prenom ? prenom : user.prenom,
						sexe: sexe ? sexe : user.sexe,
						date_naissance: date_naissance ? date_naissance : user.date_naissance,
						telephone: telephone ? telephone : user.telephone,
						email: email ? email : user.email,
						photo: photo ? photo : user.photo,
						code_pays: code_pays ? code_pays : user.code_pays,
					});
				}
			});
	}

	static async deleteUser(id: string): Promise<void> {
		const userRepository = UsersDataSource.manager.getRepository(User);
		await userRepository
			.findOne({
				where: {
					id: id,
				},
			})
			.then((user?) => {
				logger.info('User: ' + user);
				if (user) {
					userRepository.remove(user);
				}
			})
			.catch((error) => {
				logger.error('Error: ' + error);
				throw new ServiceException('Internal server error', 500);
			});
	}

	static async addUserProfilePicture(id: string, profilePicture: string): Promise<User | null> {
		let updatedUser: User | null = null;
		await userRepository
			.findOne({
				where: {
					id: id,
				},
			})
			.then((user) => {
				if (user == null) {
					return null;
				}
				user.photo = profilePicture;
				userRepository.save(user);
				updatedUser = user;
			})
			.catch((error) => {
				logger.error('Error: ' + error);
			});
		return updatedUser;
	}
}
