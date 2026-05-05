import os, json
from groq import Groq

client = Groq(api_key=os.environ["GROQ_API_KEY"])

def agent1_classify(user_text: str, image_desc: str = "") -> dict:
    prompt = f"""
You are a civic issue classifier for Pakistan.
Classify the complaint and return ONLY valid JSON:
{{
  "category": "Water|Road|Garbage|Electricity|Sewage|Safety",
  "authority": "WASA|CDA|LDA|NEPRA|UC",
  "urgency": 1,
  "city_guess": "Islamabad|Lahore|Karachi|Other",
  "reason": "one sentence why"
}}
Complaint: {user_text}
Image seen: {image_desc}
Return ONLY JSON. No explanation. No markdown.
"""
    r = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1
    )
    raw = r.choices[0].message.content.strip()
    raw = raw.replace("```json","").replace("```","").strip()
    return json.loads(raw)

if __name__ == "__main__":
    result = agent1_classify(
        "No water supply in F-10 sector for 3 days",
        "dry taps, empty overhead tank visible"
    )
    print(result)
