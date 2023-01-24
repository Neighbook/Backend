import { ClientSecretCredential } from '@azure/identity';
import { BlobServiceClient } from '@azure/storage-blob';

import { environnement } from '../../config/environnement';

const storage_account_name = environnement.azure.storage_account_name;

let client = null;
try {
	client = new BlobServiceClient(
        `https://${storage_account_name}.blob.core.windows.net`,
		new ClientSecretCredential(
			environnement.azure.tenant_id,
			environnement.azure.client_id,
			environnement.azure.client_secret
		)
	);
} catch (error) {
	console.log(`Error while creating vault client: ${error}`);
}

export const blob_storage_client = client;
