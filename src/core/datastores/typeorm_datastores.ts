import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../../models/User'
import { environnement } from '../../config/environnement'

export const UserDataSource = new DataSource({
    type: 'postgres',
    host: environnement.database.host,
    port: 5432,
    username: environnement.database.username,
    password: environnement.database.password,
    database: environnement.database.user_database,
    synchronize: true,
    logging: environnement.loggin.level === 'debug' ? true : false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
