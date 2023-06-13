import { Repository } from 'typeorm';

import { MessagerieDataSource } from '../../core/datastores/typeorm_datastores';
import { GroupRoom } from '../../models/messagerie/GroupRoom';

export const groupRoomRepository: Repository<GroupRoom> =
	MessagerieDataSource.manager.getRepository(GroupRoom);

export class GroupRoomService {
	static async getGroups(idUser: string): Promise<GroupRoom[] | null> {
		const groups = await groupRoomRepository.find({
			where: {
				idUtilisateurs: idUser,
			},
		});

		return groups;
	}
	static async createGroup(name: string, idUtilisateurs: string[]): Promise<any> {
		const group = new GroupRoom();

		group.name = name;
		group.idUtilisateurs = idUtilisateurs;

		return MessagerieDataSource.manager.transaction(async (transactionalEntityManager) => {
			await transactionalEntityManager.save(group);
		});
	}
}
