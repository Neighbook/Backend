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
		image = await ImageRepository.save(image);
		const fileName = 'social_img_' + image.id;
		await StorageService.createFile('profilec', fileName, file.buffer, file.mimetype);
		const url = await StorageService.get_sas_url('profilec', fileName);
		if (url) {
			image.url = url;
			image = await ImageRepository.save(image);
		}
		return image;
	}

	static async renewImageUrl(id: string): Promise<string> {
		let image = new Image();
		image.id = id;
		const fileName = 'social_img_' + image.id;
		const url = await StorageService.get_sas_url('profilec', fileName);
		if (url) {
			image.url = url;
			image = await ImageRepository.save(image);
		}
		return image.url;
	}

	static async deleteImage(id: string, idUtilisateur: string): Promise<any> {
		await StorageService.deleteFile('profilec', 'social_img_' + id);
		return await ImageRepository.createQueryBuilder()
			.softDelete()
			.where('id = :id and idUtilisateur = :idUtilisateur', { id, idUtilisateur })
			.execute();
	}
}
