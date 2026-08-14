from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import movies, users
from app.database import Base, engine
from app.models.user import User


# =========================
# CREATE DATABASE TABLES
# =========================

Base.metadata.create_all(bind=engine)


# =========================
# FASTAPI APP
# =========================

app = FastAPI()


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# ROUTES
# =========================

app.include_router(
    movies.router,
    prefix="/api/movies"
)

app.include_router(
    users.router,
    prefix="/api/users"
)


# =========================
# HOME
# =========================

@app.get("/")
def home():
    return {
        "message": "Movie Recommendation Backend is running!"
    }
