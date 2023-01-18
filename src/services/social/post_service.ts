import {SocialDataSource} from '../../core/datastores/typeorm_datastores'
import {Post} from "../../models/social/Post";

const postRepository = SocialDataSource.manager.getRepository(Post)

export class PostService {

  // return user or null
  static async getPost(id: number): Promise<Post | null> {
    return await postRepository.findOne({
      where: {
        id: id,
        dateDeSuppression: undefined
      },
      relations: {
        commentaires: true,
        images: true
      },
    })
  }

  static async savePost(titre: string, description: string, estPartage: boolean) {
    let post = new Post()
    let response: Post | null = null
    post.titre = titre
    post.description = description
    post.estPartage = estPartage
    await postRepository.save(post).then((post) => {
      response = post;
    })
    return response
  }

  static async deletePost(id: number) {
    let post = await this.getPost(id)
    if(post){
      post.dateDeSuppression = new Date()
    }
  }
}
