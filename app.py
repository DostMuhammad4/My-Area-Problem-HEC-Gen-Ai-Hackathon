"""
Gradio UI — run this cell last in Colab.
share=True gives a free public URL for demo day.
"""
import os
import gradio as gr
import folium, json
from pipeline import run_pipeline

# ── Heatmap helper ──────────────────────────────────────────
DEMO_REPORTS = [
    {"lat": 33.7090, "lon": 73.0473, "issue": "Water shortage F-10",    "cat": "Water",     "urgency": 8},
    {"lat": 33.7200, "lon": 73.0551, "issue": "Pothole G-9 main road",  "cat": "Road",      "urgency": 6},
    {"lat": 33.6938, "lon": 73.0651, "issue": "Garbage dump I-8",       "cat": "Garbage",   "urgency": 7},
    {"lat": 33.7295, "lon": 73.0931, "issue": "Sewage overflow E-7",    "cat": "Sewage",    "urgency": 9},
    {"lat": 33.7015, "lon": 73.0234, "issue": "Street light broken F-11","cat": "Electricity","urgency": 5},
]

COLOR_MAP = {
    "Water": "blue", "Road": "orange",
    "Garbage": "green", "Sewage": "red", "Electricity": "purple"
}

def build_heatmap():
    m = folium.Map(location=[33.7090, 73.0473], zoom_start=12,
                   tiles="OpenStreetMap")
    for r in DEMO_REPORTS:
        folium.CircleMarker(
            location=[r["lat"], r["lon"]],
            radius=r["urgency"] * 2,
            color=COLOR_MAP.get(r["cat"], "gray"),
            fill=True, fill_opacity=0.7,
            popup=f"{r['issue']} (Urgency: {r['urgency']}/10)"
        ).add_to(m)
    path = "/tmp/map.html"
    m.save(path)
    return path

# ── Main pipeline function ───────────────────────────────────
def handle_report(complaint, image):
    if not complaint.strip():
        return "Please describe your issue.", "", ""
    image_desc = "photo of civic issue uploaded" if image else ""
    result = run_pipeline(complaint, image_desc)
    summary = (f"Category: {result['category']}  |  "
               f"Authority: {result['authority']}  |  "
               f"Urgency: {result['urgency']}/10")
    return summary, result["letter"], build_heatmap()

# ── Gradio interface ─────────────────────────────────────────
with gr.Blocks(title="My Area Problems") as demo:
    gr.Markdown("# My Area Problems\n**AI-powered civic reporting for Pakistan** — SDG 6 & 11")

    with gr.Row():
        with gr.Column():
            complaint_box = gr.Textbox(
                label="Describe your issue (Urdu or English)",
                placeholder="e.g. No water supply in F-10 for 3 days...",
                lines=3
            )
            image_box = gr.Image(label="Upload photo (optional)", type="pil")
            submit_btn = gr.Button("Report Issue", variant="primary")

        with gr.Column():
            summary_box = gr.Textbox(label="AI Classification Result")
            letter_box  = gr.Textbox(label="Generated Complaint Letter", lines=15)

    map_html = gr.HTML(label="Live Issue Heatmap — Islamabad")

    submit_btn.click(
        fn=handle_report,
        inputs=[complaint_box, image_box],
        outputs=[summary_box, letter_box, map_html]
    )

    gr.Markdown("*Built for Agentic AI Hackathon | SDG 6 Clean Water · SDG 11 Sustainable Cities*")

if __name__ == "__main__":
    demo.launch(share=True)
