from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # API Configuration
    API_V1_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "AI Discussion Graph"
    
    # Model Configuration
    MODEL_NAME: str = "gpt-3.5-turbo"
    OPENAI_API_KEY: str
    
    # CORS Configuration
    BACKEND_CORS_ORIGINS: list[str] = [
        "http://localhost:3000",  # Next.js dev server
        "http://localhost:8000",  # FastAPI dev server
    ]
    
    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings() 