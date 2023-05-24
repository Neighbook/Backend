import { extension } from 'mime-types';

import { environnement } from '../../config/environnement';
import { SocialDataSource } from '../../core/datastores/typeorm_datastores';
import { Image } from '../../models/social/Image';
import { StorageService } from '../users_service/storage_service';

const ImageRepository = SocialDataSource.manager.getRepository(Image);

export class ImageService {
	static async putImage(idUtilisateur: string, idPost: string, file: Express.Multer.File): Promise<Image> {
		let image = new Image();
		image.url = 'url';
		image.idUtilisateur = idUtilisateur;
		image.idPost = idPost;
		image.mimetype = file.mimetype;
		image = await ImageRepository.save(image);
		const fileName = 'social_img_' + image.id + '.' + extension(image.mimetype);
		await StorageService.createFile(environnement.storage.bucket, fileName, file.buffer);
		const url = await StorageService.get_sas_url(environnement.storage.bucket, fileName);
		if (url) {
			image.url = url;
			image = await ImageRepository.save(image);
		}
		return image;
	}

	static async renewImageUrl(id: string): Promise<string> {
		let image = await ImageRepository.findOne({ where: { id: id } });
		if (!image) {
			throw new Error('Image not found');
		}
		const fileName = 'social_img_' + image.id + '.' + extension(image.mimetype);
		const url = await StorageService.get_sas_url(environnement.storage.bucket, fileName);
		if (url) {
			image.url = url;
			image = await ImageRepository.save(image);
		}
		return image.url;
	}

	static async deleteImage(id: string, idUtilisateur: string): Promise<any> {
		const image = await ImageRepository.findOne({ where: { id: id } });
		if (!image) {
			throw new Error('Image not found');
		}
		const fileName = 'social_img_' + image.id + '.' + extension(image.mimetype);
		await StorageService.deleteFile(environnement.storage.bucket, fileName);
		return await ImageRepository.createQueryBuilder()
			.softDelete()
			.where('id = :id and idUtilisateur = :idUtilisateur', { id, idUtilisateur })
			.execute();
	}
}
