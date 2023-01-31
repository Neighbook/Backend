import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../../models/users/user';
import { UserPreference } from '../../models/users/user_preference';
import { environnement } from '../../config/environnement';
import {Block} from '../../models/social/Block';
import {Abonnement} from '../../models/social/Abonnement';
import {Event} from '../../models/social/Evenement';
import {Follow} from '../../models/social/Follow';
import {Comment} from '../../models/social/Comment';
import {Image} from '../../models/social/Image';
import {Post} from '../../models/social/Post';
import {PostReaction} from '../../models/social/PostReaction';
import 'reflect-metadata';

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

export const SocialDataSource = new DataSource({
  type: 'postgres',
  host: environnement.database.host,
  port: environnement.database.port,
  username: environnement.database.username,
  password: environnement.database.password,
  database: environnement.database.social_service_database,
  synchronize: true,
  logging: environnement.logging.level === 'debug',
  entities: [Abonnement, Block, Comment, Event, Follow, Image, Post, PostReaction],
  migrations: [],
  subscribers: [],
});
