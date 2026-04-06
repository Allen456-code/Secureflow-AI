export async function runSandbox(fileName) {
    console.log(`\n[Sandbox] Starting analysis for ${fileName}...`);

    const behaviors = [
        "Attempted outbound network connection",
        "Tried to modify system registry",
        "Created hidden background process",
        "Accessed sensitive file paths",
        "Spawned unknown subprocess"
    ];

    
    const selected = behaviors
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);

    console.log("[Sandbox] Observed behaviors:");

    selected.forEach((b) => {
        console.log(`  - ${b}`);
    });

    console.log("[Sandbox] Analysis complete\n");

    return {
        file: fileName,
        behavior: selected,
        verdict: "Suspicious"
    };
}



export async function openSafeMode(fileName) {
    console.log(`\n[Safe Mode] Opening ${fileName} in isolated environment...`);

    console.log(`
----------------------------
 FILE VIEW (ISOLATED MODE)
----------------------------
 Access restricted
 Network disabled
 File system locked
----------------------------
`);
}
