describe("Get Endpoints", () => {
    it("can open xss page", () => {
        // open first page
        cy.visit("http://localhost:3000")
        
        // find xss link and click it
        cy.get("[data-cy='xssPage']").click()

        // find textarea and set text into it
        cy.get("textarea").type("mon texte")
        // click on button to send
        cy.contains("Envoyer").click()
        // check that message is displayed
        cy.get("[data-cy='rowMessage']", { timeout: 2000 }).should("have.length", 1)
        cy.get("[data-cy='rowMessage']").first().contains("mon text").should("exist")

        // find textarea and set text into it
        cy.get("textarea").clear().type("un autre message")
        // click on button to send
        cy.contains("Envoyer").click()
        // check that message is displayed
        cy.get("[data-cy='rowMessage']", { timeout: 2000 }).should("have.length", 2)
        cy.get("[data-cy='rowMessage']").first().contains("mon text").should("exist")
        cy.get("[data-cy='rowMessage']").eq(1).contains("un autre message").should("exist")
    })
})