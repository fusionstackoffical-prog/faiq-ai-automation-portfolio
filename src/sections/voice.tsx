"use client";
import { useEffect, useState } from "react";
import { AudioLines, Check, Pause, Play, RotateCcw } from "lucide-react";
import { SectionLabel } from "@/components/ui";

export function Voice() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      if (stage >= 4) setPlaying(false);
      else setStage(s => s + 1);
    }, 1600);
    return () => clearTimeout(timer);
  }, [playing, stage]);
  return <section className="section voice-section" id="voice"><SectionLabel index="04">AN INTELLIGENT FIRST RESPONSE</SectionLabel><div className="voice-grid"><div className="voice-copy"><span className="outline-tag">AI VOICE AGENTS</span><h2 data-reveal>Your business<br/>can answer<br/><span className="cyan">every call.</span></h2><p>AI voice agents can answer calls, understand customer needs, qualify opportunities, check availability and move customers toward booking.</p><span className="voice-footnote">A CONVERSATION THAT BECOMES AN ACTION.</span></div><div className="voice-console" data-reveal><div className="panel-topbar"><span><AudioLines size={15}/> VOICE INTERFACE</span><span className="demo-badge">VISUAL SIMULATION · NO AUDIO</span></div><div className={`waveform ${playing ? "playing" : ""}`} aria-hidden="true">{Array.from({ length: 49 }, (_, i) => <span key={i} style={{ height: `${Math.round(10 + Math.pow(Math.sin(i * 1.8), 2) * (1 - Math.abs(24 - i) / 29) * 95)}px`, animationDelay: `${(i * -.085).toFixed(3)}s` }}/>)}</div><div className="voice-controls"><span className="mono">{playing ? "PROCESSING CONVERSATION" : stage === 4 ? "CONVERSATION COMPLETE" : "READY WHEN YOU ARE"}</span><button aria-label={playing ? "Pause conversation" : stage === 4 ? "Replay conversation" : "Play conversation"} onClick={() => { if (stage === 4) { setStage(0); setPlaying(true); } else setPlaying(!playing); }}>{playing ? <Pause size={16}/> : stage === 4 ? <RotateCcw size={16}/> : <Play size={16}/>}</button></div><div className="transcript" aria-live="polite"><div className={`transcript-line ${stage >= 1 ? "spoken" : ""}`}><span>CUSTOMER</span><p>“My AC stopped cooling this morning.”</p></div><div className={`transcript-line agent-line ${stage >= 2 ? "spoken" : ""}`}><span><span className="status-dot"/> AI AGENT</span><p>“I can help with that. Let me check the next available appointment.”</p></div></div><div className="voice-data"><div><span>INTENT DETECTED</span><strong>{stage >= 2 ? "AC REPAIR" : "—"}</strong></div><div><span>LEAD</span><strong>{stage >= 3 ? "QUALIFIED" : "—"}</strong></div><div><span>AVAILABILITY</span><strong>{stage >= 4 ? "11:00 AM" : stage >= 3 ? "CHECKING" : "—"}</strong></div><div><span>BOOKING</span><strong>{stage >= 4 ? <><Check size={12}/>READY</> : "—"}</strong></div></div></div></div></section>;
}
