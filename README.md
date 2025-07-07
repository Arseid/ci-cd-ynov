# ci-cd-ynov

Ce projet fullstack met en œuvre une architecture avec ReactJS, deux backends distincts (Flask/Python/MySQL/Adminer et ExpressJS/MongoDB) et une CI/CD.

- **Gestion des utilisateurs** : API Flask Python connectée à MySQL, visualisable via Adminer.
- **Gestion des posts** : API ExpressJS connectée à MongoDB (configurée dans le repo [ci-cd-ynov-back](https://github.com/Arseid/ci-cd-ynov-back)).
- **Frontend** : Application React consommant les deux APIs.

## Prérequis

- **Docker** installé ([télécharger Docker Desktop](https://www.docker.com/products/docker-desktop))
- **Node.js** (pour développement local ou tests hors Docker)
- **Cloner aussi le backend posts** :
  - [ci-cd-ynov-back](https://github.com/Arseid/ci-cd-ynov-back) (Express/MongoDB)

Vérifiez Docker :
```bash
docker -v
```

## Configuration

À la racine du projet, créez un fichier `.env` avec :
```env
# Backend Utilisateurs (Flask/MySQL)
MYSQL_HOST=db
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=ynov_ci
MYSQL_USER=your_user
REACT_APP_SERVER_BASE_URL=http://localhost:8000
REACT_APP_POSTS_SERVER_BASE_URL=http://localhost:5000
```
Adaptez les valeurs à votre environnement. Le port de l’API posts dépend de la config du repo `ci-cd-ynov-back`.

## Lancer les services

### 1. Backend Utilisateurs, Adminer, Frontend React
```bash
docker-compose -f docker-compose-python-server.yml up -d --build
```

### 2. Backend Posts (Express/MongoDB)
Suivez les instructions du repo [ci-cd-ynov-back](https://github.com/Arseid/ci-cd-ynov-back) pour lancer l’API Express/MongoDB.

## Accéder aux services
- **API Utilisateurs (Flask)** : [http://localhost:8000](http://localhost:8000)
- **API Posts (Express/MongoDB)** : [http://localhost:5000](http://localhost:5000)
- **Adminer** : [http://localhost:8080](http://localhost:8080) (utilisez les identifiants MySQL du `.env`)
- **Application React** : [http://localhost:3000](http://localhost:3000)

## Fonctionnalités principales
- **Utilisateurs** : inscription, connexion, suppression (API Flask/MySQL)
- **Posts** : création, affichage (API Express/MongoDB)

## Workflows CI/CD
Deux workflows GitHub Actions :

- **build_test.yml** :
  - Déclenché à chaque push/pull request sur `master`
  - Build, tests unitaires/intégration, e2e (Cypress), couverture (Codecov), génération de docs (JSDoc)
- **build_test_deploy_react.yml** :
  - Déclenché par un `repository_dispatch` (fin de pipeline du backend ci-cd-ynov-back)
  - Build, tests, e2e, couverture, génération de docs, déploiement (GitHub Pages & Vercel), publication NPM si version modifiée

## Lancer les tests
- **Unitaires & intégration** :
```bash
npm run test
```
- **End-to-end (Cypress)** :
```bash
npm run cypress
```

## Liens utiles
- Backend posts (Express/MongoDB) : [ci-cd-ynov-back](https://github.com/Arseid/ci-cd-ynov-back)
- Documentation générée : `/public/docs` après `npm run jsdoc`
