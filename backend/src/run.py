import uvicorn
from pathlib import Path
import sys

# Add the parent directory to Python path to allow imports from src
sys.path.append(str(Path(__file__).parent))

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Enable auto-reload for development
        log_level="info",
        proxy_headers=True,  # Enable reading proxy headers for proper IP handling
        forwarded_allow_ips="*",  # Allow forwarded IPs from reverse proxies
    )
