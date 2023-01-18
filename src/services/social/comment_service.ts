import {SocialDataSource} from '../../core/datastores/typeorm_datastores'
import {Comment} from "../../models/social/Comment";
import {Post} from "../../models/social/Post";

const CommentRepository = SocialDataSource.manager.getRepository(Comment)

export class CommentService {
  static async getComment(id: number): Promise<Comment | null> {
    return await CommentRepository.findOne({
      where: {
        id: id,
        dateDeSuppression: undefined
      }
    })
  }

  static async putComment(contenu: string, idPost: Post, commentaire: Comment | null, idUtilisateur: string): Promise<any> {
    let comment = new Comment()
    comment.contenu = contenu
    comment.idUtilisateur = idUtilisateur
    comment.post = idPost
    if (commentaire){
      comment.commentaire = commentaire
    }
    return await CommentRepository.save(comment)
  }

  static async deleteComment(id: number): Promise<any> {
    return await CommentRepository.softDelete(id)
  }

}
