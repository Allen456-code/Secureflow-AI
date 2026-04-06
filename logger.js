import chalk from "chalk";

export function logEvent(message) {
  console.log(chalk.blue(`[EVENT] ${message}`));
}

export function logAI(message) {
  console.log(chalk.magenta(`[AI] ${message}`));
}

export function logDecision(message) {
  console.log(chalk.yellow(`[DECISION] ${message}`));
}
