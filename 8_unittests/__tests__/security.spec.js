const request = require("supertest")
const app = require("../routes.js").app
const connectMysql = require("../routes.js").connectMysql
const disconnectMysql = require("../routes.js").disconnectMysql

// tokens, valid until 2040
const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjIyMTYyMzkwMjJ9.q6k_oiYHbHyvIbhzli6lUptNBATCzk7O4WZ9iHIcs-E"
const USER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiaWF0IjoyMjE2MjM5MDIyfQ.C-HoPLIcllfeHVpeZX6PAp4Y2eIBh7YOBePnnuzVKsA"

// ===================
// ATTENTION :
// ces tests sont désactivés car il s'agit simplement d'un exemple
// Les roles et utilisateurs ne sont pas définis dans le code de cet exercice.
// Ils seraient toutefois applicables sur l'exercice "a_permissions", si vous voulez essayer de les implémenter.
describe.skip("Security", () => {

    beforeEach(async () => {
        await connectMysql()
    })
    afterEach(async () => {
        await disconnectMysql()
    })

    describe("Authorizations", () => {
        it("should allow Admin to list all users", async () => {
            const res = await request(app).get("/users").set({ Authorization: `Bearer ${ADMIN_TOKEN}` })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toMatchSnapshot()
        })
        it("should prevent User from listing all users", async () => {
            const res = await request(app).get("/users").set({ Authorization: `Bearer ${USER_TOKEN}` })
            expect(res.statusCode).toEqual(401)
            expect(res.text).toBe("Unauthorized")
        })
    })
})
