import os
from groq import Groq
from datetime import date

client = Groq(api_key=os.environ["GROQ_API_KEY"])

def agent3_write_letter(issue: str, authority: str,
                         rag_context: str, urgency: int) -> str:
    today = date.today().strftime("%B %d, %Y")
    prompt = f"""
You are a Pakistani civic rights assistant.
Write a formal complaint letter to {authority} in English.
Use the legal context to cite relevant rules.
Always reference RTI Act 2017 Section 10 (10-day mandatory response).

Date: {today}
Issue: {issue}
Urgency level: {urgency}/10
Legal context:
{rag_context}

Format:
Date: {today}
Subject: Urgent Civic Complaint
To: The Director, {authority}

[3-4 paragraphs: issue, laws cited, demand action in 10 days]

Yours sincerely,
Concerned Citizen
"""
    r = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )
    return r.choices[0].message.content

if __name__ == "__main__":
    print(agent3_write_letter(
        "No water supply for 3 days in F-10 Islamabad", "WASA",
        "WASA must restore water within 24 hours per service charter.", 8
    ))
