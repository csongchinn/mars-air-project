Feature: Report an Issue Regression Tests

    @report_issue_regression
    Scenario: Report an Issue 
        Given The user is on "Report an issue" page
        When The user log an issue with "<title>" "<description>" and "<severity>"
        Then The user should be on "Issues" page
        Then The user should see the issue has been logged with "<title>" and "<severity>"

        Examples:
            | title                          | description                                                          | severity |
            | No error prompt on Report page | There is no error prompt when an empty issue report is being created | Medium   |
            | No error prompt on Report page | There is no error prompt when an empty issue report is being created | Low      |

