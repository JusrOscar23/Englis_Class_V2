from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
import uuid
from typing import Optional, List

load_dotenv()

app = FastAPI(title="EnglisJump API", description="English Learning Platform API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
MONGO_URL = os.getenv("MONGO_URL")
client = AsyncIOMotorClient(MONGO_URL)
db = client.englishjump

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")
JWT_EXPIRATION_HOURS = int(os.getenv("JWT_EXPIRATION_HOURS", 24))

# Models
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    id: str
    email: str
    name: str
    level: str = "beginner"
    progress: dict = {}
    created_at: datetime

class LessonProgress(BaseModel):
    lesson_id: str
    completed: bool = False
    score: Optional[int] = None
    completed_at: Optional[datetime] = None

class GameScore(BaseModel):
    game_id: str
    score: int
    level: str
    played_at: datetime

# Helper functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = await db.users.find_one({"email": email})
    if user is None:
        raise credentials_exception
    return user

# Routes
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "EnglisJump API is running"}

@app.post("/api/auth/register")
async def register(user: UserCreate):
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    user_data = {
        "id": str(uuid.uuid4()),
        "email": user.email,
        "name": user.name,
        "password": hashed_password,
        "level": "beginner",
        "progress": {},
        "created_at": datetime.utcnow()
    }
    
    result = await db.users.insert_one(user_data)
    if result.inserted_id:
        access_token = create_access_token(data={"sub": user.email})
        return {"access_token": access_token, "token_type": "bearer", "user": {
            "id": user_data["id"],
            "email": user_data["email"],
            "name": user_data["name"],
            "level": user_data["level"]
        }}
    else:
        raise HTTPException(status_code=500, detail="Failed to create user")

@app.post("/api/auth/login")
async def login(user: UserLogin):
    db_user = await db.users.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer", "user": {
        "id": db_user["id"],
        "email": db_user["email"],
        "name": db_user["name"],
        "level": db_user["level"]
    }}

@app.get("/api/auth/me")
async def get_current_user_profile(current_user: dict = Depends(get_current_user)):
    return {
        "id": current_user["id"],
        "email": current_user["email"],
        "name": current_user["name"],
        "level": current_user["level"],
        "progress": current_user.get("progress", {})
    }

@app.get("/api/lessons")
async def get_lessons():
    lessons = [
        {
            "id": "basic-1",
            "title": "Greetings and Introductions",
            "level": "beginner",
            "description": "Learn basic greetings and how to introduce yourself",
            "content": {
                "vocabulary": ["Hello", "Hi", "Good morning", "Good afternoon", "Good evening", "My name is", "Nice to meet you"],
                "phrases": [
                    {"english": "Hello, my name is John", "spanish": "Hola, mi nombre es John"},
                    {"english": "Nice to meet you", "spanish": "Mucho gusto"},
                    {"english": "How are you?", "spanish": "¿Cómo estás?"},
                    {"english": "I'm fine, thank you", "spanish": "Estoy bien, gracias"}
                ]
            }
        },
        {
            "id": "basic-2",
            "title": "Numbers and Colors",
            "level": "beginner",
            "description": "Learn numbers 1-20 and basic colors",
            "content": {
                "vocabulary": ["One", "Two", "Three", "Red", "Blue", "Green", "Yellow", "Black", "White"],
                "phrases": [
                    {"english": "I have two cats", "spanish": "Tengo dos gatos"},
                    {"english": "The car is red", "spanish": "El carro es rojo"},
                    {"english": "Five blue birds", "spanish": "Cinco pájaros azules"}
                ]
            }
        }
    ]
    return lessons

@app.get("/api/games")
async def get_games():
    games = [
        {
            "id": "word-match",
            "title": "Word Matching",
            "description": "Match English words with their Spanish translations",
            "type": "matching",
            "level": "beginner"
        },
        {
            "id": "grammar-quiz",
            "title": "Grammar Quiz",
            "description": "Test your English grammar knowledge",
            "type": "quiz",
            "level": "intermediate"
        }
    ]
    return games

@app.get("/api/videos")
async def get_videos():
    videos = [
        {
            "id": "intro-english",
            "title": "Introduction to English",
            "description": "Basic English introduction video",
            "url": "https://example.com/video1",
            "thumbnail": "https://example.com/thumb1.jpg",
            "level": "beginner",
            "duration": "10:30"
        },
        {
            "id": "conversation-basics",
            "title": "Basic Conversations",
            "description": "Learn basic English conversations",
            "url": "https://example.com/video2",
            "thumbnail": "https://example.com/thumb2.jpg",
            "level": "beginner",
            "duration": "15:45"
        }
    ]
    return videos

@app.post("/api/progress/lesson")
async def update_lesson_progress(progress: LessonProgress, current_user: dict = Depends(get_current_user)):
    user_progress = current_user.get("progress", {})
    user_progress[progress.lesson_id] = {
        "completed": progress.completed,
        "score": progress.score,
        "completed_at": datetime.utcnow() if progress.completed else None
    }
    
    await db.users.update_one(
        {"id": current_user["id"]},
        {"$set": {"progress": user_progress}}
    )
    
    return {"message": "Progress updated successfully"}

@app.post("/api/games/score")
async def save_game_score(score: GameScore, current_user: dict = Depends(get_current_user)):
    score_data = {
        "id": str(uuid.uuid4()),
        "user_id": current_user["id"],
        "game_id": score.game_id,
        "score": score.score,
        "level": score.level,
        "played_at": datetime.utcnow()
    }
    
    await db.game_scores.insert_one(score_data)
    return {"message": "Score saved successfully"}

@app.get("/api/contact")
async def get_contact_info():
    return {
        "email": "contact@englishjump.com",
        "phone": "+1-555-0123",
        "address": "123 Learning Street, Education City, EC 12345",
        "social_media": {
            "facebook": "https://facebook.com/englishjump",
            "twitter": "https://twitter.com/englishjump",
            "instagram": "https://instagram.com/englishjump"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)