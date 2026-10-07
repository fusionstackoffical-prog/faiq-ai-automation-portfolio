"use client";
import { AlertTriangle, ArrowDownRight } from "lucide-react";
import { SectionLabel } from "@/components/ui";

const warnings = [
  ["01", "MISSED CALLS", "Incoming opportunity. No one to answer."],
  ["02", "SLOW LEAD RESPONSE", "A new enquiry is still waiting."],
  ["03", "MANUAL BOOKING", "Another round of back-and-forth."],
  ["04", "LOST FOLLOW-UPS", "A promising conversation goes quiet."],
  ["05", "DISCONNECTED SOFTWARE", "Same customer. Different records."],
  ["06", "REPETITIVE ADMIN", "Your team's time, on repeat."],
];
export function Problem() {
  return <section className="section problem-section" id="problem"><SectionLabel index="01">THE OPERATIONAL GAP</SectionLabel><div className="problem-heading"><h2 data-reveal>Your business doesn’t need<br/><span className="muted">more repetitive work.</span><br/>It needs <span className="cyan">better systems.</span></h2><ArrowDownRight className="section-arrow" size={64} strokeWidth={.8}/></div><div className="warning-log" data-reveal><div className="log-heading"><span><AlertTriangle size={14}/> OPERATIONAL FRICTION</span><span>COMMON FAILURE POINTS / 06</span></div>{warnings.map(([number, title, detail]) => <div className="warning-row" key={number}><span className="warning-number">{number}</span><span className="warning-symbol">!</span><h3>{title}</h3><p>{detail}</p><span className="warning-state">NEEDS ATTENTION</span></div>)}</div><div className="problem-resolution" data-reveal><span className="eyebrow">A DIFFERENT WAY TO OPERATE</span><h3>What if the business could<br/>handle it <span className="cyan">automatically?</span></h3><div className="flow-stem"><span/></div></div></section>;
}
