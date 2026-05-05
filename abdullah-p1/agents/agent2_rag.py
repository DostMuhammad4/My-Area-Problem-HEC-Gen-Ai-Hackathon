import os
import fitz
import chromadb
from sentence_transformers import SentenceTransformer

PROJECT = os.environ.get("PROJECT_PATH", "/content/drive/MyDrive/my-area-problems")

embedder   = SentenceTransformer("all-MiniLM-L6-v2")
chroma     = chromadb.PersistentClient(path=f"{PROJECT}/chroma_db")
collection = chroma.get_or_create_collection("civic_docs")

def load_pdfs_to_chroma(pdf_folder: str):
    files = [f for f in os.listdir(pdf_folder) if f.endswith(".pdf")]
    if not files:
        print("No PDFs found in", pdf_folder)
        return
    for fname in files:
        doc  = fitz.open(f"{pdf_folder}/{fname}")
        text = " ".join([p.get_text() for p in doc])
        if not text.strip():
            print(f"WARNING: {fname} appears scanned — skipping")
            continue
        chunks = [text[i:i+500] for i in range(0, len(text), 500)]
        embeds = embedder.encode(chunks).tolist()
        ids    = [f"{fname}_{i}" for i in range(len(chunks))]
        collection.add(documents=chunks, embeddings=embeds, ids=ids)
        print(f"Loaded: {fname} ({len(chunks)} chunks)")

def agent2_retrieve(query: str, n: int = 3) -> str:
    q_embed = embedder.encode([query]).tolist()
    results = collection.query(query_embeddings=q_embed, n_results=n)
    docs = results["documents"][0]
    if not docs:
        return "No relevant context found. Cite RTI Act 2017 generally."
    return "\n---\n".join(docs)

if __name__ == "__main__":
    print(agent2_retrieve("WASA water supply complaint response time"))
