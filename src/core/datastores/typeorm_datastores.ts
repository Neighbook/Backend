import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../../models/User'
import { environnement } from '../../config/environnement'
import { NUMBER } from 'sequelize'

export const UserDataSource = new DataSource({
    type: 'postgres',
    host: environnement.database.host,
    port: environnement.database.port,
    username: environnement.database.username,
    password: environnement.database.password,
    database: environnement.database.user_database,
    synchronize: true,
    logging: environnement.logging.level === 'debug' ? true : false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
