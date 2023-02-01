import {SocialDataSource} from '../../core/datastores/typeorm_datastores';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {Follow} from '../../models/social/Follow';
import {User} from '../../models/users/user';
import {UserService} from '../users_service/user_service';
import {Logger} from 'tslog';

export const followRepository: Repository<Follow> = SocialDataSource.manager.getRepository(Follow);
const logger = new Logger({ name: 'SocialServ' });

export class FollowService {
    static async getFollow(id: string, idToFollow: string): Promise<Follow | null> {
        let follow: Follow | null = null;
        await followRepository
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

  static async getFollows(id: string): Promise<User[] | null> {
    const follows = await followRepository
      .find({
        where: {
          idUtilisateur : id
        },
          select:{
              idUtilisateurSuivi:true,
          }
      });

    return UserService.getUsersByIds(follows.map(follow => follow.idUtilisateurSuivi));
  }

    static async getFollowers(id: string): Promise<User[] | null> {
        const followers = await followRepository
            .find({
                where: {
                    idUtilisateurSuivi : id
                },
                select:{
                    idUtilisateur:true,
                }
            });
        logger.info(followers);
        return UserService.getUsersByIds(followers.map(follow => follow.idUtilisateur));
    }

  static async createFollow(id: string, idToFollow: string) {
    const follow = new Follow();
    let response: Follow | null = null;
    follow.idUtilisateur = id;
    follow.idUtilisateurSuivi = idToFollow;
    console.log('service log : ' + idToFollow);

    await followRepository.save(follow).then((follow) => {
      response = follow;
    });
    return response;
  }

  static async deleteFollow(id: string, idFollowed: string) {
    let response: DeleteResult | null = null;
     this.getFollow(id,idFollowed).then(data => {
         if(data != null){
             followRepository.delete(data.id).then((res) => {
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
