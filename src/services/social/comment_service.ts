import {SocialDataSource} from '../../core/datastores/typeorm_datastores'
import {Comment} from "../../models/social/Comment";

const CommentRepository = SocialDataSource.manager.getRepository(Comment)

export class CommentService {
  static async getComment(id: number): Promise<Comment | null> {
    return await CommentRepository.findOne({
        where: {
          Id: id
        }
      })
  }

  static async putComment(Contenu: string, idCommentaire: Comment, IdUtilisateur: string): Promise<any> {
    let comment = new Comment()
    comment.Contenu = Contenu
    comment.IdCommentaire = idCommentaire
    comment.IdUtilisateur = IdUtilisateur
    return await CommentRepository.save(comment)
  }

  static async deleteComment(id: number): Promise<any> {
    return await CommentRepository.delete(id)
  }

}
