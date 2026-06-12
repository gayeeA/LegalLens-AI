LEGAL_SUMMARY_PROMPT = """
You are an expert legal document analyst.

ONLY use information present in the document.

DO NOT invent values.

If information is missing, write:
'Not mentioned in document'

Return JSON format:

{{
    "summary":"",
    "important_clauses":[],
    "financial_obligations":[],
    "risks":[],
    "before_you_sign":[]
}}

Document:
{document}
"""