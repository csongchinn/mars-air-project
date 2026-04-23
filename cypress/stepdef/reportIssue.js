import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

When('The user log an issue with {string} {string} and {string}', (title, description, severity) => {
    cy.get('input#title').clear().type(title);
    cy.get('textarea#description').clear().type(description);
    cy.get('#severity').select(`${severity}`);
    cy.get('input[type="submit"][value="Create"]').should('be.visible').click();
});

When('The user should see the issue has been logged with {string} and {string}', (title, severity) => {
    cy.get('body').then(($body) => {
        if ($body.text().includes('This issue has already been reported.')) {
            throw new Error('❌ This issue has already been reported.')
        }
    })
    let found = false
    cy.get('#issues tbody tr')
        .each(($row) => {
            found ||= $row.text().includes(title) && $row.text().includes(severity)
        })
        .then(() => {
            if (!found) throw new Error(`❌ Issue was not reported.`)
        })
    cy.screenshot('issue-report-result');
});


