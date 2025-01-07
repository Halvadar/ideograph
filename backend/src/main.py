from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import chat
from config import get_settings

settings = get_settings()

app = FastAPI(title="AI Discussion Graph API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat.router, prefix=settings.API_V1_PREFIX)

@app.get("/")
async def root():
    return {"status": "ok", "message": "AI Discussion Graph API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 