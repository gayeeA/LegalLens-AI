from fastapi import APIRouter
from app.services.llm_service import analyze_risks

router = APIRouter()

@router.post("/risk-analysis")
def risk_analysis(payload: dict):

    document_id = payload["document_id"]

    with open(
        f"document_store/{document_id}.txt",
        "r",
        encoding="utf-8"
    ) as f:
        document_text = f.read()

    result = analyze_risks(document_text)

    return {
        "risk_analysis": result
    }