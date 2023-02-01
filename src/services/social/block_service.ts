import {SocialDataSource} from '../../core/datastores/typeorm_datastores';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {Block} from '../../models/social/Block';
import {User} from '../../models/users/user';
import {UserService} from '../users_service/user_service';
import {Logger} from 'tslog';

export const blockRepository: Repository<Block> = SocialDataSource.manager.getRepository(Block);
const logger = new Logger({ name: 'SocialSer' });

export class BlockService {
    static async getBlock(id: string, idToBlock: string): Promise<Block | null> {
        let block: Block | null = null;
        await blockRepository
            .findOne({
                where: {
                    idUtilisateur: id,
                    idUtilisateurBloque: idToBlock,
                },
            })
            .then((result) => {
                block = result;
            })
            .catch((error: Error) => {
                console.log('Error: ' + error);
            });
        return block;
    }

  static async getBlocks(id: string): Promise<User[] | null> {
    const blocks = await blockRepository
      .find({
        where: {
          idUtilisateur : id
        },
          select:{
              idUtilisateurBloque:true,
          }
      });

    return UserService.getUsersByIds(blocks.map(block => block.idUtilisateurBloque));
  }

    static async getBlockers(id: string): Promise<User[] | null> {
        const blockers = await blockRepository
            .find({
                where: {
                    idUtilisateurBloque : id
                },
                select:{
                    idUtilisateur:true,
                }
            });
        logger.info(blockers);
        return UserService.getUsersByIds(blockers.map(block => block.idUtilisateur));
    }

  static async createBlock(id: string, idToBlock: string) {
    const block = new Block();
    let response: Block | null = null;
    block.idUtilisateur = id;
    block.idUtilisateurBloque = idToBlock;
    console.log('service log : ' + idToBlock);

    await blockRepository.save(block).then((block) => {
      response = block;
    });
    return response;
  }

  static async deleteBlock(id: string, idBlocked: string) {
    let response: DeleteResult | null = null;
     this.getBlock(id,idBlocked).then(data => {
         if(data != null){
             blockRepository.delete(data.id).then((res) => {
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
