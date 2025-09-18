# Guide PostgreSQL pour le backend

Ce guide explique comment installer, configurer et utiliser PostgreSQL pour le projet backend.

## Installation de PostgreSQL (Ubuntu)

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo service postgresql start
```

## Connexion à PostgreSQL

- Avec l’utilisateur système :
  ```bash
  sudo -u postgres psql
  ```
- Ou avec mot de passe :
  ```bash
  psql -U postgres -h localhost
  ```

## Définir le mot de passe de l’utilisateur `postgres`

Dans le shell psql :
```sql
ALTER USER postgres WITH PASSWORD 'postgres';
```

## Création de la base de données

Dans le shell psql :
```sql
CREATE DATABASE cardgame_goodboybattle;
```

## Vérifier l’existence de la base

Dans le shell psql :
```sql
\l
```
ou
```sql
SELECT datname FROM pg_database;
```

## Configuration du backend

Dans le fichier de configuration TypeORM (`app.module.ts` ou `data-source.ts`) :
```js
host: 'localhost',
port: 5432,
username: 'postgres',
password: 'postgres',
database: 'cardgame_goodboybattle',
```
Ne pas ajouter l’option `ssl`.

## Lancer le backend

```bash
npm run start
```

---

Pour toute erreur ou question, vérifier les logs et la configuration, puis demander de l’aide si besoin.
