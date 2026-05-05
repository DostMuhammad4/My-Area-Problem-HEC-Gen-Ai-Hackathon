import os
import json
import random
import string
import pandas as pd
import chromadb
import fitz
from datetime import date, datetime
from groq import Groq
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer

# ── Setup ──────────────────────────────────────────────────
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
client       = Groq(api_key=GROQ_API_KEY)
embedder     = SentenceTransformer("all-MiniLM-L6-v2")
chroma       = chromadb.PersistentClient(path="./chroma_db")

df_complaints = pd.read_csv(
    "rag_docs/Pakistan_Civic_Complaints_Dataset_Islamabad.csv"
)

HISTORY_PATH = "complaint_history.csv"
if not os.path.exists(HISTORY_PATH):
    pd.DataFrame(columns=[
        "complaint_id","timestamp","complaint",
        "location","category","authority","urgency","status"
    ]).to_csv(HISTORY_PATH, index=False)

# ── Build ChromaDB on startup ──────────────────────────────
def build_chroma_on_startup():
    print("Building ChromaDB...")
    try:
        chroma.delete_collection("civic_docs")
    except:
        pass
    col = chroma.get_or_create_collection("civic_docs")

    # Load PDF
    for fname in os.listdir("rag_docs"):
        if fname.endswith(".pdf"):
            doc  = fitz.open(f"rag_docs/{fname}")
            text = " ".join([p.get_text() for p in doc])
            if text.strip():
                chunks = [text[i:i+400] for i in range(0, len(text), 400)]
                embeds = embedder.encode(chunks).tolist()
                ids    = [f"pdf_{i}" for i in range(len(chunks))]
                col.add(documents=chunks, embeddings=embeds, ids=ids)
                print(f"PDF loaded: {fname}")

    # Load CSV
    def row_to_text(row):
        return (f"Complaint in {row['area']}, {row['city']}: "
                f"{row['description_english']} "
                f"Category: {row['category']} | "
                f"Authority: {row['authority']} | "
                f"Severity: {row['severity']}")

    chunks = [row_to_text(r) for _, r in df_complaints.iterrows()]
    embeds = embedder.encode(chunks, batch_size=64).tolist()
    ids    = [f"csv_{i}" for i in range(len(chunks))]
    col.add(documents=chunks, embeddings=embeds, ids=ids)
    print(f"CSV loaded: {len(chunks)} complaints")
    print(f"Total ChromaDB docs: {col.count()}")
    return col

collection = build_chroma_on_startup()

