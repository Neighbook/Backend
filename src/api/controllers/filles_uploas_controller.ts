import { Request, Response } from 'express';

import { environnement } from '../../config/environnement';
import { StorageService } from '../../services/users_service/storage_service';

export class FilesUploadController {
	static async uploadFile(req: Request, res: Response): Promise<void> {
		const fileName = req.params.file_name;
		const content = req.file;
		if (!content) {
			res.status(400).json({ error: 'No file provided' });
			return;
		}

		StorageService.createFile(environnement.storage.bucket, fileName, content.buffer).then((value) => {
			if (!value) {
				res.status(500).json({ error: 'Error while creating file' });
				return;
			}
			StorageService.get_sas_url(environnement.storage.bucket, fileName).then((value) => {
				if (!value) {
					res.status(500).json({ error: 'Error while getting file url' });
					return;
				}
				res.status(200).json({ file_url: value });
			});
		});
	}

	static async getFile(req: Request, res: Response): Promise<void> {
		const fileName = req.params.file_name;

		StorageService.get_sas_url(environnement.storage.bucket, fileName).then((value) => {
			if (!value) {
				res.status(500).json({ error: 'Error while getting file url' });
				return;
			}
			res.status(200).json({ file_url: value });
		});
	}

	static async deleteFile(req: Request, res: Response): Promise<void> {
		const fileName = req.params.file_name;
		const result = await StorageService.deleteFile(environnement.storage.bucket, fileName);
		if (result) {
			res.status(200).send();
		} else {
			res.status(500).send();
		}
	}
}
