"use client";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { SectionLabel } from "@/components/ui";
const stages = [
  ["Receive", "Incoming customer → AI agent", "Capture the request and understand intent before moving into your business process.", ["Customer request", "AI agent", "Understand intent"]],
  ["Decide", "Context before action", "Qualify the enquiry, check business data and validate availability against existing commitments.", ["Qualify request", "Business data", "Check availability"]],
  ["Act", "An operation, not just an answer", "Create or update the lead, book an appointment and synchronize the calendar.", ["Create / update lead", "Book appointment", "Sync calendar"]],
  ["Continue", "Keep the customer informed", "Confirm the outcome, arrange reminders and connect follow-up to the customer record.", ["Confirm customer", "Reminder", "Follow-up"]],
] as const;
export function Voice() {
  const [active, setActive] = useState(0);
  return <section className="section request-section" id="request"><SectionLabel index="02">FROM CUSTOMER REQUEST → BUSINESS ACTION</SectionLabel><div className="request-layout"><div><h2 data-reveal>A conversation.<br/><em>A chain of action.</em></h2><p className="section-copy">Your customer needs an answer. Your business needs the work behind it to happen. I connect the two.</p><div className="request-tabs" role="tablist" aria-label="Customer request stages">{stages.map(([title],i) => <button key={title} id={`request-tab-${i}`} role="tab" aria-selected={active===i} aria-controls="request-panel" tabIndex={active===i?0:-1} onClick={() => setActive(i)} onKeyDown={e => { let next=i; if(e.key==="ArrowRight") next=(i+1)%4; else if(e.key==="ArrowLeft") next=(i+3)%4; else if(e.key==="Home") next=0; else if(e.key==="End") next=3; else return; e.preventDefault(); setActive(next); document.getElementById(`request-tab-${next}`)?.focus(); }}><span>0{i+1}</span>{title}</button>)}</div></div><div id="request-panel" role="tabpanel" aria-labelledby={`request-tab-${active}`} className="request-operation" tabIndex={0}><span className="eyebrow">{stages[active][1]}</span><div className="request-flow" key={active}>{stages[active][3].map((label,i) => <div className="request-step" key={label} style={{animationDelay:`${i*130}ms`}}><span>{i===2?<Check size={18}/>:<ArrowRight size={18}/>}</span><h3>{label}</h3></div>)}</div><p>{stages[active][2]}</p><button className="text-link" onClick={() => setActive((active+1)%4)}>{active===3 ? "Explore from the start" : "Trace the next stage"}<ArrowRight size={17}/></button></div></div></section>;
}
