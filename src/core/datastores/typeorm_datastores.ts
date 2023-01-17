import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../../models/User'
import { environnement } from '../../config/environnement'
import {Block} from "../../models/social/Block";
import {Abonnement} from "../../models/social/Abonnement";
import {Event} from "../../models/social/Evenement";
import {Follow} from "../../models/social/Follow";
import {Comment} from "../../models/social/Comment";
import {Image} from "../../models/social/Image";
import {Post} from "../../models/social/Post";
import {PostReaction} from "../../models/social/PostReaction";
import {Reaction} from "../../models/social/Reaction";

export const UserDataSource = new DataSource({
    type: 'postgres',
    host: environnement.database.host,
    port: environnement.database.port,
    username: environnement.database.username,
    password: environnement.database.password,
    database: environnement.database.user_database,
    synchronize: true,
    logging: environnement.logging.level === 'debug',
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
  logging: environnement.logging.level === 'debug',
  entities: [Abonnement, Block, Comment, Event, Follow, Image, Post, PostReaction, Reaction],
  migrations: [],
  subscribers: [],
})
