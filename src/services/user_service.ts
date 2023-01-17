import { User } from '../models/User'
import { UserDataSource } from '../core/datastores/typeorm_datastores'

export class UserService {
	// return user or null
	static async getUser(id: number): Promise<User | null> {
		const userRepository = UserDataSource.manager.getRepository(User)
		let user: User | null = null
		await userRepository
			.findOne({
				where: {
					id: id,
				},
			})
			.then((result?) => {
				user = result
			})
			.catch((error) => {
				console.log('Error: ' + error)
			})
		return user
	}

	static async getUsers(): Promise<User[]> {
		const userRepository = UserDataSource.manager.getRepository(User)
		let users: User[] = []
		await userRepository
			.find()
			.then((result) => {
				users = result
			})
			.catch((error) => {
				console.log('Error: ' + error)
			})
		return users
	}

	static async createUser(firstName: string, lastName: string, age: number) {
		const userRepository = UserDataSource.manager.getRepository(User)
		let user = new User()
		let response: User | null = null
		user.firstName = firstName
		user.lastName = lastName
		user.age = age

		await userRepository.save(user).then((user) => {
			response = user;
		})

		return response
	}

	static async updateUser(id: number, firstName: string, lastName: string, age: number) {
		const userRepository = UserDataSource.manager.getRepository(User)
		await userRepository
			.findOne({
				where: {
					id: id,
				},
			})
			.then((user?) => {
				if (user != null) {
					user.firstName = firstName
					user.lastName = lastName
					user.age = age
					userRepository.save(user)
				}
			})
	}

	static async deleteUser(id: number) {
		const userRepository = UserDataSource.manager.getRepository(User)
		await userRepository
			.findOne({
				where: {
					id: id,
				},
			})
			.then((user?) => {
				if (user != null) {
					userRepository.delete(user)
				}
			})
	}
}