# ── Authority Maps ─────────────────────────────────────────
PAKISTAN_AUTHORITY_MAP = {
    "islamabad": {"Water Supply":"Islamabad WASA","Electricity":"IESCO","Road":"CDA Roads Wing","Garbage":"CDA / IWMC","Sewage":"Islamabad WASA","Safety":"ICT Police","Street Lights":"CDA / MCI","Parks":"CDA Environment Wing","Encroachment":"CDA Enforcement Directorate"},
    "bani gala": {"Water Supply":"Islamabad WASA","Electricity":"IESCO","Road":"CDA Roads Wing","Garbage":"CDA / IWMC","Sewage":"Islamabad WASA","Safety":"ICT Police","Street Lights":"CDA / MCI","Parks":"CDA Environment Wing","Encroachment":"CDA Enforcement Directorate"},
    "f-10":      {"Water Supply":"Islamabad WASA","Electricity":"IESCO","Road":"CDA Roads Wing","Garbage":"CDA / IWMC","Sewage":"Islamabad WASA","Safety":"ICT Police","Street Lights":"CDA / MCI","Parks":"CDA Environment Wing","Encroachment":"CDA Enforcement Directorate"},
    "f-6":       {"Water Supply":"Islamabad WASA","Electricity":"IESCO","Road":"CDA Roads Wing","Garbage":"CDA / IWMC","Sewage":"Islamabad WASA","Safety":"ICT Police","Street Lights":"CDA / MCI","Parks":"CDA Environment Wing","Encroachment":"CDA Enforcement Directorate"},
    "g-9":       {"Water Supply":"Islamabad WASA","Electricity":"IESCO","Road":"CDA Roads Wing","Garbage":"CDA / IWMC","Sewage":"Islamabad WASA","Safety":"ICT Police","Street Lights":"CDA / MCI","Parks":"CDA Environment Wing","Encroachment":"CDA Enforcement Directorate"},
    "g-11":      {"Water Supply":"Islamabad WASA","Electricity":"IESCO","Road":"CDA Roads Wing","Garbage":"CDA / IWMC","Sewage":"Islamabad WASA","Safety":"ICT Police","Street Lights":"CDA / MCI","Parks":"CDA Environment Wing","Encroachment":"CDA Enforcement Directorate"},
    "lahore":    {"Water Supply":"WASA Lahore","Electricity":"LESCO","Road":"LDA","Garbage":"LWMC","Sewage":"WASA Lahore","Safety":"Lahore Police","Street Lights":"LDA","Parks":"LDA","Encroachment":"LDA Enforcement"},
    "gulberg":   {"Water Supply":"WASA Lahore","Electricity":"LESCO","Road":"LDA","Garbage":"LWMC","Sewage":"WASA Lahore","Safety":"Lahore Police","Street Lights":"LDA","Parks":"LDA","Encroachment":"LDA Enforcement"},
    "karachi":   {"Water Supply":"KWSB","Electricity":"K-Electric","Road":"KMC","Garbage":"KMC","Sewage":"KWSB","Safety":"Karachi Police","Street Lights":"KMC","Parks":"KMC","Encroachment":"KMC Enforcement"},
    "nazimabad": {"Water Supply":"KWSB","Electricity":"K-Electric","Road":"KMC","Garbage":"KMC","Sewage":"KWSB","Safety":"Karachi Police","Street Lights":"KMC","Parks":"KMC","Encroachment":"KMC Enforcement"},
    "peshawar":  {"Water Supply":"WSSP","Electricity":"PESCO","Road":"PDA","Garbage":"TMA Peshawar","Sewage":"WSSP","Safety":"Peshawar Police","Street Lights":"PDA","Parks":"PDA","Encroachment":"PDA Enforcement"},
    "rawalpindi":{"Water Supply":"WASA Rawalpindi","Electricity":"IESCO","Road":"RDA","Garbage":"RDA","Sewage":"WASA Rawalpindi","Safety":"Rawalpindi Police","Street Lights":"RDA","Parks":"RDA","Encroachment":"RDA Enforcement"},
    "multan":    {"Water Supply":"WASA Multan","Electricity":"MEPCO","Road":"MDA","Garbage":"MWM","Sewage":"WASA Multan","Safety":"Multan Police","Street Lights":"MDA","Parks":"MDA","Encroachment":"MDA Enforcement"},
    "faisalabad":{"Water Supply":"WASA Faisalabad","Electricity":"FESCO","Road":"FDA","Garbage":"FWM","Sewage":"WASA Faisalabad","Safety":"Faisalabad Police","Street Lights":"FDA","Parks":"FDA","Encroachment":"FDA Enforcement"},
    "quetta":    {"Water Supply":"WASA Quetta","Electricity":"QESCO","Road":"QDA","Garbage":"TMA Quetta","Sewage":"WASA Quetta","Safety":"Quetta Police","Street Lights":"QDA","Parks":"QDA","Encroachment":"QDA Enforcement"},
}

AUTHORITY_CONTACTS = {
    "Islamabad WASA":              {"phone":"1334",          "email":"info@wasaislamabad.gov.pk"},
    "CDA Roads Wing":              {"phone":"051-9252626",   "email":"complaint@cda.gov.pk"},
    "CDA / IWMC":                  {"phone":"051-9252626",   "email":"complaint@cda.gov.pk"},
    "CDA / MCI":                   {"phone":"051-9258000",   "email":"info@mci.gop.pk"},
    "CDA Enforcement Directorate": {"phone":"051-9252626",   "email":"complaint@cda.gov.pk"},
    "CDA Environment Wing":        {"phone":"051-9252626",   "email":"complaint@cda.gov.pk"},
    "IESCO":                       {"phone":"051-2284351",   "email":"complaint@iesco.gov.pk"},
    "WASA Lahore":                 {"phone":"042-99205316",  "email":"complaints@wasa.punjab.gov.pk"},
    "LESCO":                       {"phone":"042-111000118", "email":"complaints@lesco.gov.pk"},
    "KWSB":                        {"phone":"021-99333100",  "email":"info@kwsb.gos.pk"},
    "K-Electric":                  {"phone":"118",           "email":"info@ke.com.pk"},
    "KMC":                         {"phone":"021-99251200",  "email":"info@kmc.gos.pk"},
    "WSSP":                        {"phone":"091-9213601",   "email":"info@wssp.gov.pk"},
    "WASA Rawalpindi":             {"phone":"051-9290026",   "email":"info@wasa.gda.gov.pk"},
}

