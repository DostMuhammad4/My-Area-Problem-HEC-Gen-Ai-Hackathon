const BASE_URL = "https://muhammada0059-awaz-api.hf.space";

// 1. Submit Complaint
export async function submitComplaint(
  complaint: string,
  location: string,
  email?: string
) {
  const form = new FormData();
  form.append("complaint", complaint);
  form.append("location", location);
  if (email) form.append("email", email);

  const response = await fetch(`${BASE_URL}/submit`, {
    method: "POST",
    body: form,
  });
  if (!response.ok) throw new Error("Submission failed");
  return response.json();
}

// 2. Get Urdu Letter
export async function getUrduLetter(englishLetter: string) {
  const form = new FormData();
  form.append("english_letter", englishLetter);

  const response = await fetch(`${BASE_URL}/urdu-letter`, {
    method: "POST",
    body: form,
  });
  if (!response.ok) throw new Error("Urdu translation failed");
  return response.json();
}

// 3. Get Dashboard Stats
export async function getStats() {
  const response = await fetch(`${BASE_URL}/stats`);
  if (!response.ok) throw new Error("Stats fetch failed");
  return response.json();
}

// 4. Get Complaint History
export async function getHistory() {
  const response = await fetch(`${BASE_URL}/history`);
  if (!response.ok) throw new Error("History fetch failed");
  return response.json();
}

// 5. Health Check
export async function checkHealth() {
  const response = await fetch(`${BASE_URL}/`);
  return response.ok;
}

// 6. Get Heatmap Data
export async function getHeatmapData() {
  const response = await fetch(`${BASE_URL}/heatmap-data`);
  if (!response.ok) throw new Error('Heatmap fetch failed');
  return response.json();
}
