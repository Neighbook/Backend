import {SocialDataSource} from '../../core/datastores/typeorm_datastores';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {Follow} from '../../models/social/Follow';

export class FollowService {

  static repository: Repository<Follow> = SocialDataSource.manager.getRepository(Follow);

    static async getFollow(id: string, idToFollow: string): Promise<Follow | null> {
        let follow: Follow | null = null;
        await this.repository
            .findOne({
                where: {
                    idUtilisateur: id,
                    idUtilisateurSuivi: idToFollow,
                },
            })
            .then((result) => {
                follow = result;
            })
            .catch((error: Error) => {
                console.log('Error: ' + error);
            });
        return follow;
    }

  static async getFollows(id: string): Promise<Follow[] | null> {
    const follow = await this.repository
      .find({
        where: {
          idUtilisateur : id
        },
          select:{
              idUtilisateurSuivi:true,
          }
      });
    return follow;
  }

    static async getFollowers(id: string): Promise<Follow[] | null> {
        const follow = await this.repository
            .find({
                where: {
                    idUtilisateurSuivi : id
                },
                select:{
                    id:true,
                }
            });
        return follow;
    }

  static async createFollow(id: string, idToFollow: string) {
    const follow = new Follow();
    let response: Follow | null = null;
    follow.idUtilisateur = id;
    follow.idUtilisateurSuivi = idToFollow;
    console.log('service log : ' + idToFollow);

    await this.repository.save(follow).then((follow) => {
      response = follow;
    });
    return response;
  }

  static async deleteFollow(id: string, idFollowed: string) {
    let response: DeleteResult | null = null;
     this.getFollow(id,idFollowed).then(data => {
         if(data != null){
             this.repository.softDelete(data.id).then((res) => {
                 response = res;
             }).catch((error) => {
                 console.log('Error: ' + error);
             });
         }else{
             response = null;
         }
     });

    return response;
  }
}
