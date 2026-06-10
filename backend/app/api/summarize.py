from fastapi import APIRouter
from app.services.pdf_service import extract_text_from_pdf
from app.services.llm_service import generate_summary
import os

router = APIRouter()


@router.get("/summary/{filename}")
def summarize_document(filename: str):

    pdf_path = os.path.join(
        "uploads",
        filename
    )

    if not os.path.exists(pdf_path):
        return {
            "error": "File not found"
        }

    document_text = extract_text_from_pdf(pdf_path)

    summary = generate_summary(document_text)

    return {
        "summary": summary
    }