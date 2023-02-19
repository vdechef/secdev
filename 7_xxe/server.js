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

// =============== XXE =================

const libxml = require("libxmljs")
const fileUpload = require("express-fileupload")
app.use(fileUpload())

app.post("/api/uploadxml", (req, res) => {
    if (!req.files || !req.files.xml) {
        res.send("Aucun fichier envoyé")
    }
    else {
        const file = req.files.xml
        console.log("=> received xml:", file.name)
        const strData = file.data.toString()
        const xmlDoc = libxml.parseXml(strData, { noent: true })
        res.send(`<p style="white-space: pre;">${xmlDoc.root().text()}</p>`)
    }
})

// ================================

app.get('/', (req, res) => {
    res.send(`
        <br>
        <p>Use <a href="/xxe.html">/xxe.html</a> to try an XXE attack</p>
    `)
})

app.listen(port, () => {
    console.log(`\nExample app listening on port ${port}\n`)
})

