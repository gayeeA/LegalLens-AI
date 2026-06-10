from fastapi import FastAPI

from app.api.upload import router as upload_router
from app.api.summarize import router as summarize_router

app = FastAPI(
    title="LegalLens AI"
)

app.include_router(upload_router)
app.include_router(summarize_router)


@app.get("/")
def home():
    return {
        "message": "LegalLens AI Running"
    }