# Projet tutoré _backend server_

Bienvenue dans le _repository_ contenant le _backend_ du projet tutoré !

## Prérequis pour bien démarer

-   node installer, versions supportés : 18
-   npm ou yarn, yarn de péference car plus performant
-   disposer d'un seveur de base de donnée postgrsql en local ou en ligne

## Comment démarrer le projet

### 1. Cloner le projet

```bash
git clone https://github.com/Neighbook/Backend.git
```

### 2. Installer les dépendances

```bash
yarn install
```
Si vous n'avez pas yarn installer le en global avec la commande `npm install -g yarn`

Si vous n'avez pas npm installer le en global avec la commande `sudo apt install npm`

### 3. Configurer les variables d'environnement

Pour configurer les variables d'environnement, vous pouvez soit les definir dans un fichier `.env` a la racine du projet, soit les definir dans votre environement d'os.

Pour plus d'information sur les variables d'environnement, voir la section [Les variables d'environnement de l'api](#les-variables-denvironnement-de-lapi)

Exemple de fichier `.env` :

```.env
DATABASE_USER_DATABASE="pguser"
DATABASE_USER_PASSWORD="myPassword"
AZURE_CLIENT_ID="myClientId"
AZURE_CLIENT_SECRET="mySecret"
AZURE_TENANT_ID="myTenantId"
AZURE_KEY_VAULT_URI="https://myKeyVault.vault.azure.net/"
```

### 4. Genrer le fichier de documentation swagger

```bash
yarn swagger-gendoc
```

### 5. Lancer le serveur

```bash
yarn dev
```

## Guide des commandes de gestion du projet

#### - `install` : installer les dependance du projet

#### - `build` : compiler le projet (ici npx compile de ts a js et effectuer les optims)

#### - `dev` : lancer le serveur d'application en mode dev

#### - `start` : lancer le serveur d'application a partir du build

#### - `build-clean` : supprimer l'ancienne version compile du projet et recrer un nouveau build

#### - `swagger-gendoc` : generer le fichier de documentation de open api

#### - `lint` : verifier la quqlite du code

#### - `format` : formater le code avec pretier

#### - `lint-fix` : verifier et corriger si possible les problemes de lint

## Les variables d'environnement de l'api

Les variables d'environnement sont lu depuis votre environement d'os, pour les definir sur windows vous pouvez utiliser la commande `set` et sur linux `export` pour definir une variable d'environnement.

Exemple :

```bash
export API_NAME="Neighbook API"
```

Toutes les variables d'environnement sont optionnelles, si aucune variable n'est definie, les valeurs par defaut seront utilisées.


| Nom de la variable        | Description                                                | Valeur par defaut                      |
| ------------------------- | ---------------------------------------------------------- | -------------------------------------- |
| API_NAME                  | Nom de l'api                                               | "api"                                  |
| API_VERSION               | Version de l'api                                           | "1.0.0"                                |
| API_DESCRIPTION           | Description de l'api                                       | "api"                                  |
| API_PORT                  | Port d'ecoute de l'api                                     | 3000                                   |
| API_HOST                  | Host d'ecoute de l'api                                     | "localhost"                            |
| API_BASE_PATH             | Chemin de base de l'api                                    | "/"                                    |
| API_SCHEMES               | Schema d'acces a l'api                                     | "http"                                 |
| API_SWAGGER               | Activer ou non swagger                                     | true                                   |
| API_SWAGGER_PATH          | Chemin d'acces a la documentation swagger                  | "/api-docs"                            |
| API_SWAGGER_JSON_PATH     | Chemin d'acces au fichier json de la documentation swagger | "/api-docs.json"                       |
| API_SWAGGER_UI_PATH       | Chemin d'acces a l'interface de la documentation swagger   | "/api-docs-ui"                         |
| JWT_SECRET_KEY_NAME       | Nom de  clé secrete pour la signature des token JWT        | "jwtsecret"                            |
| JWT_TOKEN_EXPIRATION_TIME | Durée de vie des token                                     | "2 days"                               |
| JWT_TOKEN_ISSUER          | Nom de l'issuer des token JWT                              | "neighbook-api"                        |
| JWT_TOKEN_AUDIENCE        | Nom de l'audience des token JWT                            | "neighbook-api"                        |
| ARGON2_SECRET_KEY_NAME    | Nom de la clé secrete pour le hashage des mots de passe    | "argon2secret"                         |
| AZURE_CLIENT_ID           | Identifiant de l'application azure                         | "client_id"                            |
| AZURE_CLIENT_SECRET       | Secret de l'application                                    | "client_secret"                        |
| AZURE_TENANT_ID           | Identifiant du tenant azure                                | "tenant_id"                            |
| AZURE_KEY_VAULT_URI       | URI du key vault azure                                     | "key_vault_uri"                        |
| KEY_VAULT_SECRET_NAME     | Nom du secret dans le key vault                            | "secret_name"                          |
| KEY_VAULT_SECRET_TYPE     | Type du secret dans le key vault                           | "hmac"                                 |
| KEY_VAULT_SECRET_LENGTH   | Longueur du secret dans le key vault                       | 32                                     |
| DATABASE_DIALECT          | Type de base de données                                    | "postgres"                             |
| DATABASE_HOST             | Host de la base de données                                 | "localhost"                            |
| DATABASE_PORT             | Port de la base de données                                 | 5432                                   |
| DATABASE_SERVICE_USER     | Non de la base de donnee du service user                   | "pguser"                               |
| DATABASE_USERNAME         | Nom d'utilisateur de la base de données                    | "postgres"                             |
| DATABASE_PASSWORD         | Mot de passe de la base de données                         | "postgres"                             |
| LOGGING_LEVEL             | Niveau de log                                              | "info"                                 |
| LOGGING_FORMAT            | Format de log                                              | "dev"                                  |
| LOGGING_DATE_FORMAT       | Format de date de log                                      | "iso"                                  |
| LICENCE_NAME              | Nom de la licence                                          | "MIT"                                  |
| LICENCE_URL               | URL de la licence                                          | "https://spdx.org/licenses/MIT.html"   |
