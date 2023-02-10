import {SocialDataSource} from '../../core/datastores/typeorm_datastores';
import {Image} from '../../models/social/Image';
import {StorageService} from '../users_service/storage_service';

const ImageRepository = SocialDataSource.manager.getRepository(Image);

export class ImageService {
    static async putImage(idUtilisateur: string, file: Express.Multer.File): Promise<any> {
        let image = new Image();
        image.url = 'url';
        image.idUtilisateur = idUtilisateur;
        image = await ImageRepository.save(image);
        const fileName = 'social_img_' + image.id;
        await StorageService.createFile('profilec', fileName, file.buffer, file.mimetype);
        const url = await StorageService.get_sas_url('profilec', fileName);
        if(url){
            image.url = url;
            await ImageRepository.save(image);
        }
        return url;
    }

    static async deleteImage(id: string, idUtilisateur: string): Promise<any> {
        await StorageService.deleteFile('profilec', 'social_img_' + id);
        return await ImageRepository.createQueryBuilder()
            .softDelete()
            .where('id = :id and idUtilisateur = :idUtilisateur', { id, idUtilisateur })
            .execute();
    }
}
