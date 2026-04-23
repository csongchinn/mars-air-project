Feature: Search Flights and Promo Code Regression Tests

    Scenario: Search Flights without Promo Codes
        Given The user is on "Home" page
        Then The "departing" flight should only be July and December for next two years
        Then The "returning" flight should only be July and December for next two years
        When The user search departing flight "<departFlight>" and returning flight "<returnFlight>"
        Then The depart flight "<departFlight>" and return flight "<returnFlight>" is selected
        When The user clicks on "Search"
        Then The search results should be displayed with "<result>"

        @search_flight_regression_successful
        Examples:
            | departFlight | returnFlight                  | result     |
            | July         | July (next year)              | successful |
            | July         | July (two years from now)     | successful |
            | July         | December (next year)          | successful |
            | July         | December (two years from now) | successful |
            | December     | July (two years from now)     | successful |
            | December     | December (next year)          | successful |
            | December     | December (two years from now) | successful |

        @search_flight_regression_notpossible
        Examples:
            | departFlight | returnFlight     | result      |
            | December     | July (next year) | notpossible |
            | July         | December         | notpossible |

        @search_flight_regression_unsuccessful
        Examples:
            | departFlight              | returnFlight         | result       |
            | July                      | July                 | unsuccessful |
            | December                  | July                 | unsuccessful |
            | July (next year)          | December             | unsuccessful |
            | July (two years from now) | December (next year) | unsuccessful |
            | August                    | December (next year) | unsuccessful |

    Scenario: Search Flight with Promo Codes
        Given The user is on "Home" page
        When The user search departing flight "<departFlight>" and returning flight "<returnFlight>"
        Then The depart flight "<departFlight>" and return flight "<returnFlight>" is selected
        When The user enters a "<promoCodeType>" promotional code
        When The user clicks on "Search"
        Then The search results should be displayed with "<result>"
        Then The promotional code results should be displayed

        @search_flight_promo_code_regression_successful
        Examples:
            | departFlight | returnFlight                  | result     | promoCodeType |
            | July         | July (next year)              | successful | valid         |
            | December     | December (two years from now) | successful | invalid       |
            | July         | December (two years from now) | successful | valid         |

        @search_flight_promo_code_regression_notpossible
        Examples:
            | departFlight | returnFlight | result      | promoCodeType |
            | July         | December     | notpossible | valid         |
            | July         | December     | notpossible | invalid       |

        @search_flight_promo_code_regression_unsuccessful
        Examples:
            | departFlight              | returnFlight         | result       | promoCodeType |
            | July                      | July                 | unsuccessful | valid         |
            | December                  | July                 | unsuccessful | invalid       |
            | July (next year)          | December             | unsuccessful | valid         |
            | July (two years from now) | December (next year) | unsuccessful | invalid       |
            | August                    | December (next year) | unsuccessful | valid         |
