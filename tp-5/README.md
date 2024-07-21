# TP5 - Mise en Place d'un Formulaire et Tests d'Intégration en JavaScript

## Objectifs

- Créer un formulaire en HTML et JavaScript.
- Mettre en place une API Express pour gérer les soumissions de formulaire.
- Écrire des tests d'intégration pour vérifier le bon fonctionnement de l'API.

## Pré-requis

- Node.js et npm installés.
- IDE ou éditeur de texte (comme Visual Studio Code).

## Commandes de Création du Projet

### Initialiser le projet

Créez un nouveau répertoire et initialisez votre projet :

```bash
mkdir tp-formulaire
cd tp-formulaire
npm init -y
```

Installer les Dépendances
Installez les dépendances nécessaires :

```bash
npm install express body-parser jest supertest --save-dev
```

Structure des Fichiers
Voici l'architecture de votre projet :

graphql

tp-formulaire/
├── node_modules/           # Modules installés via npm
├── public/                  # Fichiers accessibles publiquement
│   ├── index.html           # Fichier HTML avec le formulaire
│   └── app.js               # Script JavaScript pour gérer le formulaire
├── server.js                # Script du serveur Express
├── server.test.js           # Tests d'intégration
└── package.json              # Configuration du projet
Créer le Fichier index.html
Ajoutez ici le contenu de votre fichier index.html si nécessaire.

Ajouter un Script de Test dans package.json
Ajoutez le script de test :

```json
"scripts": {
    "test": "jest"
}
```

```bash
npm test
```

Démarrer le Serveur
Pour démarrer le serveur, utilisez :

```bash
node server.js
```

Pour executer le test selenium, il faut d'abord activer la commande ci-dessus pour activer le serveur. 

```bash
node seleniumTest.js
```