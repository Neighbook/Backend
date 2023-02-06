import { DeleteResult } from 'typeorm';

import { SocialDataSource } from '../../core/datastores/typeorm_datastores';
import { Post } from '../../models/social/Post';
import { PostReaction } from '../../models/social/PostReaction';

const ReactionRepository = SocialDataSource.manager.getRepository(PostReaction);

export class ReactionService {
	static async getPostReactions(id: number): Promise<PostReaction[] | null> {
		const post = new Post();
		post.id = id;
		return ReactionRepository.find({
			where: {
				post: post,
			},
			select: {
				idUtilisateur: true,
				reactionId: true,
			},
		});
	}

	static async getUserReactions(id: string): Promise<[PostReaction[], number]> {
		return ReactionRepository.findAndCount({
			where: {
				idUtilisateur: id,
			},
			select: {
				reactionId: true,
				idPost: true,
			},
		});
	}

	static async upsertReaction(postId: number, userId: string, reactionId: number): Promise<any> {
		const newReaction = new PostReaction();
		newReaction.idPost = postId;
		newReaction.idUtilisateur = userId;
		newReaction.reactionId = reactionId;

		return ReactionRepository.upsert(newReaction, ['idPost', 'idUtilisateur']);
	}

	static async deleteReaction(postId: number, userId: string): Promise<DeleteResult> {
		return ReactionRepository.delete({
			idPost: postId,
			idUtilisateur: userId,
		});
	}
}
