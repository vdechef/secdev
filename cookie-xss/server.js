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

// ================================

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.get("/api/getcookie", (req, res) => {
    res.cookie("connectTime", Date.now(), { maxAge: 3600 * 1000 })
    res.send("Cookie set")
})

app.get("/api/checkcookie", (req, res) => {
    const cookie = req.cookies["connectTime"]
    res.send(`Your cookie: ${cookie}`)
})

app.get("/api/remarks", (req, res) => {
    const date = (new Date()).toISOString()
    const formattedDate = date.split(".")[0].replace("T", " ")
    res.json([
        {
            date: formattedDate,
            message: req.query.text
        }
    ])
})

// ================================

app.get('/', (req, res) => {
    res.send("<p>Use /api/getcookie to get a cookie</p> <p>Use /api/checkcookie to see if the cookie is set</p>")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

