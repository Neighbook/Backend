import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { environnement } from '../../config/environnement';
import { User } from '../../models/users/user';
import { UserPreference } from '../../models/users/user_preference';

export const UsersDataSource = new DataSource({
	type: 'postgres',
	host: environnement.database.host,
	port: environnement.database.port,
	username: environnement.database.username,
	password: environnement.database.password,
	database: environnement.database.users_service_database,
	synchronize: true,
	logging: environnement.database.logging,
	entities: [User, UserPreference],
	ssl: environnement.database.use_ssl,
	migrations: [],
	subscribers: [],
	applicationName: environnement.api_name,
});
