import fs from "fs";
import path from "path";
import { analyzeContent } from "./aiEngine.js";
import { handleAction } from "./actionEngine.js";

const WATCH_FOLDER = "./incoming";

// ✅ STEP 6 — GLOBAL RISK DATABASE (TOP LEVEL)
let threatDB = {};

console.log("[SentinelAI] Agent started...");
console.log("[Monitoring folder:", WATCH_FOLDER, "]");


// ✅ STEP 5 — BACKGROUND HEARTBEAT (TOP LEVEL)
setInterval(() => {
  console.log("[SentinelAI] Watching for threats...");
}, 10000);


// 🔁 MAIN EVENT LISTENER
fs.watch(WATCH_FOLDER, async (eventType, filename) => {
  if (!filename) return;

  const filePath = path.join(WATCH_FOLDER, filename);

  if (fs.existsSync(filePath)) {
    console.log(`\n[Event] New file detected: ${filename}`);

    try {
      const content = fs.readFileSync(filePath, "utf-8");

      // 🧠 Get previous risk (STEP 6 usage)
      const previous = threatDB[filename]?.risk || 0;
      const history = threatDB[filename]?.history || [];

      const result = await analyzeContent({
        content,
        file_metadata: { name: filename },
        previous_risk: previous,
        history: history,
        event_type: "file_upload"
      });

      console.log("[AI RESULT]:", result);

      // ✅ STEP 6 — UPDATE THREAT DATABASE
      threatDB[filename] = {
        risk: result.risk_score,
        history: [...history, "file uploaded"]
      };

      // 🔐 Trigger action
      await handleAction(result, filePath);

    } catch (err) {
      console.log("[ERROR]:", err.message);
    }
  }
});