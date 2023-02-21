const request = require("supertest")
const app = require("../routes.js").app
const connectMysql = require("../routes.js").connectMysql
const disconnectMysql = require("../routes.js").disconnectMysql

describe("Endpoints", () => {

    beforeEach(async () => {
        await connectMysql()
    })
    afterEach(async () => {
        await disconnectMysql()
    })

    describe("Get", () => {
        it("should return home page", async () => {
            const res = await request(app).get("/")
            expect(res.statusCode).toEqual(200)
            expect(res.body).toMatchSnapshot()
        })
        it("should return all users when no search string provided", async () => {
            const res = await request(app).get("/api/getdata?search=")
            expect(res.statusCode).toEqual(200)
            expect(res.body.length).toBe(5)
            expect(res.body).toMatchSnapshot()
        })
        it("should filter using search param", async () => {
            const res = await request(app).get("/api/getdata?search=al")
            expect(res.statusCode).toEqual(200)
            expect(res.body.length).toBe(2)
            expect(res.body).toMatchSnapshot()
        })
    })

    describe("Error handling", () => {
        it("should return generic message on SQL error", async () => {
            const res = await request(app).get("/api/getdata?search=al'")
            expect(res.statusCode).toEqual(500)
            expect(res.text).toMatchSnapshot()
        })
        it("should return dedicated message for toto", async () => {
            const res = await request(app).get("/api/getdata?search=toto")
            expect(res.statusCode).toEqual(400)
            expect(res.text).toMatchSnapshot()
        })
        it("should return dedicated message when forbidden", async () => {
            const res = await request(app).get("/api/getdata?search=bob")
            expect(res.statusCode).toEqual(500)
            expect(res.text).toMatchSnapshot()
        })
    })

})
