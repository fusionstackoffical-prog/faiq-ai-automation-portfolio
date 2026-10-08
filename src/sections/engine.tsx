"use client";
import { useEffect, useRef, useState } from "react";
import { AudioLines, CalendarCheck, CalendarDays, Check, Database, MessageSquare, RefreshCw, ScanLine, UserRound } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workflow } from "@/lib/content";
import { SectionLabel } from "@/components/ui";
const icons = [UserRound, AudioLines, ScanLine, CalendarDays, CalendarCheck, Database, CalendarDays, MessageSquare, RefreshCw];
export function Engine() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const progress = { value: 0 };
      gsap.to(progress, { value: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 45%", scrub: .6 }, onUpdate: () => { track.current?.style.setProperty("--progress", String(progress.value)); setActive(Math.min(8, Math.floor(progress.value*8.99))); } });
    });
    return () => media.revert();
  }, []);
  return <section ref={root} className="section engine-section" id="journey"><SectionLabel index="05">THE CUSTOMER JOURNEY</SectionLabel><div className="section-intro"><h2 data-reveal>From first contact.<br/><em>To the next opportunity.</em></h2><p>Follow the signal through a connected operation. Scroll naturally, or select any stage to explore.</p></div><div className="engine-panel"><div className="panel-topbar"><span>CUSTOMER DATA / A CONNECTED JOURNEY</span><span>0{active+1} / 09</span></div><div ref={track} className="journey-track"><div className="journey-rail" aria-hidden="true"><i/><b/></div><div className="workflow-grid">{workflow.map((step,i) => { const Icon=icons[i]; return <button key={step.title} className={`workflow-node ${i<=active?"activated":""} ${i===active?"current":""}`} onClick={() => { setActive(i); track.current?.style.setProperty("--progress",String(i/8)); }} aria-pressed={i===active}><span className="workflow-order">0{i+1}</span><span className="workflow-node-icon">{i<active?<Check size={20}/>:<Icon size={20}/>}</span><span className="workflow-title">{step.title}</span></button>; })}</div></div><div className="engine-detail" aria-live="polite"><span className="eyebrow">0{active+1} / {workflow[active].title}</span><p>{workflow[active].detail}</p></div><div className="engine-footer">ILLUSTRATIVE DATA JOURNEY · SELECT ANY NODE TO EXPLORE</div></div></section>;
}
