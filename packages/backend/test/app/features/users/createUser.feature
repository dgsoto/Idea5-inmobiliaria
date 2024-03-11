Feature: Register an new user
    In order to has an account
    As an posible user
    I want to create a new account

  Scenario: A valin non existing user
    Given I send a POST request to "/api/users" with body:
      """
      {
          "id":"d7cd6582-7010-48e3-aab4-c1b69d38c511",
          "firstname": "Jose Luis",
          "lastname": "Sandoval",
          "email": "docs.huehue@gmail.com",
          "password": "test12345",
          "phone": "1234567898"
      }
      """
    Then the response status code should be 201
    And the response should be

  Scenario: An invalid non existing user
    Given I send a POST request to "/api/users" with body:
      """
      {
          "id":"d7cd6582-7010-48e3-aab4-c1b69d38c511",
          "firstname": 10,
          "lastname": "Sandoval",
          "email": "docs.huehue@gmail.com",
          "password": "test12345"
      }
      """
    Then the response status code should be 422