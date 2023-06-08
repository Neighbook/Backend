import * as queryString from 'querystring';
import { json } from 'stream/consumers';
import { ObjectLiteral, UpdateResult } from 'typeorm';

import { SocialDataSource } from '../../core/datastores/typeorm_datastores';
import { Story } from '../../models/social/Story';
import { ImageService } from './image_service';

const storyRepository = SocialDataSource.manager.getRepository(Story);

export const formatStory = async (story: Story): Promise<ObjectLiteral> => {
	return {
		id: story.id,
		idUtilisateur: story.idUtilisateur,
		instaStoryObject: JSON.parse(story.instaStoryObject),
		dateDeCreation: story.dateDeCreation,
		dateDeModification: story.dateDeModification,
	};
};

export class StoryService {
	static async getStory(idUtilisateur: string): Promise<Story | null> {
		return await storyRepository
			.createQueryBuilder('story')
			.where('story.idUtilisateur = :id', { id: idUtilisateur })
			.getOne();
	}

	static async saveStory(idUtilisateur: string, instaStoryObject: any): Promise<Post> {
		const story = new Story();
		story.idUtilisateur = idUtilisateur;
		story.instaStoryObject = instaStoryObject;

		return await storyRepository.save(story);
	}

	static async deleteStory(id: string, idUtilisateur: string): Promise<UpdateResult> {
		return await storyRepository
			.createQueryBuilder()
			.softDelete()
			.where('id = :id and idUtilisateur = :idUtilisateur', { id, idUtilisateur })
			.execute();
	}
}
