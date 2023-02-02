import {SocialDataSource} from '../../core/datastores/typeorm_datastores';
import {Post} from '../../models/social/Post';
import {Event} from '../../models/social/Evenement';
import {reactionsIds} from './reactions_mapping';
import {followRepository} from './follow_service';
import {Follow} from '../../models/social/Follow';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import {ObjectLiteral, UpdateResult} from 'typeorm';

const postRepository = SocialDataSource.manager.getRepository(Post);

declare module 'typeorm/query-builder/SelectQueryBuilder' {
    interface SelectQueryBuilder<Entity> {
        countReactions(this: SelectQueryBuilder<Entity>, idUtilisateur: string): SelectQueryBuilder<Entity>
    }
}

SelectQueryBuilder.prototype.countReactions =
    function <Entity extends ObjectLiteral>(this: SelectQueryBuilder<Entity>, idUtilisateur: string):
        SelectQueryBuilder<Entity> {
    return this.loadRelationCountAndMap('post.nlike', 'post.reactions', 'reactions',
        (qb) => qb.where('reactions.reactionId = :id', {id: reactionsIds.like}))
        .loadRelationCountAndMap('post.nmdr', 'post.reactions', 'reactions',
            (qb) => qb.where('reactions.reactionId = :id', {id: reactionsIds.mdr}))
        .loadRelationCountAndMap('post.nOo', 'post.reactions', 'reactions',
            (qb) => qb.where('reactions.reactionId = :id', {id: reactionsIds.Oo}))
        .loadRelationCountAndMap('post.nsnif', 'post.reactions', 'reactions',
            (qb) => qb.where('reactions.reactionId = :id', {id: reactionsIds.Oo}))
        .loadRelationCountAndMap('post.ngrr', 'post.reactions', 'reactions',
            (qb) => qb.where('reactions.reactionId = :id', {id: reactionsIds.Oo}))
        .loadRelationCountAndMap('post.nok', 'post.reactions', 'reactions',
            (qb) => qb.where('reactions.reactionId = :id', {id: reactionsIds.Oo}))
        .loadRelationCountAndMap('post.ncommentaires', 'post.commentaires', 'commentaires')
        .leftJoinAndSelect('post.reactions', 'reaction',
            'reaction.idUtilisateur = :idUtilisateur', {idUtilisateur:idUtilisateur});

    };

export const formatPost = (post: Post): ObjectLiteral => {
    const reactionUtilisateur = post.reactions.length === 1 ? post.reactions[0].reactionId : null;
    return  {
        'id': post.id,
        'titre': post.titre,
        'description': post.description,
        'estPartage': post.estPartage,
        'idUtilisateur': post.idUtilisateur,
        'dateDeCreation': post.dateDeCreation,
        'dateDeModification': post.dateDeModification,
        'commentaires': post.commentaires,
        'ncommentaires': post.ncommentaires,
        'reactionUtilisateur': reactionUtilisateur,
        'images': post.images,
        'evenement': post.evenement,
        'nombreReactions':{
            'like': post.nlike,
            'mdr': post.nmdr,
            'Oo': post.nOo,
            'snif': post.nsnif,
            'grr': post.ngrr,
            'ok': post.nok,
        }
    };
};

export class PostService {
  static async getPost(id: number, idUtilisateur: string): Promise<Post | null> {
      return await postRepository.createQueryBuilder('post')
        .leftJoinAndSelect('post.commentaires', 'commentaires')
        .leftJoinAndSelect('post.images', 'images')
        .leftJoinAndSelect('post.evenement', 'evenement')
        .countReactions(idUtilisateur)
        .where('post.id = :id', { id: id })
        .getOne();
  }

    static async getFollowPost(idUtilisateur: string): Promise<Post[]> {
        const followQueryBuilder = followRepository.createQueryBuilder('follow');
        return await postRepository.createQueryBuilder('post')
            .leftJoinAndSelect('post.images', 'images')
            .leftJoinAndSelect('post.evenement', 'evenement')
            .countReactions(idUtilisateur)
            .where('post.idUtilisateur IN ' + followQueryBuilder.subQuery()
                .select('follow.idUtilisateurSuivi').from(Follow, 'follow')
                .where(`follow.idUtilisateur = '${idUtilisateur}'`).getQuery())
            .getMany();
    }

  static async savePost(titre: string,
                        description: string,
                        estPartage: boolean,
                        idUtilisateur: string,
                        idEvenement: number | null): Promise<Post> {
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



  static async deletePost(id: number): Promise<UpdateResult> {
    return await postRepository.softDelete(id);
  }
}
