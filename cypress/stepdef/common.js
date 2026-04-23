import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

Given('The user is on {string} page', (pageName) => {

    switch (pageName) {
        case "Home":
            cy.visit('https://marsair.recruiting.thoughtworks.net/SongChinn');
            cy.url().should('include', '/SongChinn');
            break;

        case "Report an issue":
            cy.visit('https://marsair.recruiting.thoughtworks.net/SongChinn/report');
            cy.url().should('include', '/SongChinn/report');
            break;

        case "Problem definition":
            cy.visit('https://marsair.recruiting.thoughtworks.net/mission.html');
            cy.url().should('include', '/mission');
            break;

        case "View open issues":
            cy.visit('https://marsair.recruiting.thoughtworks.net/SongChinn/issues')
    }
});

Then('The {string} is displayed', (displayType) => {
    switch (displayType) {
        case "Book a ticket to the red planet now!":
            cy.get('form[action="/SongChinn"] h3')
                .should('be.visible')
                .and('contain.text', 'Book a ticket to the red planet now!')
            break;

        case "MarsAir logo":
            cy.get('h1 a')
                .should('be.visible')
                .and('contain.text', 'MarsAir')
                .and('have.attr', 'href', '/SongChinn');
            break;

        case "Navigation Links":
            cy.get('li.links ')
                .eq(0)
                .find('a')
                .should('be.visible')
                .and('contain.text', 'Report an issue')
                .and('have.attr', 'href', '/SongChinn/report');

            cy.get('li.links')
                .eq(1)
                .find('a')
                .should('be.visible')
                .and('contain.text', 'Problem definition')
                .and('have.attr', 'href', '/mission.html');

            cy.get('li.links')
                .eq(2)
                .find('a')
                .should('be.visible')
                .and('contain.text', 'Privacy Policy')
                .and('have.attr', 'href', 'https://www.thoughtworks.com/privacy-policy')
                .and('have.attr', 'target', '_blank');
            break;

        case "Search flight form":
            cy.get('div#content').should('be.visible');
            cy.get('div#content h2').should('be.visible').and('contain.text', 'Welcome to MarsAir!');
            cy.get('label[for="departing"]').should('be.visible').and('contain.text', 'Departing');
            cy.get('#departing option:selected').should('have.text', 'Select...');
            cy.get('label[for="returning"]').should('be.visible').and('contain.text', 'Returning');
            cy.get('#returning option:selected').should('have.text', 'Select...');
            cy.get('label[for="promotional_code"]').should('be.visible').and('contain.text', 'Promotional Code');
            cy.get('input[type="submit"][value="Search"]').should('be.visible');
            break;

        case "Report form":
            cy.get('div#content h2').should('be.visible').and('contain.text', 'New issue report');
            cy.get('a[href="/SongChinn/issues"]').should('be.visible').and('contain.text', 'View open issues');
            cy.get('label[for="title"]').should('be.visible').and('contain.text', 'Title');
            cy.get('label[for="description"]').should('be.visible').and('contain.text', 'Description');
            cy.get('label[for="severity"]').should('be.visible').and('contain.text', 'Severity');
            cy.get('#severity option:selected').should('have.text', 'Select...');
            cy.get('input[type="submit"][value="Create"]').should('be.visible');
            cy.get('p a').should('be.visible').and('contain.text', 'Back').and('have.attr', 'href');
            break;

        case "Issues form":
            cy.get('div#content h2').should('be.visible').and('contain.text', 'Open Issues');
            cy.get('table#issues')
                .find('tr')
                .first()
                .within(() => {
                    ['ID', 'Title', 'Severity', 'Actions'].forEach((header) => {
                        cy.contains('th', header).should('exist');
                    });
                });
            cy.get('p a').should('be.visible').and('contain.text', 'Back').and('have.attr', 'href');
            break;

    }
});

Then('The user clicks on {string}', (buttonType) => {
    switch (buttonType) {
        case "Report an issue":
            cy.get('a[href="/SongChinn/report"]')
                .should('be.visible')
                .and('contain.text', 'Report an issue')
                .click({ force: true });
            break;

        case "Problem definition":
            cy.get('a[href="/mission.html"]')
                .should('be.visible')
                .and('contain.text', 'Problem definition')
                .click({ force: true });
            break;

        case "Privacy Policy":
            cy.get('a[href="https://www.thoughtworks.com/privacy-policy"]')
                .should('be.visible')
                .and('contain.text', 'Privacy Policy')
                .click({ force: true });
            break;

        case "Book a ticket to the red planet now!":
            cy.get('form[action="/SongChinn"] h3')
                .should('be.visible')
                .then(($el) => {
                    const link = $el.is('a') ? $el : $el.closest('a');
                    const href = link.attr('href');
                    if (href !== '/') {
                        throw new Error(
                            '❌ Acceptance criteria failed: The text does not have a link to click on.'
                        );
                    }
                });
            break;

        case "MarsAir Logo":
            cy.get('h1 a')
                .should('be.visible')
                .and('contain.text', 'MarsAir')
                .and('have.attr', 'href', '/SongChinn')
                .click({ force: true });
            break;

        case "View open issues":
            cy.get('a[href="/SongChinn/issues"]')
                .should('be.visible')
                .and('contain.text', 'View open issues')
                .click({ force: true });
            break;

        case "Back":
            cy.url().then((url) => {

                if (url.includes('/report')) {

                    cy.get('p a').eq(1)
                        .should('contain.text', 'Back')
                        .click();

                    cy.location('pathname').should((path) => {
                        if (path.includes('/report')) {
                            throw new Error('❌ Back button failed on report page');
                        }
                    });

                } else {
                    cy.wait(2000);
                    cy.get('p a').eq(0)
                        .should('contain.text', 'Back')
                        .click();

                    cy.location('pathname').should((path) => {
                        if (path.includes('/issues')) {
                            throw new Error('❌ Back button failed on issues page');
                        }
                    });
                }
            });
            break;

        case "Search":
            cy.get('input[type="submit"][value="Search"]').should('be.visible').click({ force: true });
            break;
    }
});


Then('The user should be on {string} page', (newPage) => {
    switch (newPage) {
        case "Home":
            cy.url().should('include', '/SongChinn');
            break;

        case "Report an issue":
            cy.url().should('include', '/report');
            break;

        case "Problem definition":
            cy.url().should('include', '/mission');
            break;

        case "Issues":
            cy.url().should('include', '/issues');
            break;
    }
});

Then('I took a screenshot of the homepage', () => {
    cy.screenshot('homepage')
});