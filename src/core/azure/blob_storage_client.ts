import { ClientSecretCredential } from '@azure/identity';
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

import { environnement } from '../../config/environnement';

const account_connection_string = environnement.azure.storage_connection_string;

let client = null;
try {
	client = BlobServiceClient.fromConnectionString(account_connection_string);
} catch (error) {
	console.log(`Error while creating vault client: ${error}`);
}

export const blob_storage_client = client;
