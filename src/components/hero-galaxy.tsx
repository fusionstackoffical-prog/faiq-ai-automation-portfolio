"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
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

// Coordinates refer to the supplied 1670 × 940 artwork, not the square UI.
// Each pair of front/back layers shares one calibration and animation phase.
const tracks = [
  { rx: 772, ry: 267, angle: -12, duration: 31, delay: -8 },
  { rx: 692, ry: 317, angle: -8, duration: 43, delay: -27 },
  { rx: 741, ry: 221, angle: -17, duration: 37, delay: -18 },
  { rx: 650, ry: 327, angle: 8, duration: 49, delay: -39 },
  { rx: 758, ry: 280, angle: -12, duration: 59, delay: -43 },
  { rx: 623, ry: 353, angle: 14, duration: 41, delay: -4 },
];

function OrbitalLayer({ asset, side }: { asset: "ring" | "orbits"; side: "front" | "rear" }) {
  return <div data-core-layer={asset} data-core-side={side} className={`${styles.plane} ${styles[asset]} ${styles[side]}`}>
    <div className={styles.calibration}><div className={styles.slice}>
      <LayerImage asset={asset}/>
      <svg className={styles.signals} viewBox="0 0 1670 940" aria-hidden="true">
        {asset === "orbits" ? tracks.map(({ rx, ry, angle, duration, delay }, i) =>
          <ellipse key={i} cx="835" cy="465" rx={rx} ry={ry} transform={`rotate(${angle} 835 465)`} pathLength="100"
            className={`${styles.particle} ${i > 2 ? styles.secondary : ""}`} style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}/>
        ) : <ellipse cx="835" cy="465" rx="718" ry="220" transform="rotate(-20 835 465)" pathLength="100" className={styles.ringSignal}/>}
      </svg>
    </div></div>
  </div>;
}

export function HeroGalaxy() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [pulse, setPulse] = useState<{ system: number; sequence: number } | null>(null);
  const lastActivated = useRef<number | null>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 801px)");
    let visible = false;
    let frame = 0;
    let x = 0;
    let y = 0;
    const resetPointer = () => {
      x = 0; y = 0;
      element.style.setProperty("--px", "0px");
      element.style.setProperty("--py", "0px");
    };
    const sync = () => {
      const running = visible && !document.hidden && !media.matches;
      element.dataset.running = String(running);
      if (!running || !pointer.matches) {
        cancelAnimationFrame(frame); frame = 0; resetPointer();
      }
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(element);
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !pointer.matches || media.matches || !visible || document.hidden) return;
      const rect = element.getBoundingClientRect();
      x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
      y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
      if (!frame) frame = requestAnimationFrame(() => {
        element.style.setProperty("--px", `${x * 4}px`);
        element.style.setProperty("--py", `${y * 4}px`);
        frame = 0;
      });
    };
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", resetPointer);
    media.addEventListener("change", sync);
    pointer.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", resetPointer);
      media.removeEventListener("change", sync);
      pointer.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const activate = (index: number) => {
    setActive(index);
    // Mouse entry followed by focus must send just one packet.
    if (lastActivated.current !== index) {
      setPulse(previous => ({ system: index, sequence: (previous?.sequence ?? 0) + 1 }));
      lastActivated.current = index;
    }
  };
  const deactivate = () => { setActive(null); lastActivated.current = null; };
  const connectionPath = (index: number) => `M${systems[index].x * 10} ${systems[index].y * 10} Q${systems[index].x * 10} 500 500 490`;

  return <div ref={root} className={`network ${styles.galaxy}`} data-running="false" role="group" aria-label="Explore the AI intelligence ecosystem">
    <div className={styles.atmosphere}/>
    <div className={styles.artwork} role="img" aria-label="A cybernetic AI core encircled by luminous particle rings, orbital connections and vertical energy">
      {/* Reference compositions stay out of this stack. The planet appears once;
          ring/network front and rear cuts are complementary, not full copies. */}
      <div data-core-layer="energy" className={`${styles.plane} ${styles.energy}`}><div className={styles.calibration}><LayerImage asset="energy"/><i className={styles.beamFlow}/></div></div>
      <OrbitalLayer asset="orbits" side="rear"/>
      <OrbitalLayer asset="ring" side="rear"/>
      <div data-core-layer="planet" className={`${styles.plane} ${styles.planet}`}><div className={styles.calibration}><LayerImage asset="planet"/></div></div>
      <OrbitalLayer asset="ring" side="front"/>
      <OrbitalLayer asset="orbits" side="front"/>
      <div className={`${styles.plane} ${styles.highlights}`}><i/><i/></div>
      {pulse && <div key={pulse.sequence} className={styles.coreResponse} aria-hidden="true"/>}
    </div>
    <svg className={styles.overlay} viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
      <g className={styles.stars}>{Array.from({ length: 24 }, (_, i) => <circle key={i} cx={40 + (i * 173) % 920} cy={50 + (i * 241) % 900} r={i % 6 === 0 ? 1.6 : .7} opacity={.15 + i % 4 * .08}/>)}</g>
      {active !== null && <path className={styles.connection} d={connectionPath(active)}/>}
      {pulse && <path key={pulse.sequence} className={styles.incoming} pathLength="100" d={connectionPath(pulse.system)}/>}
    </svg>
    <div className={styles.coreLabel}><Workflow size={27} strokeWidth={1.2}/><span>AI CORE</span><small>INTELLIGENCE ENGINE</small></div>
    <ul className={styles.satellites}>{systems.map(({ name, Icon, x, y, purpose }, i) => <li key={name} style={{ "--x": `${x}%`, "--y": `${y}%`, "--delay": `${i * -1.7}s`, "--duration": `${9 + i * 1.3}s` } as CSSProperties}>
      <button type="button" className={styles.satellite} aria-label={`${name}: ${purpose}`} aria-expanded={active === i} aria-controls={`satellite-purpose-${i}`} onPointerEnter={e => { if (e.pointerType === "mouse") activate(i); }} onPointerLeave={e => { if (e.pointerType === "mouse" && lastActivated.current === i) deactivate(); }} onFocus={e => { if (e.currentTarget.matches(":focus-visible")) activate(i); }} onBlur={() => { if (lastActivated.current === i) deactivate(); }} onClick={e => { if (e.detail === 0 || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) { if (active === i) deactivate(); else activate(i); } else activate(i); }} onKeyDown={e => { if (e.key === "Escape") deactivate(); }}>
        <span className={styles.icon}><Icon size={22} strokeWidth={1.25}/></span><span className={styles.label}>{name}</span>
      </button>
      <span id={`satellite-purpose-${i}`} className={styles.purpose} hidden={active !== i}>{purpose}</span>
    </li>)}</ul>
    <span className={styles.annotation}>AUTONOMOUS OPERATIONS / 24:7</span>
  </div>;
}
