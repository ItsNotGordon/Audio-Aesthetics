from unittest import TestCase
from fastapi import status
from fastapi.testclient import TestClient
from your_project.queries import UserRepository, authenticator
from your_project.main import app



'''
Michael Feathers, one of the early proponents of unit testing, put together a list of DO NOT DOs for unit tests.

A test is not a unit test if:

-It talks to the database
-It communicates across the network
-It touches the file system
-It can't run at the same time as any of your other unit tests
-You have to do special things to your environment (such as editing config files) to run it.
'''


client = TestClient(app)


class FakeUserQueries:
    def get_one_user(self, username):
        # Assuming user with username 'john_doe' exists
        return {
            "id": 42,
            "username": "john_doe",
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "img_url": "https://tinyurl.com/john-doe-img"
        }


def test_get_one_user():
    # Arrange
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data
    app.dependency_overrides[UserRepository] = FakeUserQueries
    app.dependency_overrides[get_engine] = fake_get_engine

    # Act
    response = client.get("/api/users/john_doe")  # Replace with an actual username

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == {
        "id": 42,
        "username": "john_doe",
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "img_url": "https://tinyurl.com/john-doe-img"
    }
