import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../../models/User'
import { environnement } from '../../config/environnement'

export const UserDataSource = new DataSource({
    type: 'postgres',
    host: environnement.database.host,
    port: environnement.database.port,
    username: environnement.database.username,
    password: environnement.database.password,
    database: environnement.database.user_database,
    synchronize: true,
    logging: environnement.loggin.level === 'debug',
    entities: [User],
    migrations: [],
    subscribers: [],
})

export const SocialDataSource = new DataSource({
  type: 'postgres',
  host: environnement.database.host,
  port: environnement.database.port,
  username: environnement.database.username,
  password: environnement.database.password,
  database: environnement.database.social_database,
  synchronize: true,
  logging: environnement.loggin.level === 'debug',
  entities: [User],
  migrations: [],
  subscribers: [],
})
