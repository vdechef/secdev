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

// =============== cookie =================

const uuid = require("uuid").v4
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.get("/api/getcookie", (req, res) => {
    res.cookie("sessionId", uuid(), { maxAge: 3600 * 1000 })
    res.send("Cookie set")
})

app.get("/api/checkcookie", (req, res) => {
    const cookie = req.cookies["sessionId"]
    res.send(`Your cookie: ${cookie}`)
})

// =============== CSRF =================

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/api/remarks", (req, res) => {
    console.log("=> received post:", req.body.text)
    const cookie = req.cookies["sessionId"]
    if (cookie) {
        res.send(`CSRF réussi : le cookie 'sessionId' a bien été reçu par le serveur (${cookie})`)
    }
    else {
        res.send("CSRF échoué : le cookie 'sessionId' n'a pas été transmis au serveur")
    }
})

// ================================

app.get('/', (req, res) => {
    res.send(`
        <br>
        <p>Use <a href="/api/getcookie">/api/getcookie</a> to get a cookie</p> 
        <br>
        <p>Use <a href="/api/checkcookie">/api/checkcookie</a> to see if the cookie is set</p> 
        <br>
        <p>Use <a href="/csrf.html">/csrf.html</a> to check that cookie is transmitted from a trusted domain</p>
        <br>
        <p>Copy csrf.html content on <a href="https://codepen.io/tinymce/pen/QWNpjbg">https://codepen.io/tinymce/pen/QWNpjbg</a> to test the real CSRF attack</p> 
    `)
})

app.listen(port, () => {
    console.log(`\nExample app listening on port ${port}\n`)
})

