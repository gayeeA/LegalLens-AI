from fastapi import FastAPI
from app.api.upload import router as upload_router

app = FastAPI(
    title="LegalLens AI",
    version="1.0.0"
)

app.include_router(upload_router)


@app.get("/")
def home():
    return {
        "message": "LegalLens AI Backend Running"
    }