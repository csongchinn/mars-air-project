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
  if (!window.Cypress) return;

  const testState = Cypress.test?.state || (Cypress.currentTest && Cypress.currentTest.state);

  if (testState === "failed") {
    const screenshotsFolder = Cypress.config("screenshotsFolder");
    const screenshotName = `${Cypress.spec.name} -- ${Cypress.currentTest.title} (failed).png`;
    
    // Only attempt to read the file if we have a valid path
    cy.readFile(`${screenshotsFolder}/${Cypress.spec.name}/${screenshotName}`, "base64", { timeout: 0 }).then((imgData) => {
      if (imgData) {
        window.cucumberJson.attach(imgData, "image/png");
      }
    }).catch(() => {
      console.log("Screenshot not found for report attachment");
    });
  }
});