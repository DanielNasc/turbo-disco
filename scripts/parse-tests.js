const fs = require("fs");

const results = JSON.parse(fs.readFileSync("test-results.json"));

const total = results.numTotalTests;
const passed = results.numPassedTests;
const failed = results.numFailedTests;

let output = `| Total | Passed | Failed |\n|-------|--------|--------|\n| ${total} | ${passed} | ${failed} |`;

if (failed > 0) {
  const failedTests = results.testResults
    .flatMap(r => r.assertionResults)
    .filter(t => t.status === "failed")
    .map(t => {
      const msg = t.failureMessages.join("\n  ");
      return `- ${t.fullName}\n  \`\`\`\n  ${msg}\n  \`\`\``;
    })
    .join("\n\n");

  output += `\n\n**Testes com falha:**\n${failedTests}`;
}

fs.writeFileSync("pr-comment.txt", output);
