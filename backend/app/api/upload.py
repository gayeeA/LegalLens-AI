from fastapi import APIRouter, UploadFile, File
from app.services.pdf_service import extract_text_from_pdf
# from app.services.vector_service import create_vector_store
import os
import uuid
router = APIRouter()
STORE_DIR = "document_store"
UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(STORE_DIR, exist_ok=True)

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    if not file.filename.endswith(".pdf"):
        return {
            "error": "Please upload a PDF file"
        }

    unique_name = f"{uuid.uuid4()}.pdf"

    file_path = os.path.join(
        UPLOAD_FOLDER,
        unique_name
    )

    # Save uploaded PDF
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    # Extract text
    extracted_text = extract_text_from_pdf(file_path)

    # Create document id
    document_id = unique_name.replace(".pdf", "")

    # Save extracted text
    txt_path = os.path.join(
        STORE_DIR,
        f"{document_id}.txt"
    )

    with open(
        txt_path,
        "w",
        encoding="utf-8"
    ) as f:
        f.write(extracted_text)

    print("Saved text file:", txt_path)

    return {
        "document_id": document_id,
        "text_length": len(extracted_text)
    }