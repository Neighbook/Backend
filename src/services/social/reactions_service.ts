import {SocialDataSource} from '../../core/datastores/typeorm_datastores';
import {Post} from '../../models/social/Post';
import {PostReaction} from '../../models/social/PostReaction';
import {DeleteResult} from "typeorm";

const ReactionRepository = SocialDataSource.manager.getRepository(PostReaction);

export class ReactionService {
  static async getPostReactions(id: number): Promise<PostReaction[] | null> {
      const post = new Post();
      post.id = id;
      return ReactionRepository
          .find({
              where: {
                  post: post
              },
              select:{
                  idUtilisateur:true,
                  reactionId: true
              }
          });
  }

    static async getUserReactions(id: string): Promise<[PostReaction[], number]> {
        return ReactionRepository
            .findAndCount({
                where: {
                    idUtilisateur : id
                },
                select:{
                    reactionId: true,
                    idPost: true
                }
            });
    }

    static async createReaction(postId: number, userId: string, reactionId: number): Promise<any> {
        const newReaction = new PostReaction();
        newReaction.post = new Post();
        newReaction.post.id = postId;
        newReaction.idUtilisateur = userId;
        newReaction.reactionId = reactionId;

        return ReactionRepository.save(newReaction);
    }

    static async modifyReaction(postId: number, userId: string, reactionId: number): Promise<any> {
        return ReactionRepository.createQueryBuilder()
            .update(PostReaction)
            .set({ reactionId: reactionId })
            .where('idPost = :idPost', { idPost: postId })
            .where('idUtilisateur = :idUtilisateur', { idUtilisateur: userId })
            .execute();
    }

    static async deleteReaction(postId: number, userId: string): Promise<DeleteResult> {
        return ReactionRepository.delete({
            idPost: postId,
            idUtilisateur: userId
        });
    }
}
