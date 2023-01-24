import { ClientSecretCredential } from '@azure/identity';
import { BlobServiceClient } from '@azure/storage-blob';

import { environnement } from '../../config/environnement';

const key_vault_uri = environnement.azure.storage_account_name;

let client = null;
try {
	client = new BlobServiceClient(
		key_vault_uri,
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
