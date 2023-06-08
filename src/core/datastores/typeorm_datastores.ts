import 'reflect-metadata';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { environnement } from '../../config/environnement';
import { Abonnement } from '../../models/social/Abonnement';
import { Block } from '../../models/social/Block';
import { Comment } from '../../models/social/Comment';
import { Event } from '../../models/social/Evenement';
import { Follow } from '../../models/social/Follow';
import { Image } from '../../models/social/Image';
import { Post } from '../../models/social/Post';
import { PostReaction } from '../../models/social/PostReaction';
import { User } from '../../models/users/user';
import { UserPreference } from '../../models/users/user_preference';
import { Story } from '../../models/social/Story';

export const UsersDataSource = new DataSource({
	type: 'postgres',
	host: environnement.database.host,
	port: environnement.database.port,
	username: environnement.database.username,
	password: environnement.database.password,
	database: environnement.database.users_service_database,
	synchronize: environnement.database.synchronize,
	logging: environnement.database.logging,
	entities: [User, UserPreference],
	connectTimeoutMS: environnement.database.timeout,
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
	synchronize: environnement.database.synchronize,
	logging: environnement.database.logging,
	ssl: environnement.database.use_ssl,
	entities: [Abonnement, Block, Comment, Event, Follow, Image, Post, PostReaction, Story],
	connectTimeoutMS: environnement.database.timeout,
	migrations: [],
	subscribers: [],
});
