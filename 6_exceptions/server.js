/**
 * 
 */

const express = require('express')
const app = express()
const port = 3000

// servir les fichiers statiques dans le répertoire /public
app.use(express.static('public'))

// désactivation du cache pour éviter les soucis lors des exercices
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
})

// =============== mysql =================

// Pour installer et initialiser docker avant de lancer l'exercice :
//      docker run --detach --name sqlidb -p 5000:3306 --env MARIADB_USER=mdbuser --env MARIADB_PASSWORD=mdbpassword --env MARIADB_ROOT_PASSWORD=mdbroot  mariadb:latest
//      docker exec -i sqlidb mysql -u root -pmdbroot < init.sql

const mysql = require('promise-mysql')
let db = null

async function connectMysql() {
    db = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'mdbroot',
        port: 5000,
        database: "sqlidb"
    })
    return !!db
}

async function disconnectMysql() {
    let result = null
    if (db) result = await db.end()
    return result
}

// =============== error handling =================

class ForbiddenValueError extends Error {
    constructor(message) {
        super(message)
    }
}
class AuthenticationError extends Error {
    constructor(message) {
        super(message)
    }
}

function errorHandler(err, res) {
    if (err instanceof ForbiddenValueError) {
        console.error("Erreur valeur interdite", err.message)
        console.log("Erreur valeur interdite (details)", err.stack)
        res.status(400).send("Erreur valeur interdite: " + err.message)
    }
    else if (err instanceof AuthenticationError) {
        console.error("Erreur d'authentification", err.message)
        res.status(401).send("Utilisateur non connecté")
    }
    else if (err.sql) {
        console.error("Erreur sql", err.sqlMessage)
        console.log("Erreur sql (details)", err.sql)
        res.status(500).send("Erreur générique pour éviter a fuite de données")
    }
    else {
        console.error("Erreur inconnue", err.message)
        console.log("Erreur inconnue details", err.stack)
        res.status(500).send("Erreur inconnue")
    }
}

app.get('/api/getdata', async (req, res) => {
    try {
        const search = req.query.search || ""
        if (search === "toto") {
            throw new ForbiddenValueError("Toto n'a pas de baskettes")
        }
        if (search === "bob") {
            throw new Error("Ce message d'erreur contient le secret de Bob. Il ne doit surtout pas s'afficher")
        }
        const rows = await db.query("SELECT id, name, age FROM user WHERE name LIKE '%" + search + "%' ORDER BY id;")
        res.send(rows)
    }
    catch (err) {
        errorHandler(err, res)
    }
})

// ================================

app.get('/', (req, res) => {
    res.send(`
        <br>
        <p>Use <a href="/api/getdata?search=al">/api/getdata?search=&lt;value to search&gt;</a> to retrieve user data</p>
    `)
})

const server = app.listen(port, async () => {
    await connectMysql()
    console.log(`\nExample app listening on port ${port}\n`)
})

process.on('SIGINT', async () => {
    await disconnectMysql()
    server.close()
})
