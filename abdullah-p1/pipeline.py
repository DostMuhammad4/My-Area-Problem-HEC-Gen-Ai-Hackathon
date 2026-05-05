"""
Full Pipeline: Agent1 -> Agent2 -> Agent3
"""
import os, json
from groq import Groq
from datetime import date
import chromadb
from sentence_transformers import SentenceTransformer

PROJECT  = os.environ.get("PROJECT_PATH",
           "/content/drive/MyDrive/my-area-problems")
client   = Groq(api_key=os.environ["GROQ_API_KEY"])
embedder = SentenceTransformer("all-MiniLM-L6-v2")
chroma   = chromadb.PersistentClient(path=f"{PROJECT}/chroma_db")
collection = chroma.get_or_create_collection("civic_docs")

rag_cache = {}

PAKISTAN_AUTHORITY_MAP = {
    "islamabad":  {"Water Supply":"Islamabad WASA","Electricity":"IESCO","Road":"CDA Roads Wing","Garbage":"CDA / IWMC","Sewage":"Islamabad WASA","Safety":"ICT Police","Street Lights":"CDA / MCI","Parks":"CDA Environment Wing","Encroachment":"CDA Enforcement Directorate"},
    "bani gala":  {"Water Supply":"Islamabad WASA","Electricity":"IESCO","Road":"CDA Roads Wing","Garbage":"CDA / IWMC","Sewage":"Islamabad WASA","Safety":"ICT Police","Street Lights":"CDA / MCI","Parks":"CDA Environment Wing","Encroachment":"CDA Enforcement Directorate"},
    "f-10":       {"Water Supply":"Islamabad WASA","Electricity":"IESCO","Road":"CDA Roads Wing","Garbage":"CDA / IWMC","Sewage":"Islamabad WASA","Safety":"ICT Police","Street Lights":"CDA / MCI","Parks":"CDA Environment Wing","Encroachment":"CDA Enforcement Directorate"},
    "f-6":        {"Water Supply":"Islamabad WASA","Electricity":"IESCO","Road":"CDA Roads Wing","Garbage":"CDA / IWMC","Sewage":"Islamabad WASA","Safety":"ICT Police","Street Lights":"CDA / MCI","Parks":"CDA Environment Wing","Encroachment":"CDA Enforcement Directorate"},
    "g-9":        {"Water Supply":"Islamabad WASA","Electricity":"IESCO","Road":"CDA Roads Wing","Garbage":"CDA / IWMC","Sewage":"Islamabad WASA","Safety":"ICT Police","Street Lights":"CDA / MCI","Parks":"CDA Environment Wing","Encroachment":"CDA Enforcement Directorate"},
    "g-11":       {"Water Supply":"Islamabad WASA","Electricity":"IESCO","Road":"CDA Roads Wing","Garbage":"CDA / IWMC","Sewage":"Islamabad WASA","Safety":"ICT Police","Street Lights":"CDA / MCI","Parks":"CDA Environment Wing","Encroachment":"CDA Enforcement Directorate"},
    "lahore":     {"Water Supply":"WASA Lahore","Electricity":"LESCO","Road":"LDA","Garbage":"LWMC","Sewage":"WASA Lahore","Safety":"Lahore Police","Street Lights":"LDA","Parks":"LDA","Encroachment":"LDA Enforcement"},
    "gulberg":    {"Water Supply":"WASA Lahore","Electricity":"LESCO","Road":"LDA","Garbage":"LWMC","Sewage":"WASA Lahore","Safety":"Lahore Police","Street Lights":"LDA","Parks":"LDA","Encroachment":"LDA Enforcement"},
    "karachi":    {"Water Supply":"KWSB","Electricity":"K-Electric","Road":"KMC","Garbage":"KMC","Sewage":"KWSB","Safety":"Karachi Police","Street Lights":"KMC","Parks":"KMC","Encroachment":"KMC Enforcement"},
    "nazimabad":  {"Water Supply":"KWSB","Electricity":"K-Electric","Road":"KMC","Garbage":"KMC","Sewage":"KWSB","Safety":"Karachi Police","Street Lights":"KMC","Parks":"KMC","Encroachment":"KMC Enforcement"},
    "peshawar":   {"Water Supply":"WSSP","Electricity":"PESCO","Road":"PDA","Garbage":"TMA Peshawar","Sewage":"WSSP","Safety":"Peshawar Police","Street Lights":"PDA","Parks":"PDA","Encroachment":"PDA Enforcement"},
    "rawalpindi": {"Water Supply":"WASA Rawalpindi","Electricity":"IESCO","Road":"RDA","Garbage":"RDA","Sewage":"WASA Rawalpindi","Safety":"Rawalpindi Police","Street Lights":"RDA","Parks":"RDA","Encroachment":"RDA Enforcement"},
    "multan":     {"Water Supply":"WASA Multan","Electricity":"MEPCO","Road":"MDA","Garbage":"MWM","Sewage":"WASA Multan","Safety":"Multan Police","Street Lights":"MDA","Parks":"MDA","Encroachment":"MDA Enforcement"},
    "faisalabad": {"Water Supply":"WASA Faisalabad","Electricity":"FESCO","Road":"FDA","Garbage":"FWM","Sewage":"WASA Faisalabad","Safety":"Faisalabad Police","Street Lights":"FDA","Parks":"FDA","Encroachment":"FDA Enforcement"},
    "quetta":     {"Water Supply":"WASA Quetta","Electricity":"QESCO","Road":"QDA","Garbage":"TMA Quetta","Sewage":"WASA Quetta","Safety":"Quetta Police","Street Lights":"QDA","Parks":"QDA","Encroachment":"QDA Enforcement"},
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

def get_authority(location, category):
    loc = location.lower()
    for key in PAKISTAN_AUTHORITY_MAP:
        if key in loc:
            return PAKISTAN_AUTHORITY_MAP[key].get(category)
    return None

def agent1_classify(user_text, image_desc="", location=""):
    prompt = f"""You are a civic issue classifier for Pakistan.
Return ONLY valid JSON no markdown:
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

def agent2_retrieve(query, n=3):
    if query in rag_cache:
        return rag_cache[query]
    q_embed = embedder.encode([query]).tolist()
    results = collection.query(query_embeddings=q_embed, n_results=n)
    docs    = results["documents"][0]
    result  = "\n---\n".join(docs) if docs else "No context found."
    rag_cache[query] = result
    return result

def agent3_write_letter(issue, authority, rag_context,
                         urgency, phone="", email=""):
    today = date.today().strftime("%B %d, %Y")
    prompt = f"""You are a Pakistani civic rights assistant.
Write a formal complaint letter to {authority} in English.
Cite RTI Act 2017 Section 6 (10-day response) and
Section 26 (PKR 500,000 penalty).

Date: {today}
Issue: {issue}
Urgency: {urgency}/10
Contact: {phone} | {email}
Legal context: {rag_context}

Format:
Date: {today}
Subject: Urgent Civic Complaint
To: The Director, {authority}
[4 paragraphs: issue, laws, demand 10 days, warn penalty]
Yours sincerely, Concerned Citizen"""
    r = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role":"user","content":prompt}],
        temperature=0.3
    )
    return r.choices[0].message.content

def run_pipeline(complaint, location, image_desc="",
                 urgency_override=None):
    c   = agent1_classify(complaint, image_desc, location)
    if urgency_override:
        c["urgency"] = urgency_override
    rag = agent2_retrieve(
        f"{c['category']} {c['authority']} complaint Pakistan"
    )
    letter = agent3_write_letter(
        f"{complaint}. Location: {c.get('area','')}, {c.get('city','')}.",
        c["authority"], rag, c["urgency"],
        c["authority_phone"], c["authority_email"]
    )
    return {**c, "letter": letter, "rag_context": rag}
