Feature: Page Object pattern practice

Scenario Outline: Search test
    Given I am on the Google search page
    When I search for <KEY>
    Then the result amount must be more than <minResultAmount>
    And each result must contain <KEY>
    
Examples:
|        KEY | minResultAmount |
| "iTechArt" |          10000  |
|  "Jasmine" |         200000  |
|  "node.js" |         100000  |
