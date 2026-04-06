import fs from "fs";
import { analyzeContent } from "../ai/aiEngine.js";
import { runSandbox } from "../sandbox/sandbox.js";

let running = false;

export function startMonitoring() {
  running = true;
  console.log("[Agent] Monitoring started...");

  fs.watch("./incoming", async (event, filename) => {
    if (!filename) return;

    console.log(`[Agent] File detected: ${filename}`);

    const result = await analyzeContent(filename);

    console.log(`[AI] Risk: ${result.risk_score}`);
    console.log(`[Decision] ${result.decision}`);

    if (result.decision === "SANDBOX") {
      const sandboxResult = runSandbox(filename);
      console.log("[Sandbox Triggered]");
      sandboxResult.behavior.forEach(b => console.log("- " + b));
    }
  });
}

export function stopMonitoring() {
  running = false;
  console.log("[Agent] Monitoring stopped");
}
