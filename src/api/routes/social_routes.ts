import express from 'express';
import { Logger } from 'tslog';

import { Comment } from '../../models/social/Comment';
import { BlockService } from '../../services/social/block_service';
import { CommentService } from '../../services/social/comment_service';
import { EventService } from '../../services/social/event_service';
import { FollowService } from '../../services/social/follow_service';
import { PostService, formatPost } from '../../services/social/post_service';
import { ReactionService } from '../../services/social/reactions_service';

export const _socialRoutes = express.Router();
const logger = new Logger({ name: 'SocialRoute' });

// Comment routes
_socialRoutes.get('/comment', async (req: express.Request, res: express.Response) => {
	if (req.query.id) {
		const searchId = Number(req.query.id);
		const comments = await CommentService.getComment(searchId);
		if (comments !== null) {
			let comment: Comment = new Comment();
			const relatedComment: Comment[] = [];
			comments.forEach((c) => {
				if (c.id === searchId) {
					comment = c;
				} else {
					relatedComment.push(c);
				}
			});
			const apiRes = {
				comment: comment,
				relatedComment: relatedComment,
			};
			res.status(200).json(apiRes);
		} else {
			res.status(404).send();
		}
	} else {
		res.status(400).json('provide id');
	}
});

_socialRoutes.post('/comment', async (req: express.Request, res: express.Response) => {
	if (req.body.idUtilisateur && req.body.contenu && req.body.idPost) {
		CommentService.putComment(
			req.body.contenu,
			req.body.idPost,
			req.body.idUtilisateur,
			req.body.idCommentaire
		).then(() => res.status(200).send());
	} else {
		res.status(400).json('invalid fields');
	}
});

_socialRoutes.delete('/comment', async (req: express.Request, res: express.Response) => {
	if (req.query.id) {
		CommentService.deleteComment(Number(req.query.id)).then(() => res.status(200).send());
	} else {
		res.status(400).json('invalid fields');
	}
});

// Post routes
_socialRoutes.get('/post', async (req: express.Request, res: express.Response) => {
	if (req.query.id) {
		const post = await PostService.getPost(Number(req.query.id), req.body.user._user_id);
		if (post !== null) {
			res.status(200).json(formatPost(post));
		} else {
			res.status(404).send();
		}
	} else {
		res.status(400).json('provide id');
	}
});

_socialRoutes.get('/feed', async (req: express.Request, res: express.Response) => {
	if (req.query.id) {
		const feed = await PostService.getFollowPost(req.query.id.toString());
		if (feed !== null) {
			res.status(200).json(feed.map((post) => formatPost(post)));
		} else {
			res.status(404).send();
		}
	} else {
		res.status(400).json('provide id');
	}
});

_socialRoutes.post('/post', async (req: express.Request, res: express.Response) => {
	if (req.body.titre && req.body.description && req.body.estPartage !== undefined && req.body.idUtilisateur) {
		PostService.savePost(
			req.body.titre,
			req.body.description,
			req.body.estPartage,
			req.body.idUtilisateur,
			req.body.idEvenement
		).then(() => res.status(200).send());
	} else {
		res.status(400).json('invalid fields');
	}
});

_socialRoutes.delete('/post', async (req: express.Request, res: express.Response) => {
	if (req.query.id) {
		CommentService.deleteComment(Number(req.query.id)).then(() => res.status(200).send());
	} else {
		res.status(400).json('invalid fields');
	}
});

// Events
_socialRoutes.get('/event', async (req: express.Request, res: express.Response) => {
	// #swagger.tags = ['Social']
	// #swagger.description = 'Endpoint to get an event details'
	// #swagger.summary = 'Get an event'
	// #swagger.parameters['id'] = { description: 'User id' }
	// #swagger.responses[200] = { description: 'Success' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }
	// #swagger.responses[400] = { description: 'Wrong argument' }
	if (req.query.id) {
		const event = await EventService.getEvent(Number(req.query.id));
		if (event !== null) {
			const formattedGet = {
				id: event.id,
				titre: event.titre,
				addresse: event.addresse,
				dateEvenement: event.dateEvenement,
			};
			res.status(200).json(formattedGet);
		} else {
			res.status(500).send();
		}
	} else {
		res.status(400).json('provide id');
	}
});

_socialRoutes.post('/event', async (req: express.Request, res: express.Response) => {
	if (req.body.titre && req.body.dateEvenement && req.body.addresse !== undefined) {
		EventService.createEvent(req.body.titre, req.body.dateEvenement, req.body.addresse).then(() =>
			res.status(200).send()
		);
	} else {
		res.status(400).json('invalid fields');
	}
});

_socialRoutes.delete('/event', async (req: express.Request, res: express.Response) => {
	if (req.query.id) {
		EventService.deleteEvent(Number(req.query.id)).then(() => res.status(200).send());
	} else {
		res.status(400).json('invalid fields');
	}
});

