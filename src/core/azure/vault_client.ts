import { ClientSecretCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';
import { generateKeySync } from 'crypto';
import { Logger } from 'tslog';

import { environnement } from '../../config/environnement';

const logger = new Logger({ name: 'SecretClient' });
const key_vault_uri = environnement.azure.key_vault_uri;

let client = null;
try {
	client = new SecretClient(
		key_vault_uri,
		new ClientSecretCredential(
			environnement.azure.tenant_id,
			environnement.azure.client_id,
			environnement.azure.client_secret
		)
	);
} catch (error) {
	logger.error(`Error while creating vault client: ${error}`);
}

export const vault_client = client;

export async function generateSecret(length: number, type: 'hmac' | 'aes'): Promise<string> {
	const random_secret = generateKeySync(type, { length: length });
	return random_secret.export().toString('hex');
}
