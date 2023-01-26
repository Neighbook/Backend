import { ClientSecretCredential } from '@azure/identity';
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

import { environnement } from '../../config/environnement';

const storage_account_name = environnement.azure.storage_account_name;
const account_key = environnement.azure.storage_account_key;

const sharedKeyCredential = new StorageSharedKeyCredential(storage_account_name, storage_account_name);

let client = null;
try {
	client = new BlobServiceClient(
        `https://${storage_account_name}.blob.core.windows.net`,
        new StorageSharedKeyCredential(storage_account_name, storage_account_name)
	);
} catch (error) {
	console.log(`Error while creating vault client: ${error}`);
}

export const blob_storage_client = client;
