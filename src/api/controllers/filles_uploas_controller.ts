import { Request, Response } from 'express';
import { Logger } from 'tslog';

import { ts_logconfig } from '../../config/logger';
import { StorageService } from '../../services/users_service/storage_service';

const logger = new Logger({ ...ts_logconfig, name: 'FileUploadController' });

export class FilesUploadController {
	static async uploadFile(req: Request, res: Response): Promise<void> {
		const containerName = req.params.container_name;
		const fileName = req.params.file_name;
		const content = req.file;
		if (!content) {
			res.status(400).json({ error: 'No file provided' });
			return;
		}
		if (!(await StorageService.isContainerExist(containerName))) {
			await StorageService.createContainer(containerName)
				.then((value) => {
					if (!value) {
						res.status(500).json({ error: 'Error while creating container' });
						return;
					}
				})
				.catch((error) => {
					logger.error(`Error while creating container ${containerName}: ${error}`);
					res.status(500).json({ error: 'Error while creating container' });
					return;
				});
		}
		StorageService.createFile(containerName, fileName, content.buffer, content.mimetype).then((value) => {
			if (!value) {
				res.status(500).json({ error: 'Error while creating file' });
				return;
			}
			StorageService.get_sas_url(containerName, fileName).then((value) => {
				if (!value) {
					res.status(500).json({ error: 'Error while getting file url' });
					return;
				}
				res.status(200).json({ file_url: value });
			});
		});
	}

	static async deleteFile(req: Request, res: Response): Promise<void> {
		const containerName = req.params.container_name;
		const fileName = req.params.file_name;
		const result = await StorageService.deleteFile(containerName, fileName);
		if (result) {
			res.status(200).send();
		} else {
			res.status(500).send();
		}
	}
}
