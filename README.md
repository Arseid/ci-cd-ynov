# ci-cd-ynov

This fullstack project implements an architecture with ReactJS and two distinct backends (Flask/Python/MySQL/Adminer and ExpressJS/MongoDB) and a CI/CD pipeline.

- **User management**: Flask Python API connected to MySQL, viewable via Adminer.
- **Post management**: ExpressJS API connected to MongoDB (configured in the [ci-cd-ynov-back](https://github.com/Arseid/ci-cd-ynov-back) repo).
- **Frontend**: React application consuming both APIs.

## Prerequisites

- **Docker** installed ([download Docker Desktop](https://www.docker.com/products/docker-desktop))
- **Node.js** (for local development or running tests outside Docker)
- **Clone the posts backend as well**:  
  - [ci-cd-ynov-back](https://github.com/Arseid/ci-cd-ynov-back) (Express/MongoDB)

Check Docker installation:
```bash
docker -v
```

## Configuration

At the root of the project, create a `.env` file with:
```env
# User Backend (Flask/MySQL)
MYSQL_HOST=db
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=ynov_ci
MYSQL_USER=your_user
REACT_APP_SERVER_BASE_URL=http://localhost:8000

# Posts Backend (Express/MongoDB)
REACT_APP_POSTS_SERVER_BASE_URL=http://localhost:5000
```
Adjust the values to your environment. The port for the posts API depends on the configuration in the `ci-cd-ynov-back` repo.

## Starting the services

### 1. User Backend, Adminer, React Frontend
```bash
docker-compose -f docker-compose-python-server.yml up -d --build
```

### 2. Posts Backend (Express/MongoDB)
Follow the instructions in the [ci-cd-ynov-back](https://github.com/Arseid/ci-cd-ynov-back) repo to start the Express/MongoDB API.

## Accessing the services

- **User API (Flask)**: [http://localhost:8000](http://localhost:8000)
- **Posts API (Express/MongoDB)**: [http://localhost:5000](http://localhost:5000)
- **Adminer**: [http://localhost:8080](http://localhost:8080) (use the MySQL credentials from your `.env`)
- **React Application**: [http://localhost:3000](http://localhost:3000)

## Main features

- **Users**: registration, login, deletion (Flask/MySQL API)
- **Posts**: creation, display (Express/MongoDB API)

## CI/CD Workflows

Two GitHub Actions workflows:

- **build_test.yml**:
  - Triggered on every push/pull request to `master`
  - Build, unit/integration tests, e2e (Cypress), coverage (Codecov), documentation generation (JSDoc)
- **build_test_deploy_react.yml**:
  - Triggered by a `repository_dispatch` (end of the backend ci-cd-ynov-back pipeline)
  - Build, tests, e2e, couverture, génération de docs, déploiement (GitHub Pages & Vercel), publication NPM si version modifiée

## Running tests

- **Unit & integration tests**:
```bash
npm run test
```
- **End-to-end (Cypress)**:
```bash
npm run cypress
```

## Useful links

- Posts backend (Express/MongoDB): [ci-cd-ynov-back](https://github.com/Arseid/ci-cd-ynov-back)
- Generated documentation: `/public/docs` after running `npm run jsdoc`
