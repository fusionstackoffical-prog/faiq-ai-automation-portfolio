"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { SectionLabel } from "@/components/ui";

const approach = [
  { title: "Understand", detail: "Start with the work, not the tools.", copy: "Find the repetitive work, missed opportunities and disconnected information. Understand the people doing the work before changing how it happens." },
  { title: "Design", detail: "Give every decision a clear path.", copy: "Map the inputs, rules, exceptions and handoffs. Make the intended outcome clear before building the automation." },
  { title: "Connect", detail: "Make your existing tools work together.", copy: "Connect communication, business data, calendars and APIs around one coherent workflow. Keep information consistent across the operation." },
  { title: "Automate", detail: "Turn the design into working systems.", copy: "Build and test the workflow, including conflicts and failure paths. Give intelligent agents useful context, boundaries and a route to a human." },
  { title: "Optimize", detail: "Improve what happens in the real world.", copy: "Review the results with the team. Refine the logic, remove friction and improve the system as the business learns." },
];
export function Process() {
  const [active, setActive] = useState(0);
  return <section className="section approach-section" id="approach"><SectionLabel index="06">MY APPROACH</SectionLabel>
    <div className="approach-heading"><span className="eyebrow">THE PROBLEM BEFORE THE PLATFORM</span><h2 data-reveal>I don’t build automation<br/>for the sake of technology.<br/><span className="muted">I build systems that</span><br/><em>solve real problems.</em></h2></div>
    <div className="approach-track" role="tablist" aria-label="My approach">{approach.map((step, i) => <button key={step.title} role="tab" id={`approach-${i}`} aria-selected={i === active} aria-controls="approach-detail" tabIndex={i === active ? 0 : -1} onClick={() => setActive(i)} onKeyDown={e => { let next=i; if(e.key==='ArrowRight') next=(i+1)%5; else if(e.key==='ArrowLeft') next=(i+4)%5; else if(e.key==='Home') next=0; else if(e.key==='End') next=4; else return; e.preventDefault(); setActive(next); document.getElementById(`approach-${next}`)?.focus(); }}><span>0{i+1}</span><i/>{step.title}<ArrowUpRight size={16}/></button>)}</div>
    <div className="approach-detail" id="approach-detail" role="tabpanel" aria-labelledby={`approach-${active}`} tabIndex={0}><h3>{approach[active].detail}</h3><p>{approach[active].copy}</p></div>
  </section>;
}
export function About() {
  return <section className="section about-section" id="about"><SectionLabel index="02">THE HUMAN BEHIND THE SYSTEMS</SectionLabel><div className="about-grid">
    <div className="portrait-wrap" data-reveal><Image src="/images/faiq-portrait.jpg" width={1536} height={1536} sizes="(max-width: 700px) 88vw, 35vw" alt="Muhammad Faiq Khan wearing a dark suit in an office" className="portrait"/><div className="portrait-overlay"/><div className="portrait-caption"><span>MUHAMMAD FAIQ KHAN</span><span><MapPin size={12}/>ISLAMABAD, PAKISTAN</span></div><span className="portrait-index">FIG. 02 / THE BUILDER</span></div>
    <div className="about-copy"><span className="eyebrow">AI AUTOMATION & AI AGENT SPECIALIST</span><h2 data-reveal>I don’t automate<br/>for the sake of<br/><em>automation.</em></h2><p>I build intelligent systems around real business problems — connecting technology, decisions, and execution into one operation.</p><p className="human-statement">Technology handles the repetition.<br/>People handle what matters.</p><div className="about-facts"><div><strong>01</strong><span>YEAR OF EXPERIENCE</span></div><div><strong>Real work.</strong><span>REAL BUSINESS PROBLEMS.</span></div></div><div className="about-niches">HOME SERVICES <span>/</span> HVAC <span>/</span> LOCAL BUSINESSES</div></div>
  </div></section>;
}
