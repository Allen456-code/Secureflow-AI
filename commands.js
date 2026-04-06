import chalk from "chalk";
import { analyzeContent } from "../ai/aiEngine.js";
import { runSandbox } from "../sandbox/sandbox.js";

let agentRunning = false;

export function startAgent() {
  agentRunning = true;
  console.log(chalk.green("[SentinelAI] Agent started"));
}

export function stopAgent() {
  agentRunning = false;
  console.log(chalk.red("[SentinelAI] Agent stopped"));
}

export function getStatus() {
  console.log(
    agentRunning
      ? chalk.green("Agent is RUNNING")
      : chalk.red("Agent is STOPPED")
  );
}

export async function scanFile(input) {
  console.log(chalk.blue("[Scanning...]"));

  const result = await analyzeContent(input);

  console.log(chalk.yellow(`Risk Score: ${result.risk_score}`));
  console.log(chalk.magenta(`Threat: ${result.threat_type}`));
  console.log(chalk.cyan(`Decision: ${result.decision}`));
  console.log(chalk.white(`Reason: ${result.reasoning}`));
}

export async function openSafe(file) {
  console.log(chalk.blue(`[Opening ${file} in SAFE MODE]`));

  const result = await runSandbox(file);

  console.log(chalk.red("Sandbox Behavior:"));
  result.behavior.forEach((b) => {
    console.log(chalk.gray(`- ${b}`));
  });
}

export function monitorSystem() {
  console.log(chalk.blue("[EVENT] File detected: invoice.exe"));
  setTimeout(() => {
    console.log(chalk.magenta("[AI] Risk: 82%"));
  }, 1000);
  setTimeout(() => {
    console.log(chalk.yellow("[DECISION] SANDBOX"));
  }, 2000);
}

