import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../../models/users/user'
import { environnement } from '../../config/environnement'

export const UsersDataSource = new DataSource({
    type: 'postgres',
    host: environnement.database.host,
    port: environnement.database.port,
    username: environnement.database.username,
    password: environnement.database.password,
    database: environnement.database.users_service_database,
    synchronize: true,
    logging: environnement.logging.level === 'debug' ? true : false,
    entities: [User],
    migrations: [],
    subscribers: [],
    applicationName: environnement.api_name,
})