# ── Helper Functions ───────────────────────────────────────
def get_authority(location, category):
    loc = location.lower()
    for key in PAKISTAN_AUTHORITY_MAP:
        if key in loc:
            return PAKISTAN_AUTHORITY_MAP[key].get(category)
    return None

def generate_complaint_id():
    suffix = "".join(random.choices(string.digits, k=4))
    return f"AWAZ-2026-{suffix}"

def save_complaint(cid, complaint, location, category, authority, urgency):
    df = pd.read_csv(HISTORY_PATH)
    new_row = {
        "complaint_id": cid,
        "timestamp":    datetime.now().strftime("%Y-%m-%d %H:%M"),
        "complaint":    complaint,
        "location":     location,
        "category":     category,
        "authority":    authority,
        "urgency":      urgency,
        "status":       "Open"
    }
    df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)
    df.to_csv(HISTORY_PATH, index=False)

# ── RAG Cache ──────────────────────────────────────────────
rag_cache = {}

def agent2_retrieve(query, n=3):
    if query in rag_cache:
        return rag_cache[query]
    q_embed = embedder.encode([query]).tolist()
    results = collection.query(query_embeddings=q_embed, n_results=n)
    docs    = results["documents"][0]
    result  = "\n---\n".join(docs) if docs else "No context found."
    rag_cache[query] = result
    return result

# ── Agent 1 ────────────────────────────────────────────────
def agent1_classify(user_text, image_desc="", location=""):
    prompt = f"""You are a civic issue classifier for Pakistan.
Return ONLY valid JSON no markdown no explanation:
{{
  "category": "Water Supply|Road|Garbage|Electricity|Sewage|Safety|Street Lights|Parks|Encroachment",
  "authority": "correct local authority",
  "urgency": 5,
  "city": "city name",
  "area": "area name",
  "reason": "one sentence"
}}
Complaint: {user_text}
Image: {image_desc}
Location: {location}"""
    r   = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role":"user","content":prompt}],
        temperature=0.1
    )
    raw = r.choices[0].message.content.strip()
    raw = raw.replace("```json","").replace("```","").strip()
    result  = json.loads(raw)
    correct = get_authority(location, result["category"])
    if correct:
        result["authority"] = correct
    contact = AUTHORITY_CONTACTS.get(result["authority"], {})
    result["authority_phone"] = contact.get("phone","")
    result["authority_email"] = contact.get("email","")
    return result

# ── Agent 3 ────────────────────────────────────────────────
def agent3_write_letter(issue, authority, rag_context, urgency, phone="", email=""):
    today  = date.today().strftime("%B %d, %Y")
    prompt = f"""You are a Pakistani civic rights assistant.
Write a formal complaint letter to {authority} in English.
Use the legal context to cite real laws and SLA obligations.
Reference RTI Act 2017 Section 6 (10-day response) and
Section 26 (PKR 500,000 penalty for non-compliance).
Date: {today}
Issue: {issue}
Urgency: {urgency}/10
Authority contact: {phone} | {email}
Legal context:
{rag_context}
Format:
Date: {today}
Subject: Urgent Civic Complaint
To: The Director, {authority}
[Para 1: issue + location + duration]
[Para 2: cite laws from context]
[Para 3: demand resolution in 10 days under RTI Section 6]
[Para 4: warn about Section 26 PKR 500,000 penalty]
Yours sincerely,
Concerned Citizen"""
    r = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role":"user","content":prompt}],
        temperature=0.3
    )
    return r.choices[0].message.content

