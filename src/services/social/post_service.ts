import {SocialDataSource} from '../../core/datastores/typeorm_datastores'
import {User} from "../../models/User";
import {Post} from "../../models/social/Post";

const postRepository = SocialDataSource.manager.getRepository(Post)

export class PostService {

  // return user or null
  static async getPost(id: number): Promise<Post | null> {
    let post: Post | null = null
    await postRepository
      .findOne({
        where: {
          id: id,
          dateDeSuppression: undefined
        },
      })
      .then((result?) => {
        post = result
      })
      .catch((error) => {
        console.log('Error: ' + error)
      })
    return post
  }

  static async getPosts(): Promise<Post[]> {
    let posts: Post[] = []
    await postRepository
      .find(
        {
          where:{
            dateDeSuppression:undefined
          }
        }
      )
      .then((result) => {
        posts = result
      })
      .catch((error) => {
        console.log('Error: ' + error)
      })
    return posts
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
