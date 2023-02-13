import * as queryString from 'querystring';
import { ObjectLiteral, UpdateResult } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

import { SocialDataSource } from '../../core/datastores/typeorm_datastores';
import { Event } from '../../models/social/Evenement';
import { Follow } from '../../models/social/Follow';
import { Post } from '../../models/social/Post';
import { followRepository } from './follow_service';
import { ImageService } from './image_service';
import { reactionsIds } from './reactions_mapping';

const postRepository = SocialDataSource.manager.getRepository(Post);

declare module 'typeorm/query-builder/SelectQueryBuilder' {
	interface SelectQueryBuilder<Entity> {
		countReactions(this: SelectQueryBuilder<Entity>, idUtilisateur: string): SelectQueryBuilder<Entity>;
	}
}

SelectQueryBuilder.prototype.countReactions = function <Entity extends ObjectLiteral>(
	this: SelectQueryBuilder<Entity>,
	idUtilisateur: string
): SelectQueryBuilder<Entity> {
	return this.loadRelationCountAndMap('post.nlike', 'post.reactions', 'reactions', (qb) =>
		qb.where('reactions.reactionId = :id', { id: reactionsIds.like })
	)
		.loadRelationCountAndMap('post.nmdr', 'post.reactions', 'reactions', (qb) =>
			qb.where('reactions.reactionId = :id', { id: reactionsIds.mdr })
		)
		.loadRelationCountAndMap('post.nOo', 'post.reactions', 'reactions', (qb) =>
			qb.where('reactions.reactionId = :id', { id: reactionsIds.Oo })
		)
		.loadRelationCountAndMap('post.nsnif', 'post.reactions', 'reactions', (qb) =>
			qb.where('reactions.reactionId = :id', { id: reactionsIds.snif })
		)
		.loadRelationCountAndMap('post.ngrr', 'post.reactions', 'reactions', (qb) =>
			qb.where('reactions.reactionId = :id', { id: reactionsIds.grr })
		)
		.loadRelationCountAndMap('post.nok', 'post.reactions', 'reactions', (qb) =>
			qb.where('reactions.reactionId = :id', { id: reactionsIds.ok })
		)
		.loadRelationCountAndMap('post.ncommentaires', 'post.commentaires', 'commentaires')
		.leftJoinAndSelect('post.reactions', 'reaction', 'reaction.idUtilisateur = :idUtilisateur', {
			idUtilisateur: idUtilisateur,
		});
};

export const formatPost = async (post: Post): Promise<ObjectLiteral> => {
	const reactionUtilisateur = post.reactions?.length === 1 ? post.reactions[0].reactionId : null;
	for (const image of post.images) {
		const query = queryString.decode(image.url);
		const id = (image.url.split('?')[0].split('/').pop() ?? '').substring('social_img_'.length);
		if (query.se && id && new Date(query.se.toString()) < new Date()) {
			const url = await ImageService.renewImageUrl(id);
			if (url) {
				image.url = url;
			}
		}
	}
	return {
		id: post.id,
		titre: post.titre,
		description: post.description,
		estPartage: post.estPartage,
		idUtilisateur: post.idUtilisateur,
		dateDeCreation: post.dateDeCreation,
		dateDeModification: post.dateDeModification,
		commentaires: post.commentaires,
		ncommentaires: post.ncommentaires,
		reactionUtilisateur: reactionUtilisateur,
		images: post.images,
		evenement: post.evenement,
		nombreReactions: {
			like: post.nlike,
			mdr: post.nmdr,
			Oo: post.nOo,
			snif: post.nsnif,
			grr: post.ngrr,
			ok: post.nok,
		},
	};
};

export class PostService {
	static async getPost(id: string, idUtilisateur: string): Promise<Post | null> {
		return await postRepository
			.createQueryBuilder('post')
			.leftJoinAndSelect('post.commentaires', 'commentaires')
			.leftJoinAndSelect('post.images', 'images')
			.leftJoinAndSelect('post.evenement', 'evenement')
			.countReactions(idUtilisateur)
			.where('post.id = :id', { id: id })
			.getOne();
	}

	static async getFollowPost(idUtilisateur: string): Promise<Post[]> {
		const followQueryBuilder = followRepository.createQueryBuilder('follow');
		return await postRepository
			.createQueryBuilder('post')
			.leftJoinAndSelect('post.images', 'images')
			.leftJoinAndSelect('post.evenement', 'evenement')
			.countReactions(idUtilisateur)
			.where(
				'post.idUtilisateur IN ' +
					followQueryBuilder
						.subQuery()
						.select('follow.idUtilisateurSuivi')
						.from(Follow, 'follow')
						.where(`follow.idUtilisateur = '${idUtilisateur}'`)
						.getQuery() +
					' OR post.idUtilisateur = :idUtilisateur',
				{ idUtilisateur }
			)
			.orderBy('post.dateDeModification', 'DESC')
			.getMany();
	}

	static async getEventsByLocalisation(
		distance: number,
		longitude: number,
		latitude: number,
		idUtilisateur: string
	): Promise<Post[]> {
		// distance in m
		return await postRepository
			.createQueryBuilder('post')
			.leftJoinAndSelect('post.images', 'images')
			.leftJoinAndSelect('post.evenement', 'evenement')
			.countReactions(idUtilisateur)
			.where(
				`ST_DistanceSphere(ST_MakePoint(evenement.longitude, evenement.latitude),
                ST_MakePoint(${longitude}, ${latitude})) <= ${distance}`
			)
			.getMany();
	}

	static async savePost(
		titre: string,
		description: string,
		estPartage: boolean,
		idUtilisateur: string,
		idEvenement: string | null
	): Promise<Post> {
		const post = new Post();
		post.titre = titre;
		post.description = description;
		post.estPartage = estPartage;
		post.idUtilisateur = idUtilisateur;
		if (idEvenement) {
			post.evenement = new Event();
			post.evenement.id = idEvenement;
		}
		return await postRepository.save(post);
	}

	static async deletePost(id: string, idUtilisateur: string): Promise<UpdateResult> {
		return await postRepository
			.createQueryBuilder()
			.softDelete()
			.where('id = :id and idUtilisateur = :idUtilisateur', { id, idUtilisateur })
			.execute();
	}
}
