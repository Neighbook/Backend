import { StorageService } from "../../services/users_service/storage_service";
import { Logger } from 'tslog';

const logger = new Logger({ name: 'FileUploadController' });

export class FilesUploadController {
    static async uploadFile(req: any, res: any): Promise<void> {
        const containerName = req.body.container_name;
        const fileName = req.body.file_name;
        const content = req
        logger.info(`Get body : ${containerName} ${fileName}`);
        console.log(content);
        if (!StorageService.getContainer(containerName)) {
            const resultCr = await StorageService.createContainer(containerName);
            if (!resultCr) {
                res.status(500).json({ error: 'Error while creating container' });
                return;
            }
        }
        const result = await StorageService.createFile(containerName, fileName, content);
        if (!result) {
            res.status(500).json({ error: 'Error while creating file' });
            return;
        }
        const file_url = await StorageService.get_sas_url(containerName, fileName);
        if (!file_url) {
            res.status(500).json({ error: 'Error while getting file url' });
            return;
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
