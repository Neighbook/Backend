import {SocialDataSource} from '../../core/datastores/typeorm_datastores'
import {Post} from "../../models/social/Post";
import {Event} from "../../models/social/Evenement";

const postRepository = SocialDataSource.manager.getRepository(Post)

export class PostService {
  static async getPost(id: number): Promise<Post | null> {
    return await postRepository.findOne({
      where: {
        id: id,
        dateDeSuppression: undefined
      },
      relations: {
        commentaires: true,
        images: true
      }
    })
  }

  static async savePost(titre: string, description: string, estPartage: boolean, idUtilisateur: string, idEvenement: number | null): Promise<any> {
    let post = new Post()
    post.titre = titre
    post.description = description
    post.estPartage = estPartage
    post.idUtilisateur = idUtilisateur
    if(idEvenement) {
      post.Evenement = new Event()
      post.Evenement.id = idEvenement
    }
    return await postRepository.save(post)
  }

  static async deletePost(id: number) {
    return await postRepository.softDelete(id)
  }
}
