import fs from "fs";

export async function runSandbox(fileName) {
    console.log(`[Sandbox] Starting analysis for ${fileName}...`);

    // Simulated behavior (this is your "magic")
    const behaviors = [
        "Attempted outbound network connection",
        "Tried to modify system registry",
        "Created hidden background process"
    ];

    // Randomize behavior (makes demo dynamic)
    const selected = behaviors.sort(() => 0.5 - Math.random()).slice(0, 2);

    const result = {
        file: fileName,
        behavior: selected,
        verdict: "Suspicious"
    };

    console.log(`[Sandbox] Analysis complete`);

    return result;
}
export async function openSafeMode(fileName) {
    console.log(`[Safe Mode] Opening ${fileName} in isolated environment...`);

    console.log(`
  ----------------------------
  FILE VIEW (ISOLATED)
  ----------------------------
  Access restricted
  External connections blocked
  ----------------------------
  `);
}