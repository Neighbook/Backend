// Licensed under the MIT license.

/**
 * @summary Get a secret from Azure Key Vault
 */

import { vault_client, generateSecret } from "../../core/azure/vault_client";
import { environnement } from "../../config/environnement";
import { KeyVaultSecret } from "@azure/keyvault-secrets";
import { nextTick } from "process";

export class VaultService {
    static async initialize(): Promise<void> {
        // create all vault keys
        if (!vault_client) {
            console.log("Vault client not initialized");
            return;
        }
        for (const key of environnement.vault_keys) {
            if (this.getSecret(key.name) === null) {
                const random_secret = await generateSecret(key.length, key.type === "hmac" ? "hmac" : "aes");
                await vault_client
                    .setSecret(key.name, random_secret)
                    .then((value: KeyVaultSecret | null) => {
                        if (value != null) {
                            console.log(`Vault key ${key.name} created`);
                        }
                    })
                    .catch((error) => {
                        console.log(`Error while creating vault key ${key.name}: ${error}`);
                    });
            }
        }
    }

    static async getSecret(secretName: string): Promise<KeyVaultSecret | null> {
        if (!vault_client) {
            console.log("Vault client not initialized");
            return null;
        }
        let secret: KeyVaultSecret | null = null;
        await vault_client
            .getSecret(secretName)
            .then((value: KeyVaultSecret | null) => {
                if (value != null) {
                    secret = value;
                }
            })
            .catch((error) => {
                console.log(`Error while getting secret ${secretName}: ${error}`);
            });

        return secret;
    }

    static async createKey(name: string, length: number, type = "hmac"): Promise<KeyVaultSecret | null> {
        if (!vault_client) {
            console.log("Vault client not initialized");
            return null;
        }
        let secret: KeyVaultSecret | null = null;
        const random_secret = await generateSecret(length, type === "hmac" ? "hmac" : "aes");
        await vault_client
            .setSecret(name, random_secret.toString())
            .then((value: KeyVaultSecret | null) => {
                if (value != null) {
                    secret = value;
                    console.log(`Key ${name} created`);
                }
            })
            .catch((error) => {
                console.log(`Error while creating key ${name}: ${error}`);
            });

        return secret;
    }
}
