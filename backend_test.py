#!/usr/bin/env python3
import requests
import json
import time
from datetime import datetime

# Get the backend URL from the frontend .env file
BACKEND_URL = "http://localhost:8001"
API_URL = f"{BACKEND_URL}/api"

# Test user data
TEST_USER = {
    "email": "testuser@test.com",
    "password": "test123",
    "name": "Test User"
}

# Store auth token
auth_token = None
user_id = None

def print_test_header(test_name):
    print(f"\n{'=' * 80}")
    print(f"TESTING: {test_name}")
    print(f"{'=' * 80}")

def print_response(response):
    print(f"Status Code: {response.status_code}")
    try:
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except:
        print(f"Response: {response.text}")

def test_health_check():
    print_test_header("Health Check API")
    
    response = requests.get(f"{API_URL}/health")
    print_response(response)
    
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
    
    print("✅ Health Check API test passed")
    return True

def test_user_registration():
    print_test_header("User Registration API")
    
    # First, try to register a new user
    response = requests.post(
        f"{API_URL}/auth/register",
        json=TEST_USER
    )
    print_response(response)
    
    # If user already exists, we'll get a 400 error
    if response.status_code == 400 and "already registered" in response.json().get("detail", ""):
        print("User already exists, proceeding with login test")
        return True
    
    # Otherwise, we should get a 200 response with an access token
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["user"]["email"] == TEST_USER["email"]
    assert response.json()["user"]["name"] == TEST_USER["name"]
    
    # Store the auth token for later tests
    global auth_token, user_id
    auth_token = response.json()["access_token"]
    user_id = response.json()["user"]["id"]
    
    print("✅ User Registration API test passed")
    return True

def test_user_login():
    print_test_header("User Login API")
    
    response = requests.post(
        f"{API_URL}/auth/login",
        json={
            "email": TEST_USER["email"],
            "password": TEST_USER["password"]
        }
    )
    print_response(response)
    
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["user"]["email"] == TEST_USER["email"]
    
    # Store the auth token for later tests
    global auth_token, user_id
    auth_token = response.json()["access_token"]
    user_id = response.json()["user"]["id"]
    
    print("✅ User Login API test passed")
    return True

def test_user_profile():
    print_test_header("User Profile API")
    
    # Ensure we have an auth token
    global auth_token
    if not auth_token:
        test_user_login()
    
    response = requests.get(
        f"{API_URL}/auth/me",
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    print_response(response)
    
    assert response.status_code == 200
    assert response.json()["email"] == TEST_USER["email"]
    assert response.json()["name"] == TEST_USER["name"]
    
    print("✅ User Profile API test passed")
    return True

def test_lessons_api():
    print_test_header("Lessons API")
    
    response = requests.get(f"{API_URL}/lessons")
    print_response(response)
    
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) > 0
    
    # Check lesson structure
    lesson = response.json()[0]
    assert "id" in lesson
    assert "title" in lesson
    assert "level" in lesson
    assert "description" in lesson
    assert "content" in lesson
    
    print("✅ Lessons API test passed")
    return True

def test_games_api():
    print_test_header("Games API")
    
    response = requests.get(f"{API_URL}/games")
    print_response(response)
    
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) > 0
    
    # Check game structure
    game = response.json()[0]
    assert "id" in game
    assert "title" in game
    assert "description" in game
    assert "type" in game
    assert "level" in game
    
    print("✅ Games API test passed")
    return True

def test_videos_api():
    print_test_header("Videos API")
    
    response = requests.get(f"{API_URL}/videos")
    print_response(response)
    
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) > 0
    
    # Check video structure
    video = response.json()[0]
    assert "id" in video
    assert "title" in video
    assert "description" in video
    assert "url" in video
    assert "thumbnail" in video
    assert "level" in video
    assert "duration" in video
    
    print("✅ Videos API test passed")
    return True

def test_contact_api():
    print_test_header("Contact API")
    
    response = requests.get(f"{API_URL}/contact")
    print_response(response)
    
    assert response.status_code == 200
    assert "email" in response.json()
    assert "phone" in response.json()
    assert "address" in response.json()
    assert "social_media" in response.json()
    
    print("✅ Contact API test passed")
    return True

def test_lesson_progress_api():
    print_test_header("Lesson Progress API")
    
    # Ensure we have an auth token
    global auth_token
    if not auth_token:
        test_user_login()
    
    # First, get the lessons to find a lesson ID
    lessons_response = requests.get(f"{API_URL}/lessons")
    assert lessons_response.status_code == 200
    lesson_id = lessons_response.json()[0]["id"]
    
    # Update lesson progress
    progress_data = {
        "lesson_id": lesson_id,
        "completed": True,
        "score": 85
    }
    
    response = requests.post(
        f"{API_URL}/progress/lesson",
        json=progress_data,
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    print_response(response)
    
    assert response.status_code == 200
    assert "message" in response.json()
    assert "Progress updated successfully" in response.json()["message"]
    
    # Verify the progress was saved by checking the user profile
    profile_response = requests.get(
        f"{API_URL}/auth/me",
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert profile_response.status_code == 200
    assert lesson_id in profile_response.json()["progress"]
    assert profile_response.json()["progress"][lesson_id]["completed"] == True
    assert profile_response.json()["progress"][lesson_id]["score"] == 85
    
    print("✅ Lesson Progress API test passed")
    return True

def test_game_score_api():
    print_test_header("Game Score API")
    
    # Ensure we have an auth token
    global auth_token
    if not auth_token:
        test_user_login()
    
    # First, get the games to find a game ID
    games_response = requests.get(f"{API_URL}/games")
    assert games_response.status_code == 200
    game_id = games_response.json()[0]["id"]
    
    # Save game score
    score_data = {
        "game_id": game_id,
        "score": 750,
        "level": "beginner",
        "played_at": datetime.utcnow().isoformat()
    }
    
    response = requests.post(
        f"{API_URL}/games/score",
        json=score_data,
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    print_response(response)
    
    assert response.status_code == 200
    assert "message" in response.json()
    assert "Score saved successfully" in response.json()["message"]
    
    print("✅ Game Score API test passed")
    return True

def run_all_tests():
    test_results = {
        "Health Check API": test_health_check(),
        "User Registration API": test_user_registration(),
        "User Login API": test_user_login(),
        "User Profile API": test_user_profile(),
        "Lessons API": test_lessons_api(),
        "Games API": test_games_api(),
        "Videos API": test_videos_api(),
        "Contact API": test_contact_api(),
        "Lesson Progress API": test_lesson_progress_api(),
        "Game Score API": test_game_score_api()
    }
    
    print("\n\n" + "=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    
    all_passed = True
    for test_name, result in test_results.items():
        status = "✅ PASSED" if result else "❌ FAILED"
        if not result:
            all_passed = False
        print(f"{test_name}: {status}")
    
    print("\n" + "=" * 80)
    if all_passed:
        print("🎉 ALL TESTS PASSED! The EnglishJump API is working correctly.")
    else:
        print("❌ SOME TESTS FAILED. Please check the logs above for details.")
    print("=" * 80)
    
    return test_results

if __name__ == "__main__":
    run_all_tests()