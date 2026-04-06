import { runSandbox } from "./sandbox.js";

export async function handleAction(decision, fileName) {

    if (decision === "ALLOW") {
        console.log(`[Action] File allowed: ${fileName}`);
    }

    else if (decision === "WARN") {
        console.log(`[Warning] File looks suspicious: ${fileName}`);
    }

    else if (decision === "SANDBOX") {
        console.log(`[Action] Running file in sandbox...`);

        const result = await runSandbox(fileName);

        console.log(`[Sandbox Result]:`);
        result.behavior.forEach(b => console.log(`- ${b}`));
    }

    else if (decision === "BLOCK") {
        console.log(`[Blocked] File blocked: ${fileName}`);
    }
}