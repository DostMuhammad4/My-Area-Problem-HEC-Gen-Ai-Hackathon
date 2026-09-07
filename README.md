# My Area Problems 🗺️
**AI-Powered Civic Reporting Platform for Pakistani Citizens**

> 🏆 **HEC Gen AI Hackathon Project** | Empowering citizens to report local infrastructure issues with AI-generated legal complaints | SDG 6 & SDG 11

---

## 🎯 The Problem

Pakistani citizens struggle to report local infrastructure problems effectively:
- **Lost in bureaucracy** — Complaints disappear without response
- **Lack legal grounding** — No formal documentation of issues
- **Language barriers** — Many citizens prefer Urdu over English
- **Accessibility gaps** — Non-literate users can't file complaints easily
- **No accountability** — Authorities ignore informal reports

## ✨ Our Solution

**My Area Problems** transforms casual citizen complaints into formal, legally-grounded letters addressed to the correct government authority — automatically, in real-time.

### How It Works
1. **Citizen reports issue** — Photo + voice/text description (Urdu or English)
2. **AI classifies problem** — Determines issue type & responsible authority
3. **AI retrieves legal context** — Pulls applicable Pakistani laws from knowledge base
4. **AI generates formal letter** — Creates legally-grounded, official complaint
5. **Citizen reviews & submits** — Via email, WhatsApp, or print

### Why This Matters
- ✅ **Legally grounded** — Every complaint cites applicable statutes
- ✅ **Multilingual** — Urdu + English voice input via Whisper STT
- ✅ **Accessible** — Non-literate citizens can file complaints via voice
- ✅ **Accountable** — Formal letters increase authority response rates
- ✅ **Zero friction** — Photo + voice → instant formal complaint in seconds

---

## 🌍 Impact & SDG Alignment

### SDG 6 — Clean Water and Sanitation
- Citizens report water contamination, pipe breaks, sanitation failures
- Legal complaints force authorities to respond
- Specific focus: WASA (Water Authority) accountability

### SDG 11 — Sustainable Cities and Communities
- Empowers communities to improve urban infrastructure
- Creates digital trail of civic engagement
- Targets: Roads (CDA), Garbage (LG), Electricity, Healthcare

---

## 🏗️ Tech Stack

| Layer | Technology | Owner |
|-------|-----------|-------|
| **Frontend** | React Native | P3: Nabeel |
| **Backend API** | FastAPI + LangChain | P2: Abdullah |
| **Speech-to-Text** | OpenAI Whisper (local) | P1: Dost Muhammad |
| **Database** | PostgreSQL | P1: Dost Muhammad |
| **Geospatial** | Folium + scikit-learn clustering | P1: Dost Muhammad |
| **LLM** | Groq API — Llama 3.1 8B | P2: Abdullah |
| **Agents** | LangChain (6 specialized agents) | P2: Abdullah |
| **Knowledge Base** | ChromaDB + RAG | P2: Abdullah + P4 (docs) |
| **Email/SMS** | SMTP + Twilio | P2: Abdullah |
| **Maps** | OpenStreetMap | P1: Dost Muhammad |
| **Deployment** | HuggingFace Spaces | P2: Abdullah |

---

## 👥 Team & 34-Hour Execution Plan

### **Person 1 (P1) — Data & Geo Engineer (Lead)** ⭐
**Name:** Dost Muhammad  
**Load:** ~14 hours active coding (Heaviest load)

#### Responsibilities
- PostgreSQL database schema design & optimization
- OpenAI Whisper STT integration (Urdu + English)
- Geospatial data clustering with scikit-learn
- Folium heatmap generation & visualization
- Real-time status tracking system
- GPS demo data preparation
- Live complaint location mapping

#### Hours 0–10: Foundation & Data Layer
- [ ] Set up PostgreSQL schema (complaints, users, locations, statuses, authorities)
- [ ] Create indexes for geospatial queries
- [ ] Integrate OpenAI Whisper for Urdu voice input
- [ ] Build audio preprocessing pipeline (normalization, noise reduction)
- [ ] Test Whisper with local audio samples

