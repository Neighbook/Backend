import { Logger } from 'tslog';
import { DeleteResult, Repository } from 'typeorm';

import { SocialDataSource } from '../../core/datastores/typeorm_datastores';
import { Block } from '../../models/social/Block';
import { Follow } from '../../models/social/Follow';
import { User } from '../../models/users/user';
import { UserService } from '../users_service/user_service';

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
			});
		return block;
	}

	static async getBlocks(id: string): Promise<User[] | null> {
		const blocks = await blockRepository.find({
			where: {
				idUtilisateur: id,
			},
			select: {
				idUtilisateurBloque: true,
			},
		});

		return UserService.getUsersByIds(blocks.map((block) => block.idUtilisateurBloque));
	}

	static async getBlockers(id: string): Promise<User[] | null> {
		const blockers = await blockRepository.find({
			where: {
				idUtilisateurBloque: id,
			},
			select: {
				idUtilisateur: true,
			},
		});
		logger.info(blockers);
		return UserService.getUsersByIds(blockers.map((block) => block.idUtilisateur));
	}

	static async createBlock(id: string, idToBlock: string): Promise<any> {
		const block = new Block();
		block.idUtilisateur = id;
		block.idUtilisateurBloque = idToBlock;

		return SocialDataSource.manager.transaction(async (transactionalEntityManager) => {
			await transactionalEntityManager.save(block);
			await transactionalEntityManager.delete(Follow, { idUtilisateur: id, idUtilisateurSuivi: idToBlock });
		});
	}

	static async deleteBlock(id: string, idBlocked: string): Promise<DeleteResult> {
		return blockRepository.delete({ idUtilisateur: id, idUtilisateurBloque: idBlocked });
	}
}
