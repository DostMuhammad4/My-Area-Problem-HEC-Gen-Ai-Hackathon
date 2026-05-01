"""
Full pipeline: Agent1 -> Agent2 -> Agent3
Run this to test the complete flow before building UI.
"""
import os
from agents.agent1_classifier import agent1_classify
from agents.agent2_rag         import agent2_retrieve
from agents.agent3_writer      import agent3_write_letter

def run_pipeline(complaint_text: str, image_desc: str = "") -> dict:
    print("\n[1] Classifying issue...")
    classification = agent1_classify(complaint_text, image_desc)
    print("   →", classification)

    category  = classification["category"]
    authority = classification["authority"]
    urgency   = classification["urgency"]

    print("\n[2] Retrieving legal context from RAG...")
    rag_context = agent2_retrieve(f"{category} {authority} complaint rules Pakistan")
    print("   → Retrieved", len(rag_context.split()), "words of context")

    print("\n[3] Writing complaint letter...")
    letter = agent3_write_letter(complaint_text, authority, rag_context, urgency)

    return {
        "category":  category,
        "authority": authority,
        "urgency":   urgency,
        "letter":    letter
    }

if __name__ == "__main__":
    result = run_pipeline(
        "There is no water supply in F-10 Islamabad for the past 3 days.",
        "dry taps, empty overhead water tank"
    )
    print("\n" + "="*60)
    print("CATEGORY :", result["category"])
    print("AUTHORITY:", result["authority"])
    print("URGENCY  :", result["urgency"], "/ 10")
    print("="*60)
    print("\nGENERATED LETTER:\n")
    print(result["letter"])
