from fastapi import FastAPI

from app.api.upload import router as upload_router
from app.api.summarize import router as summarize_router
from app.api.chat import router as chat_router
app = FastAPI(
    title="LegalLens AI"
)

app.include_router(upload_router)
app.include_router(summarize_router)
app.include_router(chat_router)

@app.get("/")
def home():
    return {
        "message": "LegalLens AI Running"
    }