/// <reference types="cypress" />

import { fetchUK } from "../../src/fetch_uk";

context("Fetching UK Sanction List ", () => {
  it("should return a response with correct body", () => {
    const fetchedData = fetchUK();
    cy.wrap(fetchedData, { timeout: 25000 }).then((response) => {
      expect(response).to.be.a("array");
      expect(response[0]).to.have.property("Country");
      expect(response).to.have.length.above(10000);
    });
  });
});
