import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";

const source = fs.readFileSync("src/lib/simulation.ts", "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const simulation = { exports: {} };
new Function("exports", "module", compiled)(simulation.exports, simulation);
const { simulateAppointment } = simulation.exports;

for (const scenario of ["available", "conflict", "after-hours"]) {
  const steps = simulateAppointment(scenario, "Heating repair");
  assert.equal(steps.length, 8);
  assert.match(steps[0].detail, /Heating repair/);
  assert.equal(steps[3].state, scenario === "available" ? "success" : "review");
  assert.equal(steps[5].state, scenario === "available" ? "success" : "skipped");
  assert.match(steps[6].detail, scenario === "available" ? /heating repair.*confirmed/ : /unavailable.*14:00/);
  assert.match(steps[7].detail, /Nothing is sent/);
  if (scenario === "after-hours") assert.match(steps[3].detail, /19:00.*outside/);
  assert.deepEqual(steps, simulateAppointment(scenario, "Heating repair"));
}
console.log("Simulation checks passed: available, conflict, after-hours, deterministic results and skipped booking paths.");
