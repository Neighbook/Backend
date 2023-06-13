import { DeleteResult, Repository } from 'typeorm';

import { MessagerieDataSource } from '../../core/datastores/typeorm_datastores';
import { Message } from '../../models/messagerie/Message';

export const messageRepository: Repository<Message> = MessagerieDataSource.manager.getRepository(Message);

export class MessagerieService {
	static async getMessages(id: string): Promise<Message[] | null> {
		const messages = await messageRepository.find({
			where: {
				idMessage: id,
			},
		});

		return messages;
	}
	static async createMessage(message: Message): Promise<any> {
		return MessagerieDataSource.manager.transaction(async (transactionalEntityManager) => {
			await transactionalEntityManager.save(message);
		});
	}

	static async deleteMessage(idMessage: string): Promise<DeleteResult> {
		return messageRepository.delete({ idMessage });
	}
}
