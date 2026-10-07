"use client";
import { useEffect, useRef, useState } from "react";
import { AudioLines, CalendarCheck, CalendarDays, Check, CircleCheck, Database, MessageSquare, RefreshCw, ScanLine, UserRound } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workflow } from "@/lib/content";
import { CornerMarks, SectionLabel } from "@/components/ui";

const icons = [UserRound, AudioLines, ScanLine, CalendarDays, CalendarCheck, Database, CalendarDays, MessageSquare, RefreshCw];

export function Engine() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(min-width: 1000px) and (prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.create({ trigger: root.current, start: "top top+=70", end: "+=1250", pin: true, onUpdate: self => setActive(Math.min(8, Math.floor(self.progress * 9))) });
    });
    return () => media.revert();
  }, []);
  return <section ref={root} className="section engine-section" id="systems"><SectionLabel index="02">THE AUTOMATION ENGINE</SectionLabel><div className="section-intro"><h2 data-reveal>From first contact.<br/><span className="muted">To the next opportunity.</span></h2><p>One connected flow. Every step has a purpose.<br/>Explore the nodes to see the system think.</p></div><div className="engine-panel"><CornerMarks/><div className="panel-topbar"><span className="panel-title"><span className="status-dot"/>CUSTOMER JOURNEY / INTERACTIVE WALKTHROUGH</span><span className="mono">{String(active + 1).padStart(2, "0")} / 09</span></div><div className="workflow-grid">{workflow.map((step, i) => { const Icon = icons[i]; return <button key={step.title} className={`workflow-node ${i <= active ? "activated" : ""} ${i === active ? "current" : ""}`} onClick={() => setActive(i)} aria-pressed={i === active}><span className="workflow-order">{String(i + 1).padStart(2, "0")}</span><span className="workflow-node-icon">{i < active ? <Check size={22}/> : <Icon size={22}/>}</span><span className="workflow-title">{step.title}</span><span className="workflow-state">{i <= active ? step.status : "STANDBY"}</span></button>; })}</div><div className="engine-detail" aria-live="polite"><div><span className="eyebrow">{active === 8 ? "AUTOMATION COMPLETE" : `EXECUTING STEP ${String(active + 1).padStart(2, "0")}`}</span><h3>{active === 8 ? "Nothing left behind." : workflow[active].title}</h3><p>{workflow[active].detail}</p></div><div className="engine-progress" aria-hidden="true">{active === 8 ? <CircleCheck size={46} strokeWidth={1}/> : <span>{String(active + 1).padStart(2, "0")}<small>/ 09</small></span>}</div></div><div className="engine-footer"><span>CONCEPTUAL FLOW · NO LIVE CUSTOMER DATA</span><span>SCROLL TO TRACE THE FLOW <span className="cyan">↓</span></span></div></div></section>;
}
