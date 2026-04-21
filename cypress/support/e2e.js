// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

afterEach(() => {
  const screenshotsFolder = Cypress.config("screenshotsFolder");
  if (window.Cypress && Cypress.test.state === "failed") {
    const screenshotName = `${Cypress.spec.name} -- ${Cypress.currentTest.title} (failed).png`;
    cy.readFile(`${screenshotsFolder}/${Cypress.spec.name}/${screenshotName}`, "base64").then((imgData) => {
      if (imgData) {
        cy.log("Attaching screenshot to Cucumber report");
        // This attaches the image to the JSON file
        window.cucumberJson.attach(imgData, "image/png");
      }
    });
  }
});