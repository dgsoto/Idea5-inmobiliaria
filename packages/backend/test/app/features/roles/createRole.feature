Feature: Create a new role
  In order to manage user permissions
  As an administrator
  I want to create a new role

  Scenario: Create a valid new role
    Given I send a POST request to "/api/roles" with body:
      """
      {
          "role_name": "Admin",
          "role_state": "Active"
      }
      """
    Then the response status code should be 201
    And the response should be

  Scenario: Create an invalid new role
    Given I send a POST request to "/api/roles" with body:
      """
      {
          "role_state": "Active"
      }
      """
    Then the response status code should be 422
