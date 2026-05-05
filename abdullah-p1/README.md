# My Area Problems — P1: AI Backend (Abdullah)

## Role
Person 1 — AI Backend Lead

## What's in this folder
- `agents/` — All 3 AI agents
  - `agent1_classifier.py` — Classifies issue + finds correct authority
  - `agent2_rag.py` — Retrieves legal context from ChromaDB
  - `agent3_writer.py` — Generates formal complaint letter
- `pipeline.py` — Wires all agents together
- `app.py` — Full Gradio UI
- `requirements.txt` — All dependencies

## Tech Stack (100% Free)
| Layer | Tool |
|-------|------|
| LLM | Groq API — Llama 3.1 8B |
| Agents | LangChain |
| Vector DB | ChromaDB |
| Embeddings | sentence-transformers |
| Vision | BLIP-2 |
| Maps | Folium + OpenStreetMap |
| Location | Google Places API |
| UI | Gradio |

## SDGs
- SDG 6 — Clean Water and Sanitation
- SDG 11 — Sustainable Cities and Communities

## Setup
1. Add GROQ_API_KEY to Colab Secrets
2. Add GOOGLE_PLACES_KEY to Colab Secrets
3. Add GMAIL_ADDRESS + GMAIL_APP_PASSWORD to Colab Secrets
4. Run all cells top to bottom
