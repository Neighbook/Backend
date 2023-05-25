[![Prettier format check](https://github.com/Neighbook/Backend/actions/workflows/prettier_format.yml/badge.svg)](https://github.com/Neighbook/Backend/actions/workflows/prettier_format.yml) [![Eslint rules](https://github.com/Neighbook/Backend/actions/workflows/eslint_check.yml/badge.svg)](https://github.com/Neighbook/Backend/actions/workflows/eslint_check.yml)  [![Documentation OpenApi](https://github.com/Neighbook/Backend/actions/workflows/doc.yml/badge.svg)](https://github.com/Neighbook/Backend/actions/workflows/doc.yml)  [![Auto deployment for api dev](https://github.com/Neighbook/Backend/actions/workflows/api-nh-dev-server-AutoDeployTrigger-21d2a4b3-bc36-48db-a917-073d48ac215a.yml/badge.svg)](https://github.com/Neighbook/Backend/actions/workflows/api-nh-dev-server-AutoDeployTrigger-21d2a4b3-bc36-48db-a917-073d48ac215a.yml)

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

### 2. Mehode docker

```bash
docker-compose up
```

### 3. Mehode classique



#### 3.1. Installer les dépendances

```bash
yarn install
```
Si vous n'avez pas yarn installer le en global avec la commande `npm install -g yarn`

Si vous n'avez pas npm installer le en global avec la commande `sudo apt install npm`

#### 3.2. Configurer les variables d'environnement

Pour configurer les variables d'environnement, vous pouvez soit les definir dans un fichier `.env` a la racine du projet, soit les definir dans votre environement d'os.

Pour plus d'information sur les variables d'environnement, voir la section [Les variables d'environnement de l'api](#les-variables-denvironnement-de-lapi)

Exemple de fichier `.env` :

```.env
LOGGING_LEVEL="debug"
DATABASE_HOST="localhost"
DATABASE_USER="postgres"
POSTGRES_PASSWORD="postgres"
DATABASE_PASSWORD="postgres"
DATABASE_SERVICE_USER="users"
DATABASE_SERVICE_SOCIAL="social"
DATABASE_SERVICE_MESSAGE="messagerie"
DATABASE_SERVICE_MARKETPLACE="marketplace"
DATABASE_PORT="5432"
MINIO_ENDPOINT="localhost"
MINIO_PUBLIC_URL=http://localhost:9000
MINIO_PORT=9000
MINIO_ACCESS_KEY=minio
MINIO_SECRET_KEY=miniominio
DATABASE_SYNCHRONIZE="true"
DATABASE_USE_SSL="true"
API_HOST="localhost"
API_PORT="3000"
```

### 4. Genrer le fichier de documentation swagger

Cette commande n'est plus necessaire avant d'executer la commande de lancement du serveur en dev.

```bash
yarn swagger-gendoc
```

### 5. Lancer le serveur

```bash
yarn dev
```

##

## Guide des commandes de gestion du projet

#### - `install` : installer les dependance du projet

#### - `build` : compiler le projet (ici npx compile de ts a js et effectuer les optim
#### - `dev` : lancer le serveur d'application en mode dev (avec nodemon) et recompiler le projet a chaque modification ainsi que la documentation swagger

#### - `start` : lancer le serveur d'application a partir du build

#### - `build:clean` : supprimer l'ancienne version compile du projet et recrer un nouveau build

#### - `openapi:gen` : generer le fichier de documentation de open api

#### - `lint` : verifier la quqlite du code

#### - `format` : formater le code avec pretier

#### - `format:check` : verifier si le code est bien formater

#### - `lint:fix` : verifier et corriger si possible les problemes de lint

#### - `spell:check` : verifier l'orthographe du code



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
| DATABASE_DIALECT          | Type de base de données                                    | "postgres"                             |
| DATABASE_HOST             | Host de la base de données                                 | "localhost"                            |
| DATABASE_PORT             | Port de la base de données                                 | 5432                                   |
| DATABASE_SERVICE_USER     | Non de la base de donnee du service user                   | "pguser"                               |
| DATABASE_USER             | Nom d'utilisateur de la base de données                    | "postgres"                             |
| DATABASE_PASSWORD         | Mot de passe de la base de données                         | "postgres"                             |
| LOGGING_LEVEL             | Niveau de log                                              | "info"                                 |
| LOGGING_FORMAT            | Format de log                                              | "dev"                                  |
| LOGGING_DATE_FORMAT       | Format de date de log                                      | "iso"                                  |
| LICENCE_NAME              | Nom de la licence                                          | "MIT"                                  |
| LICENCE_URL               | URL de la licence                                          | "https://spdx.org/licenses/MIT.html"   |
