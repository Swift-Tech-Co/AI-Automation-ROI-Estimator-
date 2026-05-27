#!/usr/bin/env node
/**
 * AI Automation ROI Estimator — CLI
 * Swift Tech Co. — https://swifttechco.com
 *
 * Usage:
 *   node cli.js
 *   node cli.js --process "Data entry & processing" --team "5 to 15 people" \
 *               --hours 40 --rate 35
 */

const { PROCESSES, TEAM_SIZES, calculate } = require("./calculator");
const readline = require("readline");

const args = process.argv.slice(2);
const getArg = (name) => { const i = args.indexOf(name); return i !== -1 ? args[i + 1] : null; };

const process_  = getArg("--process");
const teamSize   = getArg("--team");
const hours      = getArg("--hours");
const rate       = getArg("--rate");

if (process_ && teamSize && hours && rate) {
  const result = calculate(process_, teamSize, parseFloat(hours), parseFloat(rate));
  console.log(`Annual savings: $${result.annualSavings.toLocaleString()} | Payback: ${result.paybackMonths}mo | 5yr ROI: ${result.roi5yrPct}%`);
  process.exit(0);
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(r => rl.question(q, r));

async function interactive() {
  console.log("\nAI Automation ROI Estimator");
  console.log("Swift Tech Co. — https://swifttechco.com");
  console.log("=".repeat(48));

  const processes = Object.keys(PROCESSES);
  console.log("\nProcess to automate:");
  processes.forEach((p, i) => console.log(`  ${i + 1}. ${p}`));
  const pIdx = parseInt(await ask(`Select (1-${processes.length}): `), 10) - 1;

  const sizes = Object.keys(TEAM_SIZES);
  console.log("\nTeam size:");
  sizes.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
  const sIdx = parseInt(await ask(`Select (1-${sizes.length}): `), 10) - 1;

  const hours = parseFloat(await ask("\nTotal team hours per week on this process: "));
  const rate  = parseFloat(await ask("Average hourly cost (USD): "));
  rl.close();

  const result = calculate(processes[pIdx], sizes[sIdx], hours, rate);
  console.log("\n" + "=".repeat(48));
  console.log("ROI Projection");
  console.log(`  Annual savings:        $${result.annualSavings.toLocaleString()}`);
  console.log(`  Implementation cost:   $${result.implCost.toLocaleString()}`);
  console.log(`  Payback period:        ${result.paybackMonths} months`);
  console.log(`  5-year ROI:            ${result.roi5yrPct}%`);
  console.log(`  Automation rate:       ${result.autoRatePct}%`);
  console.log(`  Hours saved per week:  ${result.hoursSavedPerWeek}`);
  console.log("\nGet a detailed automation plan: https://swifttechco.com/contact");
}

interactive().catch(e => { console.error(e.message); process.exit(1); });
