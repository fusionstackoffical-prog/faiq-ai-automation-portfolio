"use client";
import { useState } from "react";
import { ArrowUpRight, AudioLines, CalendarDays, Database, MessageSquare, RefreshCw, ScanLine, Workflow, Zap } from "lucide-react";
import { TechnologyMap } from "@/components/technology-map";
import { ServiceDiagram } from "@/components/service-diagram";
import { modules } from "@/lib/content";
import { SectionLabel } from "@/components/ui";

const icons = [AudioLines, CalendarDays, ScanLine, Database, MessageSquare, RefreshCw, Workflow, Zap];

export function Services() {
  const [active, setActive] = useState(0);
  const activeModule = modules[active];
  const Icon = icons[active];
  return <section className="section services-section" id="systems"><SectionLabel index="03">WHAT I BUILD</SectionLabel><div className="section-intro"><h2 data-reveal>The right system.<br/><span className="muted">For the work in your way.</span></h2><p>Built around your operation.<br/>Connected to the tools you already use.</p></div><div className="services-layout"><div className="module-list" role="tablist" aria-label="Automation services" aria-orientation="vertical">{modules.map((m, i) => <button role="tab" id={`module-${i}`} aria-controls="module-detail" aria-selected={active === i} tabIndex={active === i ? 0 : -1} key={m.title} className={active === i ? "selected" : ""} onClick={() => setActive(i)} onFocus={() => setActive(i)} onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setActive(i); }} onKeyDown={event => { let next = i; if (event.key === "ArrowDown") next = (i + 1) % modules.length; else if (event.key === "ArrowUp") next = (i + modules.length - 1) % modules.length; else if (event.key === "Home") next = 0; else if (event.key === "End") next = modules.length - 1; else return; event.preventDefault(); setActive(next); document.getElementById(`module-${next}`)?.focus(); }}><span>{String(i + 1).padStart(2, "0")}</span><h3>{m.title}</h3><ArrowUpRight size={20}/></button>)}</div><div className="module-preview" role="tabpanel" id="module-detail" aria-labelledby={`module-${active}`} tabIndex={0}><div className="module-preview-header"><span className="eyebrow">MODULE {String(active + 1).padStart(2, "0")} / SYSTEM PREVIEW</span><Icon size={22}/></div><div key={active} className="module-preview-inner"><ServiceDiagram active={active}/><h3>{activeModule.outcome}</h3><p>{activeModule.description}</p></div></div></div></section>;
}

export function Technology() {
  return <section className="section technology-section"><SectionLabel index="06">SYSTEM ARCHITECTURE</SectionLabel><div className="section-intro"><h2 data-reveal>Tools change.<br/><em>System thinking doesn’t.</em></h2><p>The value isn’t in a single tool.<br/>It’s in how the whole system works together.</p></div><TechnologyMap/></section>;
}
