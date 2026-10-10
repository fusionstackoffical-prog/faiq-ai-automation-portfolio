"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Play, Pause, RotateCcw } from "lucide-react";
import { SectionLabel } from "@/components/ui";
import { simulateAppointment, type Scenario } from "@/lib/simulation";

export function Simulation() {
  const [scenario, setScenario] = useState<Scenario>("available");
  const [service, setService] = useState("AC maintenance");
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const steps = simulateAppointment(scenario, service);
  const complete = step === steps.length - 1;
  useEffect(() => {
    if (!running || complete) return;
    const timer = window.setTimeout(() => setStep(previous => previous + 1), 850);
    return () => window.clearTimeout(timer);
  }, [running, complete, step]);
  function run() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setStep(steps.length - 1); setRunning(false); return; }
    if (complete || step < 0) setStep(0);
    setRunning(true);
  }
  function reset() { setRunning(false); setStep(-1); }
  return <section className="section simulation-section" id="demo"><SectionLabel index="05">INSIDE THE INTELLIGENCE</SectionLabel>
    <div className="section-intro"><h2 data-reveal>One request.<br/><em>Watch what happens.</em></h2><p>A working simulation of appointment logic. Explore a successful booking, a conflicting slot, or a request outside working hours.</p></div>
    <div className="simulation-console"><div className="simulation-input">
      <span className="eyebrow">SIMULATION / NO LIVE ACTIONS</span><h3>Set the conditions.</h3>
      <label htmlFor="demo-service">CUSTOMER REQUEST</label><select id="demo-service" value={service} disabled={running && !complete} onChange={e => { setService(e.target.value); reset(); }}><option>AC maintenance</option><option>Heating repair</option></select>
      <label htmlFor="demo-scenario">AVAILABILITY SCENARIO</label><select id="demo-scenario" value={scenario} disabled={running && !complete} onChange={e => { setScenario(e.target.value as Scenario); reset(); }}><option value="available">Available slot</option><option value="conflict">Existing appointment conflict</option><option value="after-hours">Outside working hours</option></select>
      <blockquote>“Can I book {service.toLowerCase()} for tomorrow at {scenario === "after-hours" ? "19:00" : "10:00"}?”</blockquote>
      <div className="simulation-controls">{running && !complete ? <button className="button button-primary" onClick={() => setRunning(false)}><Pause size={15}/>Pause</button> : <button className="button button-primary" onClick={run}><Play size={15}/>{complete ? "Run again" : step < 0 ? "Run simulation" : "Continue"}</button>}<button className="simulation-reset" aria-label="Reset simulation" onClick={reset}><RotateCcw size={18}/></button></div>
      <button className="text-link simulation-next" disabled={complete} onClick={() => { setRunning(false); setStep(previous => Math.min(previous + 1, steps.length - 1)); }}>Next step<ArrowRight size={15}/></button>
      <p className="simulation-disclaimer">Sample data only. No real appointments, database changes, or messages.</p>
    </div><div className="simulation-output"><div className="simulation-topbar"><span>EXECUTION TRACE</span><span>{step < 0 ? "AWAITING INPUT" : complete ? "COMPLETE" : running ? "PROCESSING" : "PAUSED"}</span></div>
      <ol className="simulation-steps">{steps.map((item, i) => <li key={item.title} data-state={i > step ? "pending" : item.state} aria-current={i === step ? "step" : undefined}><span className="simulation-marker">{i <= step && item.state === "success" ? <Check size={14}/> : String(i + 1).padStart(2, "0")}</span><div><h4>{item.title}</h4><p>{i <= step ? item.detail : "Waiting for the previous step."}</p></div><span className="simulation-state">{i > step ? "QUEUED" : item.state === "review" ? "REVIEW" : item.state === "skipped" ? "SKIPPED" : "DONE"}</span></li>)}</ol>
      <p className="simulation-result" role="status">{step < 0 ? "Choose a scenario, then run the simulation." : complete ? scenario === "available" ? "Simulation complete — booking and confirmation prepared." : "Simulation complete — booking skipped; alternative time prepared." : `${steps[step].title}: ${steps[step].detail}`}</p>
    </div></div>
  </section>;
}
