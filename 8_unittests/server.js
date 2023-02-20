const app = require("./routes.js").app
const connectMysql = require("./routes.js").connectMysql
const disconnectMysql = require("./routes.js").disconnectMysql
const port = 3000

const server = app.listen(port, async () => {
    await connectMysql()
    console.log(`\nExample app listening on port ${port}\n`)
})

process.on('SIGINT', async () => {
    await disconnectMysql()
    server.close()
})
