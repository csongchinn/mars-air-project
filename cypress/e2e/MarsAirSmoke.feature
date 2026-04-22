Feature: MarsAir Smoke Tests

    @home_page_smoke
    Scenario: Home Page Smoke Test
        Given The user is on "Home" page
        Then The "Book a ticket to the red planet now!" is displayed
        Then The "Navigation Links" is displayed
        Then The "Search flight form" is displayed

    @marsair_logo_smoke
    Scenario: MarsAir Logo Smoke Test
        Given The user is on "Home" page
        Then The "MarsAir Logo" is displayed
        When The user clicks on "MarsAir logo"
        Then The user should be on "Home" page

    @red_planet_smoke
    Scenario: Book a ticket to red planet Smoke Test
        Given The user is on "Home" page
        Then The "Book a ticket to the red planet now!" is displayed 
        When The user clicks on "Book a ticket to the red planet now!"

    @report_issues_smoke
    Scenario: Report & Issues Smoke Test
        Given The user is on "Report an issue" page
        Then The "Report form" is displayed
        When The user clicks on "View open issues"
        Then The user should be on "Issues" page

    @back_button_smoke
    Scenario: Back button Smoke Test (Home to Report to Issues)
        Given The user is on "Home" page
        When The user clicks on "Report an issue"
        Then The "Report form" is displayed
        When The user clicks on "View open issues"
        Then The "Issues form" is displayed
        When The user clicks on "Back"
        Then The user should be on "Report an issue" page
        When The user clicks on "Back"
        Then The user should be on "Home" page
        # pass

    @back_button_smoke
    Scenario: Back button Smoke Test (Report to Issues)
        Given The user is on "Report an issue" page
        Then The "Report form" is displayed
        When The user clicks on "View open issues"
        Then The "Issues form" is displayed
        When The user clicks on "Back"
        Then The user should be on "Report an issue" page
        When The user clicks on "Back"
        Then The user should be on "Home" page
        # report page fail
        
    @back_button_smoke
    Scenario: Back button Smoke Test (Issues only)
        Given The user is on "View open issues" page
        Then The "Issues form" is displayed
        When The user clicks on "Back"
        Then The user should be on "Report an issue" page
        # issue page fail