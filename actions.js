import { runSandbox, openSafeMode } from "./sandbox.js";

export async function handleAction(result, fileName) {

    const { decision, risk_score } = result;

    console.log(`\n[Decision Engine]`);
    console.log(`Risk Score : ${risk_score}`);
    console.log(`Decision   : ${decision}`);

    switch (decision) {

        case "ALLOW":
            console.log(`[Action] File allowed: ${fileName}\n`);
            break;

        case "WARN":
            console.log(`[Warning] Suspicious file: ${fileName}\n`);
            break;

        case "SANDBOX":
            console.log(`[Action] Running file in sandbox...\n`);

            const sandboxResult = await runSandbox(fileName);

            
            if (sandboxResult.behavior.length > 1) {
                console.log("[Escalation] Multiple suspicious behaviors detected → BLOCK\n");
            }

            break;

        case "BLOCK":
            console.log(`[Blocked] File blocked: ${fileName}\n`);
            break;

        default:
            console.log("[Error] Unknown decision\n");
    }
}
