Pour installer la BDD
- docker run --detach --name sqlidb -p 5000:3306 --env MARIADB_USER=mdbuser --env MARIADB_PASSWORD=mdbpassword --env MARIADB_ROOT_PASSWORD=mdbroot  mariadb:latest

Pour réinitialiser le contenu de la BDD
- docker exec -i sqlidb mysql -u root -pmdbroot < init.sql

Pour démarrer la BDD les fois suivantes
- docker start sqlidb

Pour démarrer le serveur
- npm i
- npm run dev
- ouvrir http://localhost:3000 dans Firefox
