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

  static async savePost(titre: string, description: string, estPartage: boolean, idUtilisateur: string, evenement: Event | null): Promise<any> {
    let post = new Post()
    post.titre = titre
    post.description = description
    post.estPartage = estPartage
    post.idUtilisateur = idUtilisateur
    if(evenement) {
      post.Evenement = evenement
    }
    return await postRepository.save(post)
  }

  static async deletePost(id: number) {
    let post = await this.getPost(id)
    if(post){
      post.dateDeSuppression = new Date()
    }
  }
}
