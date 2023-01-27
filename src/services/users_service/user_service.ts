import { Logger } from 'tslog';

import { UsersDataSource } from '../../core/datastores/typeorm_datastores';
import { User } from '../../models/users/user';

const logger = new Logger({ name: 'UserService' });
export const userRepository = UsersDataSource.manager.getRepository(User);

export class UserService {
	static async createUser(user: User): Promise<User | null> {
		let createdUser: User | null = null;
		await userRepository
			.save(user)
			.then((result) => {
				createdUser = result;
			})
			.catch((error) => {
				logger.error('Error: ' + error);
			});
		return createdUser;
	}

	static async getUser(id: number): Promise<User | null> {
		const userRepository = UsersDataSource.manager.getRepository(User);
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

	static async getUsers(): Promise<User[]> {
		const userRepository = UsersDataSource.manager.getRepository(User);
		let users: User[] = [];
		await userRepository
			.find()
			.then((result) => {
				users = result;
			})
			.catch((error) => {
				logger.error('Error: ' + error);
			});
		return users;
	}

	static async updateUser(id: number, firstName: string, lastName: string, age: number) {
		const userRepository = UsersDataSource.manager.getRepository(User);
		await userRepository
			.findOne({
				where: {
					id: id,
				},
			})
			.then((user?) => {
				if (user != null) {
					userRepository.save(user);
				}
			});
	}

	static async deleteUser(id: number) {
		const userRepository = UsersDataSource.manager.getRepository(User);
		await userRepository
			.findOne({
				where: {
					id: id,
				},
			})
			.then((user?) => {
				if (user != null) {
					userRepository.remove(user);
				}
			});
	}

	static async addUserProfilePicture(id: number, profilePicture: string): Promise<User | null> {
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
