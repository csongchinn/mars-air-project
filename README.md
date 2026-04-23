# E2E Test automation for Mars Air - Cypress

https://marsair.recruiting.thoughtworks.net/SongChinn

This mars-air-project repository contains an end-to-end (E2E) test automation framework built to validate MarsAir web application using Cypress with Cucumber (Gherkin), and excecuted both locally and via GitHub Actions.

# Test Plan
In Scope: 
- Exploratory Testing
- UI Functional Testing
- Basic Smoke & Regression Testing
- Form Validation
- Navigation and Critical User Flows

Out of Scope:
- Performance Testing
- Load testing 

# Test Approach
- Manual exploratory testing first to understand the web application
- Identify critical user flows
- Convert high-value cases into automated tests using Cypress that can run locally and on GHA

Browser: Chrome

Test Tool: Cypress

CI/CD: GitHub Actions

Risk Assumptions: Due to time constraints, testing is limited to high-level smoke & regression coverage.

# Test Case
*#1 - Basic Search Flow*

Given the user is searching for flights to Mars

When the user search departing and returning flight

Then the user should see flights leaving every six months in July and December

And the flights for the next two years are displayed

When the user clicks submit button

Then the search results should display "Seats availabe! Call 0800 MARSAIR to book!" for seats available

OR the search results should display "Sorry, there are no more seats available." for seats unavailable

**Expected result**
- Available flights are displayed correctly.
- Search results messages are displayed correctly.

---

*#2 - Promotional Codes*

Given the user enters a valid promotional code on search flight form

When the user clicks submit button

Then the search results should display "Promotional code [code] used: [discount]% discount!" message

**Expected result**
- Search results are displayed correctly.

--

Given the user enters an invalid promotional code on search flight form

When the user clicks submit button

Then the search results should display "Sorry, code [invalid promo code] is not valid" message

**Expected result**
- Search results are displayed correctly. 

---

*#3 - Link to Home Page*

Given the user is on Home Page

Then the "Book a ticket to the red planet now!" should be displayed 

When the user clicks on the text

Then it should take the user to Home page

**Expected result**
- "Book a ticket to the red planet now!" are shown
- "Book a ticket to the red planet now!" can be clicked and links to Home page

--

Given the user is on a page that is not Home Page

Then the MarsAir logo should be displayed

When the user clicks on the logo

Then it should take the user to Home page

**Expected result**
- MarsAir logo can be clicked and links to Home page

---

*#4 - Invalid Return Dates*

Given the user searches an invalid flight trip on Home page

When the user clicks submit button

Then the search results should display "Unfortunately, this schedule is not possible. Please try again."

**Expected result**
- Search results are displayed correctly. 

# Assumptions 

Search flight:
- Return flight cannot be earlier than departure flight. 
- Search results should display a message if return flight is earlier than departure flight.

Back button:
- Takes user back to previous page. For example, if user goes directly to /report page, clicking Back will bring user to Home page.

Promotional Code:

- Promotional code can apply a discount of up to 90%.
- Promotional code can be reused. Confirmation is required if usage should be restricted.
- Search results should display a message when seats are unavailable for promotional code. 
- Search results should display a message when flight schedules are unavailable for promotional code. 

Seats:

- Seats availability details are not accessible.
- Seats availablility is out of scope for this testing.

Report an Issue:

- Needs to be tested.
- Issue has already been reported will pass.
- Issue that could not be found will fail.

# Test Results

**Mars Air Smoke Test:**
- Total test jobs: 5
- Passed: 3
- Failed: 2 
- Test run: https://github.com/csongchinn/mars-air-project/actions/runs/24823854220
- Test scenarios & examples: https://github.com/csongchinn/mars-air-project/blob/main/cypress/e2e/MarsAirSmoke.feature

*Failed tests:*
- "Book a ticket to the red planet now!" is not a link
- Back button does not work as assumed 

---

**Search Flights and Promo Code Regression Test**
- Total test jobs: 6
- Passed: 2
- Failed: 4
- Test run: https://github.com/csongchinn/mars-air-project/actions/runs/24829219661/job/72673102382
- Test scenarios & examples: https://github.com/csongchinn/mars-air-project/blob/main/cypress/e2e/SearchFlightsPromoCodeRegression.feature

*Failed tests:*
- Return date is earlier than Departure date should fail as assumed
- Search results should display a message when seats are unavailable for promotional code, as assumed.
- Search results should display a message when flight schedules are unavailable for promotional code, as assumed.

---

**Report Issues Regression Test**
- Total test jobs: 2
- Passed: 2
- Failed: 0
- Test run: https://github.com/csongchinn/mars-air-project/actions/runs/24828871869
- Test scenarios & examples: https://github.com/csongchinn/mars-air-project/blob/main/cypress/e2e/ReportIssueRegression.feature

# Issues Requiring Clarifications

- Inconsistency observed between the stated acceptance criteria and the displayed message “Seats available! Call 0800 MARSAIR to book!” on the MarsAir website.
- Form submissions do not consistently display validation or error messages when required inputs are missing or invalid.
- The promotional code can be submitted without selecting departure and return flights, resulting in incorrect or misleading search result messages.
- Invalid promotional codes do not trigger an error message unless both departure and return flights are selected.
- Navigating back from the problem definition page (/mission) redirects the user to a “Not authorized” page.
- Back button behavior differs from expected navigation flow.
- After closing an issue post‑edit, deleting the issue and navigating back returns the user to the edit state instead of reflecting the deletion.