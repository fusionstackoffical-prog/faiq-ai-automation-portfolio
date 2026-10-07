"use client";
import { useState } from "react";
import { ArrowDown, ArrowUpRight, AudioLines, CalendarDays, Database, MessageSquare, RefreshCw, ScanLine, Workflow, Zap } from "lucide-react";
import { modules } from "@/lib/content";
import { SectionLabel } from "@/components/ui";

const icons = [AudioLines, CalendarDays, ScanLine, Database, MessageSquare, RefreshCw, Workflow, Zap];

export function Services() {
  const [active, setActive] = useState(0);
  const activeModule = modules[active];
  const Icon = icons[active];
  return <section className="section services-section"><SectionLabel index="05">WHAT I BUILD</SectionLabel><div className="section-intro"><h2 data-reveal>The right system.<br/><span className="muted">For the work in your way.</span></h2><p>Built around your operation.<br/>Connected to the tools you already use.</p></div><div className="services-layout"><div className="module-list" role="tablist" aria-label="Automation services" aria-orientation="vertical">{modules.map((m, i) => <button role="tab" id={`module-${i}`} aria-controls="module-detail" aria-selected={active === i} tabIndex={active === i ? 0 : -1} key={m.title} className={active === i ? "selected" : ""} onClick={() => setActive(i)} onFocus={() => setActive(i)} onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setActive(i); }} onKeyDown={event => { let next = i; if (event.key === "ArrowDown") next = (i + 1) % modules.length; else if (event.key === "ArrowUp") next = (i + modules.length - 1) % modules.length; else if (event.key === "Home") next = 0; else if (event.key === "End") next = modules.length - 1; else return; event.preventDefault(); setActive(next); document.getElementById(`module-${next}`)?.focus(); }}><span>{String(i + 1).padStart(2, "0")}</span><h3>{m.title}</h3><ArrowUpRight size={20}/></button>)}</div><div className="module-preview" role="tabpanel" id="module-detail" aria-labelledby={`module-${active}`} tabIndex={0}><div className="module-preview-header"><span className="eyebrow">MODULE {String(active + 1).padStart(2, "0")} / SYSTEM PREVIEW</span><Icon size={22}/></div><div key={active} className="module-preview-inner"><div className="mini-flow"><div>{activeModule.input}</div><ArrowDown size={18}/><div className="mini-flow-active"><Icon size={20}/>{activeModule.action}</div><ArrowDown size={18}/><div><span className="status-dot"/>{activeModule.output}</div></div><h3>{activeModule.outcome}</h3><p>{activeModule.description}</p></div></div></div></section>;
}

const architectureLayers = [
  { label: "INPUT / COMMUNICATION", tools: ["Forms", "Gmail", "Messaging", "Voice AI"] },
  { label: "ORCHESTRATION / INTELLIGENCE", tools: ["Webhooks", "n8n", "AI / LLM", "REST APIs"] },
  { label: "DATA / EXECUTION", tools: ["Supabase", "CRM", "Database", "Google Calendar"] },
];

export function Technology() {
  return <section className="section technology-section"><SectionLabel index="06">SYSTEM ARCHITECTURE</SectionLabel><div className="section-intro"><h2 data-reveal>Tools change.<br/><span className="muted">System thinking doesn’t.</span></h2><p>The value isn’t in a single tool.<br/>It’s in how the whole system works together.</p></div><div className="technology-map" data-reveal>{architectureLayers.map((layer, i) => <div className="tech-layer" key={layer.label}><div className="tech-layer-label"><span>0{i + 1}</span>{layer.label}</div><div className="tech-nodes">{layer.tools.map((tool, n) => <div className={`tech-node ${tool === "n8n" || tool === "AI / LLM" ? "tech-core" : ""}`} key={tool}><span className="tech-node-mark">{["◇", "⌘", "⊞", "+"][n]}</span>{tool}<span className="tech-port"/></div>)}</div></div>)}<div className="tech-footer"><span className="status-dot"/>CONNECTED BY LOGIC. DESIGNED AROUND YOUR BUSINESS.</div></div></section>;
}
