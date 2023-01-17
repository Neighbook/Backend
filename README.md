# Projet tutoré _backend server_

Bienvenue dans le _repository_ contenant le _backend_ du projet tutoré !

## Prérequis  pour bien démarer

- node installer, versions supportés : 12, 14, 16
- npm ou yarn, yarn de péference car plus performant
- disposer d'un seveur de base de donnée postgrsql en local ou en ligne


## Guide des commandes de gestion du projet

### - `install` : installer les dependance du projet 

  - Command yarn
  
```bash
yarn install
```

  - Command npm

```bash
npm install
```

### - `build`  : compiler le projet (ici npx compile de ts a js et effectuer les optims)
### - `dev` : lancer le serveur d'application en mode dev
### - `start` : lancer le serveur d'application a partir du build
### - `build-clean` : supprimer l'ancienne version compile du projet et recrer un nouveau build
### - `swagger-gendoc` : generer le fichier de documentation de open api
### - `lint` : verifier la quqlite du code
### - `format` : formater le code avec pretier
### - `lint-fix` : verifier et corriger si possible les problemes de lint