#### Hours 10–22: Geo & Tracking
- [ ] Build Agent 4: GPS clustering algorithm with scikit-learn
- [ ] Generate Folium heatmap HTML with real-time updates
- [ ] Build Agent 6: status tracking loop & database triggers
- [ ] Implement escalation logic & notification triggers
- [ ] Create real-time tracking display for frontend
- [ ] Optimize database queries for performance

#### Hours 22–34: Visualization & Demo Prep
- [ ] Polish Folium heatmap (visual centerpiece of demo)
- [ ] Prepare real Islamabad complaint data with GPS coordinates
- [ ] Create sample location database (5–10 real problem spots)
- [ ] Performance optimization & stress testing
- [ ] Mobile responsiveness for map views
- [ ] Live demo data loading & refresh logic

---

### **Person 2 (P2) — AI Backend Engineer**
**Name:** Abdullah  
**Load:** ~14 hours active coding (Heaviest load)

#### Responsibilities
- FastAPI backend architecture & API design
- LangChain agent orchestration & pipeline
- LLM agent development (6 specialized agents)
- ChromaDB + RAG integration
- Legal document embedding & retrieval
- Email/SMS delivery system (SMTP + Twilio)
- Authority routing logic
- HuggingFace Spaces deployment

#### Hours 0–10: Foundation & Core Agents
- [ ] Set up FastAPI project skeleton
- [ ] Configure LangChain & Groq API integration
- [ ] Build Agent 1 (intake + issue classification)
- [ ] Build Agent 3 (complaint drafter with templates)
- [ ] Connect ChromaDB with WASA/CDA/RTI documents
- [ ] Test retrieval quality with dummy queries

#### Hours 10–22: Advanced Agents & Integration
- [ ] Build Agent 2 (RAG retrieval optimization)
- [ ] Build Agent 5 (authority routing via SMTP/Twilio)
- [ ] Wire all agents into single pipeline
- [ ] Implement error handling & fallback mechanisms
- [ ] End-to-end testing with dummy data
- [ ] API endpoint testing & validation

#### Hours 22–34: Polish, Deployment & Demo Support
- [ ] Fix bugs from integration testing
- [ ] Harden error handling & resilience
- [ ] Performance optimization (query caching, batch processing)
- [ ] Deploy to HuggingFace Spaces
- [ ] Live agent monitoring & logging
- [ ] Support demo run-throughs & troubleshooting

---

### **Person 3 (P3) — Frontend Developer**
**Name:** Nabeel  
**Load:** ~12 hours active coding (Medium load)

#### Responsibilities
- React Native mobile app
- UI screens & navigation
- Voice + photo capture
- API integration
- Demo-ready polish
- Urdu font & RTL support

#### Hours 0–6: Core Screens
- [ ] Build screen 1: Home/Onboarding
- [ ] Build screen 2: Complaint submission form
- [ ] Build screen 3: Status tracker/dashboard
- [ ] Implement voice record button (calls Whisper)
- [ ] Photo picker with GPS capture

#### Hours 6–20: Integration
- [ ] Connect all screens to FastAPI backend
- [ ] Embed Folium heatmap as WebView
- [ ] Status polling & real-time updates
- [ ] Error handling & loading states

#### Hours 20–34: Demo-Ready
- [ ] Clean UI design — make it shine
- [ ] Urdu font support
- [ ] RTL layout where needed
- [ ] Create "judge mode" — one tap demo flow
- [ ] Pre-loaded complaint for instant submission

---

### **Person 4 (P4) — Content & Research Lead**
**Load:** ~10 hours research/writing (Non-Technical)

#### Responsibilities
- RAG document collection & organization
- Complaint template writing
- SDG impact narrative
- Pitch deck creation
- Authority contact database
- Demo script preparation

#### Hours 0–10: Documents for RAG
- [ ] Collect WASA, CDA, RTI Act 2017 documents (PDF/text)
- [ ] Write 5–8 sample complaint letters (Urdu + English)
  - Sewage issues, Road/pothole problems, Garbage collection failures
- [ ] Create authority contact list (emails, phones, addresses)
- [ ] Organize documents for ChromaDB indexing

