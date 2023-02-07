// Licensed under the MIT license.

/**
 * @summary Manage container and file of azure storage blob
 */
import { BlobSASPermissions } from '@azure/storage-blob';
import { Logger } from 'tslog';

import { environnement } from '../../config/environnement';
import { ts_logconfig } from '../../config/logger';
import { blob_storage_client } from '../../core/azure/blob_storage_client';

const logger = new Logger({ ...ts_logconfig, name: 'StoragetService' });

export class StorageService {
	static async healthCheck(): Promise<boolean> {
		if (!blob_storage_client) {
			logger.warn('Blob storage client not initialized');
			return false;
		}
		try {
			blob_storage_client.listContainers();
			return true;
		} catch (error) {
			logger.error(`Error while listing containers: ${error}`);
			return false;
		}
	}

	static async createContainer(containerName: string): Promise<boolean> {
		if (!blob_storage_client) {
			logger.warn('Blob storage client not initialized');
			return false;
		}
		let container = null;
		await blob_storage_client
			.createContainer(containerName.toLowerCase())
			.then((value) => {
				container = value;
			})
			.catch((error) => {
				logger.error(`Error while creating container ${containerName}: ${error}`);
			});
		return container != null;
	}

	static async getContainer(containerName: string): Promise<boolean> {
		if (!blob_storage_client) {
			logger.warn('Blob storage client not initialized');
			return false;
		}
		return blob_storage_client.getContainerClient(containerName) == null;
	}

	static async deleteContainer(containerName: string): Promise<boolean> {
		if (!blob_storage_client) {
			logger.warn('Blob storage client not initialized');
			return false;
		}
		let container = null;
		await blob_storage_client
			.deleteContainer(containerName)
			.then((value) => {
				container = value;
			})
			.catch((error) => {
				logger.error(`Error while deleting container ${containerName}: ${error}`);
			});
		return container != null;
	}

	static async createFile(
		containerName: string,
		fileName: string,
		buffer: Buffer | Blob | ArrayBuffer | ArrayBufferView,
		mimetype: string
	): Promise<boolean> {
		if (!blob_storage_client) {
			logger.warn('Blob storage client not initialized');
			return false;
		}
		let file = null;
		if (!environnement.storage_accepted_files_types.split(',').includes(mimetype.toLowerCase())) {
			logger.error(`File type ${fileName} not accepted`);
			return false;
		}
		await blob_storage_client
			.getContainerClient(containerName)
			.getBlockBlobClient(`${fileName.split('.')[1]}`)
			.uploadData(buffer, { blobHTTPHeaders: { blobContentType: mimetype } })
			.then((value) => {
				file = value;
			})
			.catch((error) => {
				logger.error(`Error while creating file ${fileName}: ${error}`);
			});
		return file != null;
	}

	static async deleteFile(containerName: string, fileName: string): Promise<boolean> {
		if (!blob_storage_client) {
			logger.warn('Blob storage client not initialized');
			return false;
		}
		let file = null;
		await blob_storage_client
			.getContainerClient(containerName)
			.getBlockBlobClient(fileName)
			.deleteIfExists()
			.then((value) => {
				file = value;
			})
			.catch((error) => {
				logger.error(`Error while deleting file ${fileName}: ${error}`);
			});
		return file != null;
	}

	static async get_sas_url(containerName: string, fileName: string): Promise<string | null> {
		if (!blob_storage_client) {
			logger.warn('Blob storage client not initialized');
			return null;
		}
		let sas_url = null;
		await blob_storage_client
			.getContainerClient(containerName)
			.getBlockBlobClient(fileName)
			.generateSasUrl({
				permissions: BlobSASPermissions.parse('r'),
				startsOn: new Date(),
				expiresOn: new Date(),
			})
			.then((value) => {
				sas_url = value;
			})
			.catch((error) => {
				logger.error(`Error while getting sas url for file ${fileName}: ${error}`);
			});
		return sas_url;
	}

	static async isContainerExist(containerName: string): Promise<boolean> {
		if (!blob_storage_client) {
			logger.warn('Blob storage client not initialized');
			return false;
		}
		let container = null;
		await blob_storage_client
			.getContainerClient(containerName)
			.exists()
			.then((value) => {
				container = value;
			})
			.catch((error) => {
				logger.error(`Error while checking if container ${containerName} exist: ${error}`);
			});
		return container != null;
	}
}
