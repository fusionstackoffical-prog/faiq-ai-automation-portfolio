"use client";

import { useId, useState, type CSSProperties } from "react";
import { AudioLines, CalendarDays, Database, Mail, MessageSquare, RefreshCw, Users, Workflow } from "lucide-react";
import styles from "./hero-galaxy.module.css";

const systems = [
  { name: "VOICE AI", Icon: AudioLines, x: 24, y: 19, path: "M240 171 C240 285 295 327 390 356" },
  { name: "EMAIL", Icon: Mail, x: 50, y: 11, path: "M500 99 C490 190 500 237 500 304" },
  { name: "LEADS", Icon: Users, x: 77, y: 20, path: "M770 180 C785 287 717 342 616 368" },
  { name: "MESSAGING", Icon: MessageSquare, x: 94, y: 46, path: "M940 414 C825 458 752 471 648 456" },
  { name: "BOOKING", Icon: CalendarDays, x: 81, y: 77, path: "M810 693 C822 542 716 513 623 529" },
  { name: "DATABASE", Icon: Database, x: 51, y: 85, path: "M510 765 C490 674 522 640 513 596" },
  { name: "FOLLOW-UP", Icon: RefreshCw, x: 21, y: 78, path: "M210 702 C210 584 287 539 378 530" },
  { name: "CRM", Icon: Workflow, x: 7, y: 47, path: "M70 423 C228 472 240 458 351 451" },
];
const orbits = [
  { rx: 474, ry: 412, angle: -8, opacity: .55 },
  { rx: 434, ry: 364, angle: -8, opacity: .85 },
  { rx: 393, ry: 310, angle: -8, opacity: .65 },
  { rx: 457, ry: 220, angle: -24, opacity: .7 },
  { rx: 425, ry: 233, angle: 20, opacity: .5 },
  { rx: 197, ry: 400, angle: 18, opacity: .45 },
  { rx: 287, ry: 381, angle: -30, opacity: .45 },
];
// Split at the ellipse's major axis: the rear arc is occluded by the sphere.
const ringBack = "M 190 450 A 310 83 0 0 1 810 450";
const ringFront = "M 810 450 A 310 83 0 0 1 190 450";

export function HeroGalaxy() {
  const id = useId().replace(/:/g, "");
  const [active, setActive] = useState<number | null>(null);
  return <div className={`network ${styles.galaxy}`} role="group" aria-label="AI Core and its eight connected business systems">
    <div className={styles.stage}>
    <svg className={styles.space} viewBox="0 0 1000 900" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-halo`}><stop stopColor="#fff" stopOpacity=".045"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></radialGradient>
        <linearGradient id={`${id}-orbit`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff" stopOpacity=".035"/><stop offset=".4" stopColor="#ddd" stopOpacity=".2"/><stop offset=".7" stopColor="#fff" stopOpacity=".08"/><stop offset="1" stopColor="#fff" stopOpacity=".16"/></linearGradient>
      </defs>
      <ellipse cx="500" cy="450" rx="410" ry="370" fill={`url(#${id}-halo)`}/>
      <g className={styles.stars}>{Array.from({ length: 32 }, (_, i) => <circle key={i} className={i % 9 === 0 ? styles.twinkle : undefined} cx={35 + ((i * 173) % 930)} cy={28 + ((i * 251) % 840)} r={i % 7 === 0 ? 1.1 : .6} opacity={.07 + (i % 4) * .035}/>)}</g>
      <g className={styles.orbits}>{orbits.map(({ rx, ry, angle, opacity }, i) => <g key={i} className={i > 3 ? styles.secondary : undefined}>
        <g className={i > 4 ? styles.orbitDrift : undefined}>
          <ellipse cx="500" cy="450" rx={rx} ry={ry} transform={`rotate(${angle} 500 450)`} fill="none" stroke={`url(#${id}-orbit)`} strokeWidth=".85" opacity={opacity}/>
          {i < 3 && <ellipse className={styles.orbitParticle} cx="500" cy="450" rx={rx} ry={ry} transform={`rotate(${angle} 500 450)`} pathLength="100" style={{ animationDuration: `${64 + i * 8}s`, animationDelay: `${i * -21}s` }}/>} 
        </g>
      </g>)}</g>
      {systems.map((node, i) => <g key={node.name} className={styles.connection} data-active={active === i}>
        <path d={node.path}/>
        {i % 3 === 0 && <path className={styles.signal} pathLength="100" style={{ animationDelay: `${i * -4.7}s` }} d={node.path}/>}
      </g>)}
    </svg>
    <svg className={`${styles.ring} ${styles.rear}`} viewBox="0 0 1000 900" aria-hidden="true"><g transform="rotate(-22 500 450)"><path d={ringBack}/><path d={ringBack} transform="translate(500 450) scale(1.025 1.09) translate(-500 -450)"/></g></svg>
    <div className={styles.sphere}>
      <div className={styles.surface}/><div className={styles.meridian}/><div className={styles.inner}>
        <Workflow strokeWidth={1.25} aria-hidden="true"/><span className={styles.coreTitle}>AI CORE</span><span className={styles.coreSubtitle}>INTELLIGENCE ENGINE</span>
      </div>
    </div>
    <svg className={`${styles.ring} ${styles.front}`} viewBox="0 0 1000 900" aria-hidden="true"><g transform="rotate(-22 500 450)"><path d={ringFront}/><path d={ringFront} transform="translate(500 450) scale(1.025 1.09) translate(-500 -450)"/><path className={styles.ringParticles} pathLength="100" d={ringFront}/></g></svg>
    <ul className={styles.nodes}>{systems.map(({ name, Icon, x, y }, i) => <li key={name} className={styles.node} style={{ "--x": `${x}%`, "--y": `${y}%`, "--delay": `${i * -1.3}s` } as CSSProperties} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
      <div className={styles.satellite}><span className={styles.icon}><Icon strokeWidth={1.3} aria-hidden="true"/></span><span className={styles.label}>{name}</span></div>
    </li>)}</ul>
    <span className={styles.coordinate}>AUTONOMOUS OPERATIONS</span>
    </div>
  </div>;
}
