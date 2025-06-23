# ci-cd-ynov-yves-estrada

Ce projet fullstack ReactJS / Flask (Python) / MySQL / Adminer a été réalisé dans le cadre d’un projet sur l’intégration et le déploiement continus (CI/CD).
Il permet d’expérimenter le cycle de vie complet d’une application, de son développement local à l'exécution de tests automatisés et son déploiement via Docker.
Le backend expose une API en Python via Flask, connectée à une base de données MySQL.  
Le frontend est une application React consommant cette API.  
Adminer permet une visualisation simplifiée de la base de données.

## Prérequis

Avant de lancer le projet, assurez-vous d’avoir **Docker** installé sur votre machine.

Vérifiez sa présence avec :

```bash
docker -v
```

Si Docker n'est pas installé, vous pouvez le télécharger depuis [le site officiel de Docker](https://www.docker.com/products/docker-desktop).  

## Lancer les conteneurs Docker

1. Clonez le dépôt si ce n’est pas déjà fait :

```bash
git clone https://github.com/Arseid/ci-cd-ynov.git
cd ci-cd-ynov-yves-estrada
```

2. Créer un fichier `.env`  
   À la racine du projet, créez un fichier .env contenant les variables d’environnement nécessaires :
```env
# Configuration MySQL
MYSQL_HOST=db
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=your_database
MYSQL_USER=your_user

# Configuration React + Cypress
REACT_APP_SERVER_BASE_URL=http://localhost:8000
CYPRESS_TEST_ADMIN_EMAIL=your_test@example.com
CYPRESS_TEST_ADMIN_PASSWORD=your_123456
```
Remplacez les valeurs your_* par celles souhaitées.

3. Démarrer les conteneurs  
   Utilisez la commande suivante pour construire et lancer les services Docker :
```bash
docker-compose -f docker-compose-python-server.yml up -d --build
```

Cette commande va construire et démarrer les conteneurs définis dans le fichier `docker-compose-python-server.yml`.

## Accéder aux services
Une fois les conteneurs en cours d'exécution, vous pouvez accéder aux services suivants :  
- **API Flask** : [http://localhost:8000](http://localhost:8000)
- **Adminer** : [http://localhost:8080](http://localhost:8080) (utilisez les identifiants définis dans le fichier `.env` pour vous connecter)
- **MySQL** : Le service MySQL est accessible via Adminer ou tout autre client MySQL avec les mêmes identifiants.
- **Application React** : [http://localhost:3000](http://localhost:3000)

## Lancer les tests d'intégration, end-to-end et unitaires de l'application React
Pour lancer les tests d'intégration, end-to-end et unitaires, vous pouvez utiliser les commandes suivantes :
- Pour les tests d'intégration et unitaires :
```bash
npm run test
```
- Pour les tests end-to-end avec Cypress :
```bash
npm run cypress
```
