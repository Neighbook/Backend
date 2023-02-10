import { SocialDataSource } from '../../core/datastores/typeorm_datastores';
import { Comment } from '../../models/social/Comment';
import { Post } from '../../models/social/Post';

const CommentRepository = SocialDataSource.manager.getRepository(Comment);

export class CommentService {
	static async getComment(id: string): Promise<Comment[] | null> {
		const CommentQueryBuilder = CommentRepository.createQueryBuilder('comment');
		return await CommentQueryBuilder.where(
			'comment.post = ' +
				CommentQueryBuilder.subQuery()
					.select('commentaire.post')
					.from(Comment, 'commentaire')
					.where('commentaire.id = :id', { id: id })
					.getQuery()
		).getMany();
	}

	static async putComment(
		contenu: string,
		postId: string,
		idUtilisateur: string,
		idCommentaire: string | null
	): Promise<any> {
		const comment = new Comment();
		comment.contenu = contenu;
		comment.idUtilisateur = idUtilisateur;
		comment.post = new Post();
		comment.post.id = postId;
		if (idCommentaire) {
			comment.commentaire = new Comment();
			comment.commentaire.id = idCommentaire;
		}
		return await CommentRepository.save(comment);
	}

	static async deleteComment(id: string, idUtilisateur: string): Promise<any> {
		return await CommentRepository.createQueryBuilder()
			.softDelete()
			.where('id = :id and idUtilisateur = :idUtilisateur', { id, idUtilisateur })
			.execute();
	}
}
