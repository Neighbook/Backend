import { StorageService } from "../../services/users_service/storage_service";
import { Logger } from 'tslog';

const logger = new Logger({ name: 'FileUploadController' });

export class FilesUploadController {
    static async uploadFile(req: any, res: any): Promise<void> {
        const containerName = req.params.containerName;
        const fileName = req.params.fileName;
        const content = req.body;
        const result = await StorageService.createFile(containerName, fileName, content);
        if (!result) {
            res.status(500).send();
        }
        const file_url = await StorageService.get_sas_url(containerName, fileName);
        if (!file_url) {
            res.status(500).send();
        }
        res.status(200).json({ file_url: file_url });

    }

    static async deleteFile(req: any, res: any): Promise<void> {
        const containerName = req.params.containerName;
        const fileName = req.params.fileName;
        const result = await StorageService.deleteFile(containerName, fileName);
        if (result) {
            res.status(200).send();
        } else {
            res.status(500).send();
        }
    }
}