#### Hours 10–22: Presentation Prep
- [ ] Write pitch deck (5–7 slides)
  - Problem statement, Solution overview, SDG alignment, Demo, Impact
- [ ] Prepare SDG impact narrative with Islamabad-specific stats
- [ ] Create Q&A document for judges

#### Hours 22–34: Demo Support
- [ ] Rehearse 3-minute demo script with team
- [ ] Time each section
- [ ] Prepare judge Q&A answers

---

### **Person 5 (P5) — Demo & Outreach Lead**
**Load:** ~8 hours active tasks (Non-Technical)

#### Responsibilities
- Live demo execution
- User testing & feedback
- Real-world content collection
- Social proof gathering
- Stall design
- Audience engagement

#### Hours 0–12: User Testing
- [ ] Act as primary tester — submit fake complaints
- [ ] Record voice notes, take photos, flag UX issues
- [ ] Find 2–3 real residents for feedback & quotes
- [ ] Document feedback systematically

#### Hours 12–24: Real Content
- [ ] Take 5–10 real photos of local issues
  - Potholes, open drains, garbage piles, broken water lines
  - Real locations in Islamabad with GPS coordinates
- [ ] Hand GPS data to P1 for Folium heatmap
- [ ] Design hackathon stall poster/banner (Canva)

#### Hours 24–34: Demo Delivery
- [ ] Lead demo presentation to judges
- [ ] Practice until delivery feels natural
- [ ] Handle judge questions about impact & expansion
- [ ] Showcase real user feedback

---

## 📊 34-Hour Milestone Checkpoints

| Checkpoint | Hour | Deliverable |
|-----------|------|-------------|
| **Kickoff** | 0 | Repo up, roles confirmed, P4 starts docs |
| **Foundation** | 8 | FastAPI + PostgreSQL skeleton, Whisper working, Folium prototype, screens started |
| **Core Features** | 16 | Agents 1–3 end-to-end, heatmap generating, pitch deck drafted |
| **Integration** | 24 | Full pipeline connected, real photos in heatmap, demo script ready |
| **Feature Freeze** | 30 | Bug fixes only. Full rehearsal with timer. No new features. |
| **Submission** | 34 | Demo presented, app live, team ready for questions |

---

## 🏛️ Agent Architecture

```
┌─────────────────────────────────────────────────────┐
│         Citizen Input (Voice + Photo + Location)    │
│              (P1: Whisper STT + GPS)                │
└────────────────────┬────────────────────────────────┘
                     │
        ┌────────────▼────────────┐
        │  Agent 1: Classifier    │  P2: Abdullah
        │ (Issue type + Authority)│
        └────────────┬────────────┘
                     │
        ┌────────────▼────────────┐
        │   Agent 2: RAG Query    │  P2: Abdullah
        │ (Search legal docs)     │
        └────────────┬────────────┘
                     │
        ┌────────────▼────────────┐
        │  Agent 3: Writer        │  P2: Abdullah
        │ (Generate formal letter)│
        └────────────┬────────────┘
                     │
        ┌────────────▼──────────────┐
        │ Agent 4: Geo Clustering   │  P1: Dost Muhammad
        │ (GPS heatmap generation)  │
        └────────────┬──────────────┘
                     │
        ┌────────────▼──────────────┐
        │ Agent 5: Email Routing    │  P2: Abdullah
        │ (Send to authority)       │
        └────────────┬──────────────┘
                     │
        ┌────────────▼──────────────┐
        │ Agent 6: Status Tracking  │  P1: Dost Muhammad
        │ (Monitor + escalate)      │
        └────────────┬──────────────┘
                     │
        ┌────────────▼──────────────┐
        │  P1: Folium Heatmap      │
        │ (Real-time visualization)│
        └──────────────────────────┘
```

---

## 🚀 Running the Application

### Prerequisites
- Python 3.10+
- Node.js 16+
- PostgreSQL 12+
- API Keys: GROQ_API_KEY, GOOGLE_PLACES_KEY, GMAIL credentials, Twilio (optional)

### Backend Setup

