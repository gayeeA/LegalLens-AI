from fastapi import APIRouter
from app.services.llm_service import extract_obligations

router = APIRouter()

@router.post("/obligations")
def obligations(payload: dict):

    document_id = payload["document_id"]

    with open(
        f"document_store/{document_id}.txt",
        "r",
        encoding="utf-8"
    ) as f:
        document_text = f.read()

    result = extract_obligations(document_text)

    return {
        "obligations": result
    }