from fastapi import APIRouter, HTTPException
from models.chat import ChatRequest, ChatResponse
from services.chat_service import ChatService
from config import get_settings

router = APIRouter()
settings = get_settings()

# Initialize chat service
chat_service = ChatService(model_name=settings.MODEL_NAME)

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        print(f"Processing message: {request}")
        response = await chat_service.process_message(request)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 