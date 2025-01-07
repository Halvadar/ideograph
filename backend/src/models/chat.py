from pydantic import BaseModel
from typing import List, Optional

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    question: str
    conversation_id: Optional[str] = None
    parent_message_id: Optional[str] = None

class ChatResponse(BaseModel):
    message: str
    conversation_id: str
    message_id: str
    branches: List[str] = []  # Topics for potential branches 