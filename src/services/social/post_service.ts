import {SocialDataSource} from '../../core/datastores/typeorm_datastores';
import {Post} from '../../models/social/Post';
import {Event} from '../../models/social/Evenement';
import {reactionsIds} from './reactions_mapping';

const postRepository = SocialDataSource.manager.getRepository(Post);

export class PostService {
  static async getPost(id: number): Promise<Post | null> {
      return await postRepository.createQueryBuilder('post')
        .leftJoinAndSelect('post.commentaires', 'commentaires')
        .leftJoinAndSelect('post.images', 'images')
        .leftJoinAndSelect('post.evenement', 'evenement')
        .loadRelationCountAndMap('post.nlike', 'post.reactions', 'reactions',
            (qb) => qb.where('reactions.reactionId = :id', { id: reactionsIds.like }))
        .loadRelationCountAndMap('post.nmdr', 'post.reactions', 'reactions', (qb) => qb.where('reactions.reactionId = :id', { id: reactionsIds.mdr }))
        .loadRelationCountAndMap('post.nOo', 'post.reactions', 'reactions', (qb) => qb.where('reactions.reactionId = :id', { id: reactionsIds.Oo }))
        .loadRelationCountAndMap('post.nsnif', 'post.reactions', 'reactions', (qb) => qb.where('reactions.reactionId = :id', { id: reactionsIds.Oo }))
        .loadRelationCountAndMap('post.ngrr', 'post.reactions', 'reactions', (qb) => qb.where('reactions.reactionId = :id', { id: reactionsIds.Oo }))
        .loadRelationCountAndMap('post.nok', 'post.reactions', 'reactions', (qb) => qb.where('reactions.reactionId = :id', { id: reactionsIds.Oo }))
        .where('post.id = :id', { id: id })
        .getOne();
  }

  static async savePost(titre: string, description: string, estPartage: boolean, idUtilisateur: string, idEvenement: number | null): Promise<any> {
    const post = new Post();
    post.titre = titre;
    post.description = description;
    post.estPartage = estPartage;
    post.idUtilisateur = idUtilisateur;
    if(idEvenement) {
      post.evenement = new Event();
      post.evenement.id = idEvenement;
    }
    return await postRepository.save(post);
  }

  static async deletePost(id: number) {
    return await postRepository.softDelete(id);
  }
}
