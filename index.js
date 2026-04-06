#!/usr/bin/env node

import { Command } from "commander";
import {
  startAgent,
  stopAgent,
  getStatus,
  scanFile,
  openSafe,
  monitorSystem
} from "./commands.js";

const program = new Command();

program
  .name("sentinel")
  .description("SentinelAI Security CLI")
  .version("1.0.0");

program
  .command("start")
  .description("Start background agent")
  .action(startAgent);

program
  .command("stop")
  .description("Stop background agent")
  .action(stopAgent);

program
  .command("status")
  .description("Check agent status")
  .action(getStatus);

program
  .command("scan <input>")
  .description("Scan content")
  .action(scanFile);

program
  .command("open-safe <file>")
  .description("Open file in sandbox")
  .action(openSafe);

program
  .command("monitor")
  .description("Monitor system events")
  .action(monitorSystem);

program.parse();
