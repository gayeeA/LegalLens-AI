import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-1.5-flash")


def generate_summary(document_text):

    prompt = f"""
    You are a legal document simplifier.

    Explain this document in simple English.

    Provide:

    1. Summary
    2. Important Clauses
    3. Obligations
    4. Risks

    Document:
    {document_text[:10000]}
    """

    response = model.generate_content(prompt)

    return response.text