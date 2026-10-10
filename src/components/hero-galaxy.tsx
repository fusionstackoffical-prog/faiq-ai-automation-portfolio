"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { AudioLines, CalendarDays, Database, Mail, MessageSquare, RefreshCw, Users, Workflow } from "lucide-react";
import styles from "./hero-galaxy.module.css";

const systems = [
  { name: "EMAIL", Icon: Mail, x: 50, y: 11, purpose: "Intelligent communication workflows." },
  { name: "VOICE AI", Icon: AudioLines, x: 20, y: 26, purpose: "Intelligent customer conversations." },
  { name: "LEADS", Icon: Users, x: 82, y: 25, purpose: "Capture enquiries. Qualify opportunities." },
  { name: "MESSAGING", Icon: MessageSquare, x: 93, y: 49, purpose: "Connected conversations across channels." },
  { name: "BOOKING", Icon: CalendarDays, x: 82, y: 75, purpose: "Automated appointment scheduling." },
  { name: "DATABASE", Icon: Database, x: 52, y: 89, purpose: "Business knowledge, synchronized." },
  { name: "FOLLOW-UP", Icon: RefreshCw, x: 22, y: 77, purpose: "Timely follow-ups that keep work moving." },
  { name: "CRM", Icon: Workflow, x: 7, y: 51, purpose: "Connected customer information." },
];

function LayerImage({ asset }: { asset: "planet" | "orbits" | "ring" | "energy" }) {
  return <picture>
    <source media="(max-width: 600px)" srcSet={`/images/ai-core-${asset}-mobile.webp`} type="image/webp"/>
    <Image src={`/images/ai-core-${asset}.webp`} alt="" width={1670} height={940} unoptimized loading="eager" fetchPriority={asset === "planet" ? "high" : "auto"}/>
  </picture>;
}

export function HeroGalaxy() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  return <div ref={root} className={`network ${styles.galaxy}`} role="group" aria-label="Explore the AI intelligence ecosystem"
    onPointerMove={event => {
      if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = event.currentTarget.getBoundingClientRect();
      root.current?.style.setProperty("--px", `${((event.clientX - rect.left) / rect.width - .5) * 7}px`);
      root.current?.style.setProperty("--py", `${((event.clientY - rect.top) / rect.height - .5) * 7}px`);
    }} onPointerLeave={() => { root.current?.style.setProperty("--px", "0px"); root.current?.style.setProperty("--py", "0px"); }}>
    <div className={styles.atmosphere}/>
    <div className={styles.artwork} role="img" aria-label="A cybernetic AI core encircled by luminous particle rings, orbital connections and vertical energy">
      <div className={`${styles.plane} ${styles.stardust}`}><LayerImage asset="planet"/></div>
      <div className={`${styles.plane} ${styles.energy}`}><LayerImage asset="energy"/></div>
      <div className={`${styles.plane} ${styles.orbits} ${styles.rear}`}><LayerImage asset="orbits"/></div>
      <div className={`${styles.plane} ${styles.ring} ${styles.rear}`}><LayerImage asset="ring"/></div>
      <div className={`${styles.plane} ${styles.planet}`}><LayerImage asset="planet"/></div>
      <div className={`${styles.plane} ${styles.ring} ${styles.front}`}><LayerImage asset="ring"/></div>
      <div className={`${styles.plane} ${styles.orbits} ${styles.front}`}><LayerImage asset="orbits"/></div>
    </div>
    <svg className={styles.overlay} viewBox="0 0 1000 1000" aria-hidden="true">
      <g className={styles.stars}>{Array.from({ length: 24 }, (_, i) => <circle key={i} cx={40 + (i * 173) % 920} cy={50 + (i * 241) % 900} r={i % 6 === 0 ? 1.6 : .7} opacity={.15 + i % 4 * .08}/>)}</g>
      {[[-20, 419, 174], [14, 365, 284], [-38, 380, 257]].map(([angle, rx, ry], i) => <g key={angle} transform={`rotate(${angle} 500 500)`}>
        <ellipse cx="500" cy="500" rx={rx} ry={ry} className={styles.orbit}/>
        <ellipse cx="500" cy="500" rx={rx} ry={ry} pathLength="100" className={styles.particle} style={{ animationDelay: `${i * -19}s`, animationDuration: `${55 + i * 11}s` }}/>
      </g>)}
      {active !== null && <g key={active} className={styles.connection}>
        <path d={`M${systems[active].x * 10} ${systems[active].y * 10} Q${systems[active].x * 10} 500 500 500`}/>
        <path className={styles.incoming} pathLength="100" d={`M${systems[active].x * 10} ${systems[active].y * 10} Q${systems[active].x * 10} 500 500 500`}/>
      </g>}
    </svg>
    <div className={styles.coreLabel}><Workflow size={27} strokeWidth={1.2}/><span>AI CORE</span><small>INTELLIGENCE ENGINE</small></div>
    <ul className={styles.satellites}>{systems.map(({ name, Icon, x, y, purpose }, i) => <li key={name} style={{ "--x": `${x}%`, "--y": `${y}%`, "--delay": `${i * -.8}s` } as CSSProperties}>
      <button type="button" className={styles.satellite} aria-label={`${name}: ${purpose}`} aria-expanded={active === i} aria-controls={`satellite-purpose-${i}`} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(i)} onBlur={() => setActive(null)} onClick={() => setActive(active === i ? null : i)} onKeyDown={e => { if (e.key === "Escape") setActive(null); }}>
        <span className={styles.icon}><Icon size={22} strokeWidth={1.25}/></span><span className={styles.label}>{name}</span>
      </button>
      <span id={`satellite-purpose-${i}`} className={styles.purpose} hidden={active !== i}>{purpose}</span>
    </li>)}</ul>
    <span className={styles.annotation}>AUTONOMOUS OPERATIONS / 24:7</span>
  </div>;
}
