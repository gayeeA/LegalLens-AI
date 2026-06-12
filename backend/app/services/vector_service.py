import faiss
import pickle
import os

from sentence_transformers import SentenceTransformer

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

VECTOR_DB_PATH = "vectordb"


def split_text(text, chunk_size=500):

    chunks = []

    for i in range(0, len(text), chunk_size):
        chunks.append(text[i:i+chunk_size])

    return chunks


def create_vector_store(document_id, text):

    chunks = split_text(text)

    embeddings = model.encode(chunks)

    dimension = embeddings.shape[1]

    index = faiss.IndexFlatL2(dimension)

    index.add(embeddings)

    os.makedirs(VECTOR_DB_PATH, exist_ok=True)

    faiss.write_index(
        index,
        f"{VECTOR_DB_PATH}/{document_id}.index"
    )

    with open(
        f"{VECTOR_DB_PATH}/{document_id}.pkl",
        "wb"
    ) as f:
        pickle.dump(chunks, f)

    return len(chunks)