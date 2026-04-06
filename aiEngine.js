export async function analyzeContent(content) {
  // TEMP MOCK (replace with Gemini)

  return {
    risk_score: Math.floor(Math.random() * 100),
    threat_type: "phishing",
    decision: "SANDBOX",
    reasoning: "Suspicious link and urgency detected"
  };
}