# ── Urgency Calculator ─────────────────────────────────────
def calculate_real_urgency(category, area, complaint_text):
    cat_map = {
        "Water Supply":"Water Supply","Road":"Roads",
        "Garbage":"Garbage","Electricity":"Street Lights",
        "Sewage":"Sewage","Street Lights":"Street Lights",
        "Parks":"Parks / Green Spaces","Encroachment":"Encroachment",
        "Safety":"Encroachment"
    }
    csv_cat    = cat_map.get(category, category)
    area_lower = area.lower()
    area_df    = df_complaints[
        df_complaints["area"].str.lower().str.contains(area_lower, na=False)
    ]
    open_in_area = len(area_df[area_df["status"]=="Open"])
    cat_df    = df_complaints[df_complaints["category"]==csv_cat]
    total_cat = len(cat_df)
    avg_days  = cat_df["resolution_days"].dropna().mean()
    avg_days  = round(float(avg_days),1) if not pd.isna(avg_days) else 0.0
    high_sev  = len(cat_df[cat_df["severity"]=="High"])
    score = 5
    if open_in_area >= 5:   score += 2
    elif open_in_area >= 2: score += 1
    if total_cat > 0:
        sev_ratio = high_sev / total_cat
        if sev_ratio > 0.6:   score += 2
        elif sev_ratio > 0.3: score += 1
    if avg_days > 15:  score += 1
    elif avg_days < 7: score -= 1
    urgent_words = ["days","week","weeks","month","overflow","burst",
                    "broken","accident","health","dangerous","emergency",
                    "flood","no water","no electricity"]
    matches = sum(1 for w in urgent_words if w in complaint_text.lower())
    score  += min(matches, 2)
    score   = max(1, min(10, score))
    return {
        "urgency":             score,
        "open_in_area":        open_in_area,
        "total_category":      total_cat,
        "avg_resolution_days": avg_days,
        "high_severity_count": high_sev
    }

def calculate_confidence(rag_context, letter):
    if "No context found" in rag_context:
        score = 60
    else:
        rag_words  = len(rag_context.split())
        legal_refs = sum(1 for kw in ["RTI","Section","WASA","CDA","PKR","Act"]
                         if kw in letter)
        score = min(95, 60 + min(rag_words // 10, 20) + (legal_refs * 3))
    bar = "█" * (score // 10) + "░" * (10 - score // 10)
    return f"Letter Quality: {score}%  [{bar}]"

def generate_urdu_letter(english_letter):
    if not english_letter.strip():
        return "Please generate English letter first."
    prompt = f"""Translate this formal complaint letter into proper Urdu.
Keep all names, phone numbers, emails, dates, and law references exactly as they are.
Make the Urdu sound formal and official like a government letter.
English Letter:
{english_letter}
Return ONLY the Urdu translation. No explanation. No English."""
    r = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role":"user","content":prompt}],
        temperature=0.2
    )
    return r.choices[0].message.content

def run_pipeline(complaint, location, image_desc=""):
    c            = agent1_classify(complaint, image_desc, location)
    urgency_data = calculate_real_urgency(
        c["category"], c.get("area", location), complaint
    )
    c["urgency"] = urgency_data["urgency"]
    c["stats"]   = urgency_data
    rag          = agent2_retrieve(
        f"{c['category']} {c['authority']} complaint Pakistan"
    )
    letter = agent3_write_letter(
        f"{complaint}. Location: {c.get('area','')}, {c.get('city','')}.",
        c["authority"], rag, c["urgency"],
        c["authority_phone"], c["authority_email"]
    )
    return {**c, "letter": letter, "rag_context": rag}

# ── FastAPI App ────────────────────────────────────────────
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "AWAZ API is live", "version": "1.0"}

@app.post("/submit")
async def submit(
    complaint: str = Form(...),
    location:  str = Form(...),
    email:     str = Form("")
):
    result = run_pipeline(complaint, location)
    cid    = generate_complaint_id()
    save_complaint(cid, complaint, location,
                   result["category"], result["authority"], result["urgency"])
    return {
        "complaint_id":   cid,
        "category":       result["category"],
        "authority":      result["authority"],
        "phone":          result.get("authority_phone",""),
        "email":          result.get("authority_email",""),
        "urgency":        result["urgency"],
        "stats":          result["stats"],
        "english_letter": result["letter"],
        "confidence":     calculate_confidence(result["rag_context"], result["letter"])
    }

@app.post("/urdu-letter")
async def urdu(english_letter: str = Form(...)):
    return {"urdu_letter": generate_urdu_letter(english_letter)}

@app.get("/history")
def history():
    try:
        return pd.read_csv(HISTORY_PATH).to_dict(orient="records")
    except:
        return []

@app.get("/heatmap-data")
def heatmap():
    cols = ["area","category","latitude","longitude",
            "severity","status","authority","sub_issue"]
    return df_complaints[cols].to_dict(orient="records")

@app.get("/stats")
def stats():
    return {
        "total":     len(df_complaints),
        "open":      len(df_complaints[df_complaints["status"]=="Open"]),
        "resolved":  len(df_complaints[df_complaints["status"].isin(["Resolved","Closed"])]),
        "top_issue": df_complaints["category"].value_counts().index[0],
        "avg_days":  round(df_complaints["resolution_days"].dropna().mean(), 1)
    }
