from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field
from typing import List
import uuid
from models.chat import ChatRequest, ChatResponse
from config import get_settings

settings = get_settings()

class BranchingResponse(BaseModel):
    response: str = Field(description="The main response to the user's question")
    branches: List[str] = Field(
        description="List of distinct topics or themes that could be explored further",
        default_factory=list
    )

class ChatService:
    def __init__(self, model_name: str, temperature: float = 0.7):
        self.llm = ChatOpenAI(
            model_name=model_name,
            temperature=temperature,
            openai_api_key=settings.OPENAI_API_KEY
        )
        self.parser = PydanticOutputParser(pydantic_object=BranchingResponse)

    async def process_message(self, chat_request: ChatRequest) -> ChatResponse:
        # Create the prompt template
        template = ChatPromptTemplate.from_messages([
            ("system", """You are an AI assistant that provides detailed responses 
            and identifies potential branching topics for further discussion.
            
            Format your response to include:
            1. A clear, direct answer to the question
            2. Identify distinct topics from your response that could be explored further
            
            
            Keep your response focused and concise while being informative."""),
            ("user", "{question}")
        ], partial_variables={"format_instructions": self.parser.get_format_instructions()})        
        
        # Create the chain
        chain = template | self.llm
        
        # Process the message
        result = chain.invoke({"question": chat_request.question})
        # Generate IDs for the conversation and message
        conversation_id = chat_request.conversation_id or str(uuid.uuid4()) 
        message_id = str(uuid.uuid4())
        
        print(f"Result: {result}")
        
        return ChatResponse(
            message=result.content,
            conversation_id=conversation_id,
            message_id=message_id,
            branches=[]
        ) 