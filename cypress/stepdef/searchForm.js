import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

When('The user search departing flight {string} and returning flight {string}', (departFlight, returnFlight) => {
    cy.get('#departing').select(`${departFlight}`);
    cy.get('#returning').select(`${returnFlight}`);
});

When('The depart flight {string} and return flight {string} is selected', (departFlight, returnFlight) => {
    cy.get('#departing option:selected').should('have.text', `${departFlight}`);
    cy.get('#returning option:selected').should('have.text', `${returnFlight}`);
});

When('The {string} flight should only be July and December for next two years', (flightType) => {
    const currentYear = 2026;
    const availableYear = currentYear + 2;
    const availableMonths = ['July', 'December'];

    cy.get(`#${flightType} option`)
        .not('[value=""]')
        .each(($option) => {
            const flights = $option.text().trim()
            const month = flights.split(' ')[0]
            expect(
                availableMonths
            ).to.include(month)

            let optionYear = currentYear
            if (flights.includes('next year')) {
                optionYear = currentYear + 1
            } if (flights.includes('two years')) {
                optionYear = currentYear + 2
            }
            expect(
                optionYear
            ).to.be.at.most(availableYear);
        })
});

When('The {string} search results should be displayed', (result) => {
    cy.get('div#content h2').contains('Search Results').should('be.visible');
    switch (result) {
        case "successful":
            cy.get('div#content p').invoke('text').then((text) => {
                expect(
                    text.includes('Sorry, there are no more seats available.') ||
                    text.includes('Seats available!'),
                    'Expected a successful flight search result'
                ).to.be.true
            })
            break;

        case "unsuccessful":
            cy.get('div#content p')
                .should('include.text', 'Return date is earlier than Departure date');
            break;

        case "notpossible":
            cy.get('div#content p')
                .should('include.text', 'Unfortunately, this schedule is not possible. Please try again.');
            break;
    }
});

When('The user enters a {string} promotional code', (promoCodeType) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const X1 = letters[Math.floor(Math.random() * letters.length)];
    const X2 = letters[Math.floor(Math.random() * letters.length)];
    const X3 = letters[Math.floor(Math.random() * letters.length)];
    const X4 = letters[Math.floor(Math.random() * letters.length)];
    const X5 = letters[Math.floor(Math.random() * letters.length)];
    const discount = Math.floor(Math.random() * 10);
    let a, b, c;

    switch (promoCodeType) {
        case "valid":
            do {
                a = Math.floor(Math.random() * 10);
                b = Math.floor(Math.random() * 10);
                c = a + b + discount;
            } while (c > 9);
            expect(c).to.eq(a + b + discount);
            promoCode = `${X1}${X2}${discount}-${X3}${X4}${X5}-${a}${b}${c}`;
            break;

        case "invalid":
            do {
                a = Math.floor(Math.random() * 10);
                b = Math.floor(Math.random() * 10);
                c = a + b - discount;
            } while (c > 8);
            promoCode = `${X1}${X2}${discount}${X3}${X4}${X5}-${a}${b}${c}${X1}`;
    }
    cy.get('#promotional_code')
        .should('be.visible')
        .clear()
        .type(promoCode);
    // cy.screenshot();
    cy.wrap(promoCode).as('promoCode')
});

When('The promotional code results should be displayed', function () {
    cy.get('@promoCode').then((promoCode) => {
        const discountCode = Number(promoCode[2]);
        const discountPercent = discountCode * 10;

        cy.get('div#content p').invoke('text').then((text) => {
            if (text.includes('Seats available')) {
                cy.get('p.promo_code')
                    .should('be.visible')
                    .invoke('text')
                    .then((promoText) => {

                        const promoUsed =
                            promoText.includes(`Promotional code ${promoCode} used: ${discountPercent}% discount!`)
                        const promoInvalid =
                            promoText.includes(`Sorry, code ${promoCode} is not valid`)

                        expect(
                            promoUsed || promoInvalid,
                            'promo code should be used or not valid'
                        ).to.be.true
                    })

            } else if (text.includes('Sorry, there are no more seats available')) {
                throw new Error('❌ Seats unavailable');
            } else if (text.includes('Unfortunately, this schedule is not possible. Please try again.')) {
                throw new Error('❌ Schedule not possible');
            }
        })
    })
});