# Projet tutoré _backend server_

Bienvenue dans le _repository_ contenant le _backend_ du projet tutoré !

Pour l'instant, celui-ci ne contient que le tempalte de base d'une serveur node js avec express. Javascript a été remplacé par Typescript.

## Commandes de démarrage

Pour lancer le serveur de dev `npm run dev`, le serveur a été configuré pour tourner sur le port 30000, si vous le changez merci de le changer également dans le README.md.

Pour faire un build `npm run build`, la commande créera un dossier `dist` avec les fichiers ts compilé en js.

Pour lancer le serveur de prod `npm start`, la commande éxécutera le fichier `app.js` dans le dossier `dist`, n'oubliez pas de build avant sinon cela ne marchera pas.
