import { BlobServiceClient } from '@azure/storage-blob';
import { Logger } from 'tslog';

import { environnement } from '../../config/environnement';

const logger = new Logger({ name: 'BlobServiceClient' });

const account_connection_string = environnement.azure.storage_connection_string;

let client = null;
try {
	client = BlobServiceClient.fromConnectionString(account_connection_string);
} catch (error) {
	logger.error(`Error while creating vault client: ${error}`);
}

export const blob_storage_client = client;
