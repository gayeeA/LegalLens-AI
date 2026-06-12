import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_summary(document_text):

    prompt = f"""
    You are a legal document simplifier.

    Analyze the document and provide:

    1. Plain English Summary
    2. Important Clauses
    3. Financial Obligations
    4. Risks
    5. Before You Sign Recommendations

    Document:

    {document_text[:12000]}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3
    )

    return response.choices[0].message.content
def answer_question(document_text, question):

    prompt = f"""
    You are a legal assistant.

    Answer ONLY using the document.

    If answer is not available,
    say:
    Information not found in document.

    DOCUMENT:

    {document_text[:12000]}

    QUESTION:

    {question}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content
def analyze_risks(document_text):

    prompt = f"""
    You are a legal expert.

    Analyze this document.

    Return:

    1. Risk Score (Low/Medium/High)

    2. Major Risks

    3. Financial Risks

    4. Legal Risks

    DOCUMENT:

    {document_text[:12000]}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content
def extract_obligations(document_text):

    prompt = f"""
    Extract obligations from this legal document.

    Return:

    Tenant Obligations

    Landlord Obligations

    Financial Obligations

    Compliance Requirements

    DOCUMENT:

    {document_text[:12000]}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content