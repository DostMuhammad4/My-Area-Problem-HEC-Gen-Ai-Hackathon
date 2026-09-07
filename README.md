# My Area Problems 🗺️
**Agentic AI Civic Reporting Platform — Transforming Citizen Complaints into Legal Action**

> 🏆 **HEC Gen AI Hackathon Project** | SDG 6 & SDG 11 | 100% Free & Open Source

---

## 🎯 What This Solves

Citizens in Pakistan (and beyond) struggle to report local infrastructure problems effectively. Government complaints get lost in bureaucracy, lack legal grounding, and often don't reach the right authority.

**My Area Problems** automates this process:
1. **Citizen reports issue** — Photo + voice description (Urdu or English)
2. **AI classifies & routes** — Determines which authority is responsible
3. **AI retrieves legal context** — Pulls relevant laws from Pakistani civil/administrative code
4. **AI generates formal letter** — Writes a legally-grounded complaint addressed to the correct official
5. **Citizen submits** — Via Gmail, WhatsApp, or printed letter

### Impact
- **Multilingual**: Urdu + English voice input
- **No signup needed**: Photo + voice → instant complaint
- **Legally grounded**: Every complaint cites applicable laws
- **Reduces friction**: Transforms casual complaints into official action

---

## 🏗️ How It's Organized

```
My-Area-Problem-HEC-Gen-Ai-Hackathon/
├── README.md                    (this file)
├── app.py                       (main Gradio UI)
├── pipeline.py                  (3-agent orchestration)
├── requirements.txt             (Python dependencies)
├── .env.example                 (configuration template)
│
├── abdullah-p1/                 (AI Backend Lead)
│   ├── agents/
│   │   ├── agent1_classifier.py      (classifies issue + finds authority)
│   │   ├── agent2_rag.py             (retrieves laws from ChromaDB)
│   │   └── agent3_writer.py          (generates formal letter)
│   ├── pipeline.py
│   └── app.py                        (full Gradio app with agents)
│
├── Nabeel-P3-Frontend/          (Frontend + Maps)
│   └── (Figma design bundle + frontend code)
│
└── docs/                        (optional: setup guides, API docs)
```

### How It Fits Together

```
Voice/Photo Input (Gradio UI)
        ↓
    [Agent 1: Classifier]  ← "Is this about water? Roads? Garbage?"
        ↓ (classifies issue + finds authority)
    [Agent 2: RAG Retriever]  ← "Search ChromaDB for water-related laws"
        ↓ (retrieves legal context)
    [Agent 3: Letter Writer]  ← "Generate formal complaint citing laws"
        ↓
    Legal Complaint Letter (output)
        ↓
    Email / WhatsApp / Print
```

---

## 💻 Tech Stack

| Layer | Tool | Why? |
|-------|------|------|
| **LLM** | Groq API — Llama 3.1 8B | Fast, free, strong reasoning |
| **Agents** | LangChain | Multi-step agent orchestration |
| **Vector DB** | ChromaDB (local) | Fast semantic search over Pakistani laws |
| **Embeddings** | sentence-transformers | Multilingual (Urdu + English) |
| **Vision** | BLIP-2 (HuggingFace) | Image captioning for photos |
| **Voice** | Whisper (local) | Urdu + English speech-to-text |
| **Maps** | Folium + OpenStreetMap | Location context |
| **Location API** | Google Places API | Find nearest authority office |
| **UI** | Gradio | Fast, zero-config web UI |
| **Email** | Gmail API | Send formal complaints |
| **Deployment** | HuggingFace Spaces | Free, serverless hosting |

---

## 🚀 How to Run It

