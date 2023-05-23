// Licensed under the MIT license.

/**
 * @summary Manage container and file of azure storage blob
 */
import { Client } from 'minio';
import { Logger } from 'tslog';

import { environnement } from '../../config/environnement';
import { ts_logconfig } from '../../config/logger';

const logger = new Logger({ ...ts_logconfig, name: 'StoragetService' });

const minioClient = new Client({
	endPoint: environnement.storage.host,
	port: environnement.storage.port,
	useSSL: environnement.storage.useSSL,
	accessKey: environnement.storage.accessKey,
	secretKey: environnement.storage.secretKey,
});

export class StorageService {
	static async healthCheck(): Promise<boolean> {
		if (!(await minioClient.bucketExists('neighbook'))) {
			logger.warn('Blob storage client not initialized');
			return false;
		}
		return true;
	}

	static async createContainer(containerName: string): Promise<boolean> {
		let container = null;
		await minioClient
			.makeBucket(containerName.toLowerCase())
			.then((value) => {
				container = value;
			})
			.catch((error) => {
				logger.error(`Error while creating container ${containerName}: ${error}`);
			});
		return container != null;
	}

	static async deleteContainer(containerName: string): Promise<boolean> {
		let container = null;
		await minioClient
			.removeBucket(containerName)
			.then((value) => {
				container = value;
			})
			.catch((error) => {
				logger.error(`Error while deleting container ${containerName}: ${error}`);
			});
		return container != null;
	}

	static async createFile(containerName: string, fileName: string, buffer: Buffer): Promise<boolean> {
		const result = await minioClient.putObject(containerName, fileName, buffer);
		return result.etag != null;
	}

	static async deleteFile(containerName: string, fileName: string): Promise<boolean> {
		return (await minioClient.removeObject(containerName, fileName)) == null;
	}

	static async get_sas_url(containerName: string, fileName: string): Promise<string | null> {
		return await minioClient.presignedGetObject(containerName, fileName);
	}

	static async isContainerExist(containerName: string): Promise<boolean> {
		return await minioClient.bucketExists(containerName);
	}

	static async initialize(containerName: string): Promise<void> {
		if (!(await StorageService.isContainerExist(containerName))) {
			await StorageService.createContainer(containerName);
		}
	}
}
