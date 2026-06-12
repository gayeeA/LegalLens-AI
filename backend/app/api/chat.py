from fastapi import APIRouter
from app.services.llm_service import answer_question

router = APIRouter()

@router.post("/chat")
def chat(payload: dict):

    document_id = payload["document_id"]
    question = payload["question"]

    with open(
        f"document_store/{document_id}.txt",
        "r",
        encoding="utf-8"
    ) as f:
        document_text = f.read()

    answer = answer_question(
        document_text,
        question
    )

    return {
        "answer": answer
    }