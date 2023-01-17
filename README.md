# Projet tutoré _backend server_

Bienvenue dans le _repository_ contenant le _backend_ du projet tutoré !

## Prérequis  pour bien démarer

- node installer, versions supportés : 12, 14, 16
- npm ou yarn, yarn de péference car plus performant
- disposer d'un seveur de base de donnée postgrsql en local ou en ligne


## Guide des commandes de gestion du projet

#### - `install` : installer les dependance du projet

  - Commande yarn

```bash
yarn install
```

  - Commande npm

```bash
npm install
```

#### - `build`  : compiler le projet (ici npx compile de ts a js et effectuer les optims)


  - Commande yarn

```bash
yarn build
```

  - Commande npm

```bash
```

  - Commande npm

```bash
npm run build
```

#### - `dev` : lancer le serveur d'application en mode dev


  - Commande yarn

```bash
yarn dev
```

  - Commande npm

```bash
npm run dev
```

#### - `start` : lancer le serveur d'application a partir du build

  - Commande yarn

```bash
yarn start
```

  - Commande npm

```bash
npm run start
```

#### - `build-clean` : supprimer l'ancienne version compile du projet et recrer un nouveau build

  - Commande yarn

```bash
yarn build-clean
```

  - Commande npm

```bash
npm run build-clean
```

#### - `swagger-gendoc` : generer le fichier de documentation de open api

  - Commande yarn

```bash
yarn swagger-gendoc
```

  - Commande npm

```bash
npm run swagger-gendoc
```

#### - `lint` : verifier la quqlite du code

  - Commande yarn

```bash
yarn lint
```

  - Commande npm

```bash
npm run lint
```

#### - `format` : formater le code avec pretier

  - Commande yarn

```bash
yarn format
```

  - Commande npm

```bash
npm run format
```

#### - `lint-fix` : verifier et corriger si possible les problemes de lint

  - Commande yarn

```bash
yarn lint-fix
```

  - Commande npm

```bash
npm run lint-fix
```

## Les variables d'environnement de l'api

Les variables d'environnement sont lu depuis votre environement d'os, pour les definir sur windows vous pouvez utiliser la commande `set` et sur linux `export` pour definir une variable d'environnement.

Exemple :

```bash
export API_NAME="Neighbook API"
```

Toutes les variables d'environnement sont optionnelles, si aucune variable n'est definie, les valeurs par defaut seront utilisées.

| Nom de la variable | Description | Valeur par defaut |
| --- | --- | --- |
| API_NAME | Nom de l'api | "api" |
| API_VERSION | Version de l'api | "1.0.0" |
| API_DESCRIPTION | Description de l'api | "api" |
| API_PORT | Port d'ecoute de l'api | 3000 |
| API_HOST | Host d'ecoute de l'api | "localhost" |
| API_BASE_PATH | Chemin de base de l'api | "/" |
| API_SCHEMES | Schema d'acces a l'api | "http" |
| API_SWAGGER | Activer ou non swagger | true |
| API_SWAGGER_PATH | Chemin d'acces a la documentation swagger | "/api-docs" |
| API_SWAGGER_JSON_PATH | Chemin d'acces au fichier json de la documentation swagger | "/api-docs.json" |
| API_SWAGGER_UI_PATH | Chemin d'acces a l'interface de la documentation swagger | "/api-docs-ui" |
| DATABASE_DIALECT | Le dialecte de la base de donnée | "postgres" |
| DATABASE_HOST | L'host de la base de donnée | "localhost" |
| DATABASE_PORT | Le port de la base de donnée | 5432 |
| DATABASE_USERNAME | Le nom d'utilisateur de la base de donnée | "postgres" |
| DATABASE_PASSWORD | Le mot de passe de la base de donnée | "postgres" |
| DATABASE_USER_DATABASE | Le nom de la base de donnée | "postgres" |
| LOGGING_LEVEL | Le niveau de log | "info" |
| LOGGING_FORMAT | Le format de log | "[:date[iso]] :level :message" |
| LOGGING_DATE_FORMAT | Le format de date de log | "YYYY-MM-DD HH:mm:ss" |
| LICENCE_NAME | Le nom de la licence | "MIT" |
| LICENCE_URL | Le lien de la licence | "https://opensource.org/licenses/MIT" |
