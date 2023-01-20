// Licensed under the MIT license.

/**
 * @summary Get a secret from Azure Key Vault
 */

import { EnvironmentCredential, ClientSecretCredential } from "@azure/identity";
import { KeyClient } from "@azure/keyvault-keys";
import { environnement } from "../../config/environnement";


export class VaultService {
	private keyClient: KeyClient;

	constructor() {
		const credential = new ClientSecretCredential(environnement.azure.tenant_id,
																									environnement.azure.client_id,
																									environnement.azure.client_secret);

		const key_vault_uri = environnement.azure.key_vault_uri;
		this.keyClient = new KeyClient(key_vault_uri, credential);
	}

	public async initialize(): Promise<void> {
		let tests = null;
		await this.keyClient.getKey(environnement.jwt_secret_key_name).then((secret) => {
			if (secret == null) {
				this.keyClient.createKey(environnement.jwt_secret_key_name, "EC");
			}
		}).catch((error) => {
			console.log(error);
			this.keyClient.createKey(environnement.jwt_secret_key_name, "EC");
		});
	}

	public async getSecret(secretName: string): Promise<string | null> {
		const secret = await this.keyClient.getKey(secretName);
		if (secret == null) {
			return null;
		}
		return secret.name;
	}

	public async createToken(name: string, type: string): Promise<string | null> {
		const secret = await this.keyClient.createKey(name, type);
		if (secret == null) {
			return null;
		}
		return secret.name;
	}

}