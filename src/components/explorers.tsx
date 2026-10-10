"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Architecture = dynamic(() => import("./architecture").then(m => m.Architecture), { loading: () => <div className="architecture-loading">Loading system architecture…</div> });
const Engine = dynamic(() => import("@/sections/engine").then(m => m.Engine));
const Voice = dynamic(() => import("@/sections/voice").then(m => m.Voice));
const Technology = dynamic(() => import("@/sections/services").then(m => m.Technology));

export function DeferredArchitecture() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") { const timer = window.setTimeout(() => setReady(true), 0); return () => window.clearTimeout(timer); }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setReady(true); observer.disconnect(); } }, { rootMargin: "400px" });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="architecture-reserved">{ready ? <Architecture/> : <div className="architecture-loading"><span className="eyebrow">HVAC / CONNECTED WORKFLOWS</span><p>Customer intake → AI processing → availability → booking → follow-up</p><button className="text-link" onClick={() => setReady(true)}>Explore system architecture ↗</button></div>}</div>;
}
export function MoreExplorers() {
  const [open, setOpen] = useState(false);
  return <details className="more-explorers" onToggle={e => setOpen(e.currentTarget.open)}><summary>Explore the customer journey, decision stages & connected tools <span>↗</span></summary>{open && <><Engine/><Voice/><Technology/></>}</details>;
}