```bash
git clone https://github.com/dostmuhammaddev/My-Area-Problem-HEC-Gen-Ai-Hackathon.git
cd My-Area-Problem-HEC-Gen-Ai-Hackathon

python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
# Edit .env with your API keys

# P1 (Dost Muhammad): Initialize PostgreSQL
python -m alembic upgrade head

# P2 (Abdullah): Load RAG documents
python scripts/load_rag_documents.py

# Run backend
uvicorn main:app --reload
# Backend: http://localhost:8000
```

### Frontend Setup

```bash
cd Nabeel-P3-Frontend
npm install
npm run dev
# Frontend: http://localhost:5173
```

### Verify Everything Works

```bash
# Test Whisper STT (P1: Dost Muhammad)
curl -X POST http://localhost:8000/transcribe \
  -F "audio=@sample_urdu_audio.wav"

# Test agent pipeline (P2: Abdullah)
curl -X POST http://localhost:8000/report \
  -H "Content-Type: application/json" \
  -d '{
    "text": "No water in F-10",
    "location": {"lat": 33.7090, "lng": 73.0473},
    "language": "urdu"
  }'

# View heatmap (P1: Dost Muhammad)
open http://localhost:8000/heatmap.html
```

---

## 🎓 Key Features

### 1. **Multi-Agent Orchestration (P2: Abdullah)** 🤖
- **Agent 1**: Issue classification + authority detection
- **Agent 2**: RAG-powered legal document retrieval
- **Agent 3**: Formal complaint letter generation
- **Agent 5**: SMTP/Twilio delivery routing

### 2. **Multilingual Voice Input (P1: Dost Muhammad)** 🎤
- OpenAI Whisper local model
- Urdu + English automatic detection
- Real-time audio processing
- Accessible to non-literate citizens

### 3. **Legal Grounding via RAG (P2: Abdullah)** ⚖️
- ChromaDB vector search over Pakistani legal code
- WASA regulations, CDA bylaws, RTI Act 2017
- Every complaint cites applicable statutes

### 4. **Geospatial Visualization (P1: Dost Muhammad)** 🗺️
- Folium heatmap of all complaints
- GPS clustering by issue type
- Real-time updates with PostgreSQL
- Severity visualization

### 5. **Real-Time Status Tracking (P1: Dost Muhammad)** 📍
- PostgreSQL-backed complaint tracking
- Live status updates
- Escalation monitoring
- Demo data dashboard

### 6. **Smart Authority Routing (P2: Abdullah)**
- Automatic authority detection
- Contact database
- Email + SMS delivery

### 7. **Responsive Frontend (P3: Nabeel)**
- React Native mobile app
- Urdu font support
- RTL layout
- Voice + photo capture

---

## 📈 Success Metrics

| Metric | Target |
|--------|--------|
| Complaint generation time | <30s |
| Supported languages | 2+ |
| Issue types covered | 5+ |
| Authority accuracy | >90% |
| Real demo locations | 5+ |
| Heatmap refresh | <5s |

---

## 🔮 Future Enhancements

- [ ] WhatsApp integration
- [ ] Authority dashboard
- [ ] SMS alerts
- [ ] Mobile app (iOS/Android)
- [ ] Multi-city expansion
- [ ] Legal outcome tracking
- [ ] Automated escalation
- [ ] Video complaints

---

## 📜 License

MIT License — See LICENSE file

---

## ✍️ Team

| Role | Person | Load |
|------|--------|------|
| **P1: Data & Geo Engineer (Lead)** | Dost Muhammad | ~14 hrs |
| **P2: AI Backend Engineer** | Abdullah | ~14 hrs |
| **P3: Frontend Developer** | Nabeel | ~12 hrs |
| **P4: Content & Research** | [Support] | ~10 hrs |
| **P5: Demo & Outreach** | [Support] | ~8 hrs |
| **Total** | 5 members | **~34 hrs** |

**Built for:** HEC Gen AI Hackathon 2026  
**Project Duration:** 34 hours  
**SDGs:** SDG 6 (Clean Water) + SDG 11 (Sustainable Cities)

---

<div align="center">

### 🌟 Empower Citizens to Report Local Problems → Drive Real Change

**Give this project a star if you believe in civic tech!** ⭐

Built with ❤️ for Pakistan | Transforming complaints into action | 34-hour hackathon execution

</div>
