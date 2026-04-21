import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

Given('I navigate to Mars Airlines homepage', ()=>{
    cy.visit('https://marsair.recruiting.thoughtworks.net/SongChinn')
    cy.url().should('include', '/SongChinn')
    cy.task('summaryLog', '✅ Homepage looks good');
});

Then('I took a screenshot of the homepage', ()=>{
    cy.screenshot('homepage')
});