### Prerequisites
- Python 3.10+
- API Keys (all free tier):
  - `GROQ_API_KEY` — Get free at [console.groq.com](https://console.groq.com)
  - `GOOGLE_PLACES_KEY` — Get free at [Google Cloud Console](https://console.cloud.google.com)
  - `GMAIL_ADDRESS` + `GMAIL_APP_PASSWORD` — [Setup Gmail App Passwords](https://support.google.com/accounts/answer/185833)

### Local Setup

**1. Clone & Install**
```bash
git clone https://github.com/dostmuhammaddev/My-Area-Problem-HEC-Gen-Ai-Hackathon.git
cd My-Area-Problem-HEC-Gen-Ai-Hackathon
pip install -r requirements.txt
```

**2. Configure Environment**
```bash
cp .env.example .env
# Edit .env with your API keys
export GROQ_API_KEY="your_key_here"
export GOOGLE_PLACES_KEY="your_key_here"
export GMAIL_ADDRESS="your_email@gmail.com"
export GMAIL_APP_PASSWORD="your_app_password"
```

**3. Run Locally (Gradio)**
```bash
python app.py
```
Open `http://localhost:7860` in your browser.

### Deploy to HuggingFace Spaces

See [HuggingFace Spaces docs](https://huggingface.co/docs/hub/spaces) for free deployment.

---

## 📊 Project Structure & Team Roles

### **Person 1 — AI Backend Lead (Abdullah)**
**Folder:** `abdullah-p1/`

**Responsibilities:**
- Build & orchestrate 3 LLM agents (classification → RAG → letter generation)
- FastAPI backend + LangChain integration
- Groq API integration + error handling
- Connect agents to Gradio UI

**Key Files:**
- `agents/agent1_classifier.py` — Classifies citizen issue + determines authority
- `agents/agent2_rag.py` — Retrieves Pakistani laws from ChromaDB
- `agents/agent3_writer.py` — Generates formal, legal complaint letter
- `pipeline.py` — Orchestrates all 3 agents
- `app.py` — Gradio interface

---

### **Person 2 — Frontend + Maps (Nabeel)**
**Folder:** `Nabeel-P3-Frontend/`

**Responsibilities:**
- Design + build responsive web UI
- Integrate Folium maps (show complaint locations)
- Connect to backend API
- User experience optimizations

**Key Files:**
- Frontend code (React/HTML/Tailwind)
- Map integration for location context

---

### **Person 3 — Voice Processing**
**Responsibilities:**
- Whisper integration (Urdu + English STT)
- Audio preprocessing
- Error handling for poor audio quality

---

### **Person 4 — RAG / Knowledge Base**
**Responsibilities:**
- Collect Pakistani civil/administrative laws (PDF)
- Chunk & embed with sentence-transformers
- Index into ChromaDB
- Test retrieval quality

---

### **Person 5 — Demo & Outreach**
**Responsibilities:**
- Create demo videos
- Test end-to-end flow
- Gather user feedback
- Present at hackathon

---

## 🎓 Key Features

### 1. **Multi-Agent Orchestration**
Three specialized agents work in sequence:
- **Classifier Agent** → Understands the problem
- **RAG Agent** → Finds applicable laws
- **Writer Agent** → Generates formal complaint

### 2. **Multilingual Voice Input**
- Accepts Urdu or English spoken descriptions
- Whisper transcription + language detection

### 3. **Legal Grounding via RAG**
- Retrieves relevant laws from Pakistani civil/administrative code
- Every complaint cites applicable statutes
- Increases likelihood of authority response

### 4. **Photo Analysis**
- BLIP-2 vision model analyzes problem photos
- Adds visual evidence to complaint letter

### 5. **Smart Authority Routing**
- AI determines which authority is responsible
- Uses Google Places API to find contact info
- Generates address-specific complaint

---

## 📋 Setup Instructions

### Environment Variables (`.env`)
```env
GROQ_API_KEY=<your_groq_api_key>
GOOGLE_PLACES_KEY=<your_google_places_key>
GMAIL_ADDRESS=<your_gmail@gmail.com>
GMAIL_APP_PASSWORD=<your_16_char_app_password>
```

### First Run Checklist
- [ ] Install Python 3.10+
- [ ] `pip install -r requirements.txt`
- [ ] Add `.env` with API keys
- [ ] Run `python app.py`
- [ ] Test with sample issue (e.g., "Broken water pipe on Jinnah Road")

---

## 🌍 Why This Matters

### SDG 6 — Clean Water and Sanitation
Citizens can now formally report water contamination, pipe breaks, and sanitation issues with legal backing.

### SDG 11 — Sustainable Cities and Communities
Empowers communities to improve urban infrastructure through structured, legally-grounded complaints.

### For Pakistan Specifically
- Addresses governance gaps in civic complaint systems
- Bridges language barrier (Urdu + English)
- Reduces bureaucratic friction
- Builds precedent for digital civic engagement

---

## 📈 Metrics & Results

- **Complaint Success Rate:** [TBD — track with user feedback]
- **Average Time to Letter Generation:** ~10 seconds
- **Supported Issue Types:** Water, Roads, Garbage, Electricity, Healthcare, Education
- **Languages:** Urdu, English
- **Free Cost:** 100% (all services on free tier)

---

## 🔮 Future Enhancements

- [ ] WhatsApp integration (receive complaints via WhatsApp)
- [ ] Follow-up tracking (citizen can check status)
- [ ] Authority dashboard (officials can respond via platform)
- [ ] Complaint analytics (city-level problem heatmap)
- [ ] Multi-country support (Bangladesh, Sri Lanka, India)
- [ ] Legal outcome tracking (which complaints succeeded?)

---

## 📚 Resources & Documentation

- **LangChain Docs:** https://python.langchain.com/
- **Groq API:** https://console.groq.com
- **ChromaDB:** https://docs.trychroma.com
- **Gradio:** https://gradio.app/docs/
- **Pakistani Legal Code:** [Links to civil/admin law resources]

---

## 🤝 Contributing

This is a hackathon project — contributions welcome! Feel free to:
- Open issues for bugs/feature requests
- Submit PRs for improvements
- Test with real citizen complaints
- Help expand law database

---

## 📜 License

MIT License — See LICENSE file

---

## ✍️ Authors

- **Abdullah (P1)** — AI Backend Lead
- **Nabeel (P2)** — Frontend + Maps
- **P3** — Voice Processing
- **P4** — RAG / Knowledge Base
- **P5** — Demo & Outreach

**Maintained by:** Dost Muhammad  
**Built for:** HEC Gen AI Hackathon 2026

---

## 📞 Contact & Support

- **Email:** dostmuhammad7448@gmail.com
- **GitHub Issues:** [Open an issue](https://github.com/dostmuhammaddev/My-Area-Problem-HEC-Gen-Ai-Hackathon/issues)
- **LinkedIn:** [Dost Muhammad](https://www.linkedin.com/in/dost-muhammad411/)

---

<div align="center">

### 🌟 Help citizens report local problems → Drive real change

**Star this repo if you believe in civic tech!** ⭐

</div>