// Follow
_socialRoutes.get('/follows', async (req: express.Request, res: express.Response) => {
	// #swagger.tags = ['Social']
	// #swagger.description = 'Endpoint to get a user follows'
	// #swagger.summary = 'Get all follow'
	// #swagger.parameters['id'] = { description: 'User id' }
	// #swagger.responses[200] = { description: 'Success' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }
	let follows;
	if (req.query.id) {
		follows = await FollowService.getFollows(req.query.id.toString());
	} else {
		follows = await FollowService.getFollows(req.body.user._user_id);
	}
	if (follows !== null) {
		res.status(200).json(follows);
	} else {
		res.status(400).send();
	}
});

_socialRoutes.get('/followers', async (req: express.Request, res: express.Response) => {
	// #swagger.tags = ['Social']
	// #swagger.description = 'Endpoint to get a user followers'
	// #swagger.summary = 'Get all followers'
	// #swagger.parameters['id'] = { description: 'User id' }
	// #swagger.responses[200] = { description: 'Success' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }
	let followers;
	if (req.query.id) {
		followers = await FollowService.getFollowers(req.query.id.toString());
	} else {
		followers = await FollowService.getFollowers(req.body.user._user_id);
	}

	if (followers !== null) {
		res.status(200).json(followers);
	} else {
		res.status(400).send();
	}
});

_socialRoutes.post('/follow', async (req: express.Request, res: express.Response) => {
	if (req.body.idToFollow && req.body.user._user_id) {
		FollowService.createFollow(req.body.user._user_id, req.body.idToFollow).then(() =>
			res.status(200).send()
		);
	} else {
		res.status(400).json('invalid fields');
	}
});

_socialRoutes.delete('/follow', async (req: express.Request, res: express.Response) => {
	if (req.query.id) {
		FollowService.deleteFollow(req.body.user._user_id, req.query.id.toString()).then(() =>
			res.status(200).send()
		);
	} else {
		res.status(400).json('invalid fields');
	}
});

// Block
_socialRoutes.get('/blocks', async (req: express.Request, res: express.Response) => {
	// #swagger.tags = ['Social']
	// #swagger.description = 'Endpoint to get a user blocks'
	// #swagger.summary = 'Get all blocked users'
	// #swagger.parameters['id'] = { description: 'User id' }
	// #swagger.responses[200] = { description: 'Success' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }

	let blocks;
	if (req.query.id) {
		blocks = await BlockService.getBlocks(req.query.id.toString());
	} else {
		blocks = await BlockService.getBlocks(req.body.user._user_id);
	}

	if (blocks !== null) {
		res.status(200).json(blocks);
	} else {
		res.status(400).send();
	}
});

_socialRoutes.get('/blockers', async (req: express.Request, res: express.Response) => {
	// #swagger.tags = ['Social']
	// #swagger.description = 'Endpoint to get a user blockers'
	// #swagger.summary = 'Get all users who blocked'
	// #swagger.parameters['id'] = { description: 'User id' }
	// #swagger.responses[200] = { description: 'Success' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }
	let blockers;
	if (req.query.id) {
		blockers = await BlockService.getBlockers(req.query.id.toString());
	} else {
		blockers = await BlockService.getBlockers(req.body.user._user_id);
	}

	if (blockers !== null) {
		res.status(200).json(blockers);
	} else {
		res.status(400).send();
	}
});

_socialRoutes.post('/block', async (req: express.Request, res: express.Response) => {
	if (req.body.idToBlock && req.body.user._user_id) {
		BlockService.createBlock(req.body.user._user_id, req.body.idToBlock)
			.then(() => res.status(200).send())
			.catch((error) => {
				logger.error(error);
				res.status(500).send();
			});
	} else {
		res.status(400).json('invalid fields');
	}
});

_socialRoutes.delete('/block', async (req: express.Request, res: express.Response) => {
	if (req.body.idToUnBlock) {
		BlockService.deleteBlock(req.body.user._user_id, req.body.idToUnBlock.toString()).then(() =>
			res.status(200).send()
		);
	} else {
		res.status(400).json('invalid fields');
	}
});

// Reactions routes
_socialRoutes.get('/reaction', async (req: express.Request, res: express.Response) => {
	let apiRes;
	if (req.query.postId) {
		apiRes = await ReactionService.getPostReactions(Number(req.query.postId));
	} else if (req.query.userId) {
		apiRes = await ReactionService.getUserReactions(req.query.userId.toString());
	} else {
		res.status(400).json('provide id');
	}
	if (apiRes) {
		res.status(200).json(apiRes);
	} else {
		res.status(404).send();
	}
});

_socialRoutes.patch('/reaction', async (req: express.Request, res: express.Response) => {
	if (req.body.reactionId && req.body.postId) {
		ReactionService.upsertReaction(
			Number(req.body.postId),
			req.body.user._user_id,
			Number(req.body.reactionId)
		).then(() => res.status(200).send);
	} else {
		res.status(400).json('provide id');
	}
});

export const socialRoutes = _socialRoutes;
