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

app.get('/api/getdata', async (req, res) => {
    const search = req.query.search || ""
    try {
        const rows = await db.query("SELECT id, name, age FROM user WHERE name LIKE '%" + search + "%' ORDER BY id;")
        res.send(rows)
    }
    catch (err) {
        res.status(500).send("Error: " + err.message)
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
