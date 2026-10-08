"use client";

import { useEffect, useRef, useState } from "react";
import { AudioLines, CalendarDays, Database, Mail, MessageSquare, RefreshCw, Users, Workflow } from "lucide-react";

const nodes = [
  { label: "VOICE AI", x: 28, y: 14, Icon: AudioLines },
  { label: "LEADS", x: 74, y: 15, Icon: Users },
  { label: "MESSAGING", x: 92, y: 41, Icon: MessageSquare },
  { label: "BOOKING", x: 81, y: 72, Icon: CalendarDays },
  { label: "DATABASE", x: 52, y: 89, Icon: Database },
  { label: "FOLLOW-UP", x: 18, y: 77, Icon: RefreshCw },
  { label: "CRM", x: 7, y: 46, Icon: Workflow },
  { label: "EMAIL", x: 47, y: 5, Icon: Mail },
];

export function Network({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [signal, setSignal] = useState<{ node: number; phase: "incoming" | "core" | "outgoing" } | null>(null);
  useEffect(() => {
    if (compact) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timers = new Set<number>();
    let visible = false;
    let cycle = 0;
    const later = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(() => { timers.delete(timer); callback(); }, delay);
      timers.add(timer);
    };
    const clear = () => { timers.forEach(window.clearTimeout); timers.clear(); };
    const play = () => {
      const input = [0, 7, 2][cycle % 3];
      const output = [3, 4, 6][cycle % 3];
      later(() => setSignal({ node: input, phase: "incoming" }), 2400);
      later(() => setSignal({ node: input, phase: "core" }), 6400);
      later(() => setSignal({ node: output, phase: "outgoing" }), 7600);
      later(() => setSignal(null), 11600);
      later(() => { cycle++; play(); }, 19000);
    };
    const refresh = () => {
      clear();
      setSignal(null);
      if (visible && !media.matches && !document.hidden) play();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; refresh(); }, { threshold: .2 });
    if (ref.current) observer.observe(ref.current);
    media.addEventListener("change", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => { clear(); observer.disconnect(); media.removeEventListener("change", refresh); document.removeEventListener("visibilitychange", refresh); };
  }, [compact]);
  const signalNode = signal ? nodes[signal.node] : null;
  const signalPath = signalNode ? signal?.phase === "incoming"
    ? `M ${signalNode.x * 6} ${signalNode.y * 6} Q ${signalNode.x * 6} 300 300 300`
    : `M 300 300 Q ${signalNode.x * 6} 300 ${signalNode.x * 6} ${signalNode.y * 6}` : "";
  return <div ref={ref} className={`network ${compact ? "network-compact" : "network-hero"} ${signal?.phase === "core" ? "core-receiving" : ""}`} role="img" aria-label="An AI automation core connects voice, leads, messaging, booking, database, follow-up, CRM and email."
    onPointerMove={event => {
      if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = event.currentTarget.getBoundingClientRect();
      ref.current?.style.setProperty("--rx", `${((event.clientY - rect.top) / rect.height - .5) * -7}deg`);
      ref.current?.style.setProperty("--ry", `${((event.clientX - rect.left) / rect.width - .5) * 7}deg`);
    }} onPointerLeave={() => { ref.current?.style.setProperty("--rx", "0deg"); ref.current?.style.setProperty("--ry", "0deg"); }}>
    <div className="network-perspective">
      <div className="network-orbit orbit-one"/><div className="network-orbit orbit-two"/><div className="network-orbit orbit-three"/>
      <svg className="network-paths" viewBox="0 0 600 600" aria-hidden="true">
        <defs><radialGradient id={compact ? "core-glow-mini" : "core-glow"}><stop stopColor="#FFFFFF" stopOpacity=".13"/><stop offset="1" stopColor="#FFFFFF" stopOpacity="0"/></radialGradient></defs>
        <circle cx="300" cy="300" r="220" fill={`url(#${compact ? "core-glow-mini" : "core-glow"})`}/>
        {nodes.map((n, i) => <g key={n.label}><path className={`network-line ${!compact && signal?.node === i ? "signal-line" : ""}`} d={`M 300 300 Q ${n.x * 6} 300 ${n.x * 6} ${n.y * 6}`}/>{compact && <path className="network-packet" style={{ animationDelay: `${i * -.7}s` }} d={`M 300 300 Q ${n.x * 6} 300 ${n.x * 6} ${n.y * 6}`}/>}</g>)}
        {!compact && signal && signal.phase !== "core" && <circle key={`${signal.node}-${signal.phase}`} r="2" className="hero-signal" style={{ offsetPath: `path('${signalPath}')` }}/>}
        <path d="M168 84 444 90 552 246 486 432 312 534 108 462 42 276Z" className="outer-path"/>
      </svg>
      <div className="intelligence-core"><div className="core-inner"><Workflow size={38} strokeWidth={1.2}/><span>AI CORE</span><small>INTELLIGENCE ENGINE</small></div><i className="core-tick tick-one"/><i className="core-tick tick-two"/></div>
      {nodes.map(({ label, x, y, Icon }) => <div className="network-node" key={label} style={{ left: `${x}%`, top: `${y}%` }}><div className="node-icon"><Icon size={19} strokeWidth={1.3}/></div><span>{label}</span></div>)}
      <span className="network-coordinate coordinate-one">SYS.01 / CONNECTED</span><span className="network-coordinate coordinate-two">AUTONOMOUS OPERATIONS</span>
    </div>
  </div>;
}
