"use client";
import { useEffect, useRef, useState } from "react";
import { AudioLines, Database, GitBranch, Pause, Play, Radio, Workflow, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { signalRoute, systemEdges, systemNodes, type SystemNode } from "@/lib/architecture";
const icons = { input: Radio, ai: AudioLines, logic: GitBranch, data: Database, action: Workflow };
const byId = new Map(systemNodes.map(node => [node.id, node]));
function connector(a: SystemNode, b: SystemNode) {
  if (a.x === b.x) return `M ${a.x+76} ${a.y+50} C ${a.x+76} ${a.y+75}, ${b.x+76} ${b.y-25}, ${b.x+76} ${b.y}`;
  const forward = b.x > a.x;
  const x1 = a.x + (forward ? 152 : 0), x2 = b.x + (forward ? 0 : 152);
  return `M ${x1} ${a.y+25} C ${(x1+x2)/2} ${a.y+25}, ${(x1+x2)/2} ${b.y+25}, ${x2} ${b.y+25}`;
}
export function Architecture() {
  const root = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(-1);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update(); media.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); media.removeEventListener("change", update); };
  }, []);
  useEffect(() => {
    if (!playing || reduced || !visible || selected) return;
    const timer = window.setInterval(() => setStep(s => (s+1) % signalRoute.length), 1800);
    return () => clearInterval(timer);
  }, [playing, reduced, visible, selected]);
  const current = signalRoute[step], next = signalRoute[step+1];
  const focused = selected ? byId.get(selected) : null;
  const neighbors = new Set(selected ? systemEdges.filter(e => e.includes(selected)).flat() : []);
  return <div ref={root} className="architecture-panel">
    <div className="canvas-toolbar"><span><i className="status-dot"/>HVAC / CONNECTED WORKFLOWS</span><div className="canvas-controls">
      <button aria-label={playing ? "Pause architecture signals" : "Play architecture signals"} aria-pressed={playing} onClick={() => setPlaying(!playing)}>{playing ? <Pause size={15}/> : <Play size={15}/>}</button>
      <button aria-label="Zoom out architecture" disabled={zoom === 1} onClick={() => setZoom(z => Math.max(1, z-.25))}><ZoomOut size={17}/></button>
      <span>{Math.round(zoom*100)}%</span><button aria-label="Zoom in architecture" disabled={zoom === 1.75} onClick={() => setZoom(z => Math.min(1.75, z+.25))}><ZoomIn size={17}/></button>
      <button aria-label="Reset architecture view" onClick={() => { setZoom(1); root.current?.querySelector(".canvas-scroll")?.scrollTo({left:0,top:0}); }}><Maximize2 size={15}/></button>
    </div></div>
    <div className="canvas-scroll" tabIndex={0} role="region" aria-label="Interactive HVAC architecture. Scroll horizontally to explore. Tab through nodes for descriptions.">
      <div className="canvas-stage" style={{ width: `${zoom*100}%`, minWidth: `calc(var(--canvas-min) * ${zoom})` }}>
        <svg viewBox="0 0 1540 690" className="system-map" aria-label="Branching booking, rescheduling, cancellation and follow-up workflows">
          {[['01 / INPUT',25],['02 / PROCESSING',215],['03 / DECISIONS',405],['04 / DATA',595],['05 / BOOKING',785],['06 / ACTIONS',1165],['07 / FOLLOW-UP',1355]].map(([label,x]) => <text key={label} x={x} y="47" className="cluster-label">{label}</text>)}
          <text x="785" y="89" className="branch-label">NEW BOOKING</text><text x="785" y="368" className="branch-label">CHANGE / CANCEL</text><text x="595" y="551" className="branch-label">RECORDS / RETURN / REACTIVATE</text>
          {systemEdges.map(([from,to]) => {
            const d = connector(byId.get(from)!, byId.get(to)!);
            const related = !selected || from===selected || to===selected;
            const live = from===current && to===next;
            return <g key={`${from}-${to}`} className={related ? "map-edge" : "map-edge dimmed"}><path d={d} className={selected && related ? "edge-path emphasized" : "edge-path"}/>{live && playing && visible && !reduced && !selected && <circle key={step} r="3.5" className="map-signal" style={{ offsetPath: `path('${d}')` }}/>}</g>;
          })}
          {systemNodes.map(node => { const Icon = icons[node.kind]; return <foreignObject key={node.id} x={node.x} y={node.y} width="154" height="53" className={selected && !neighbors.has(node.id) ? "map-node-wrap dimmed" : "map-node-wrap"}>
            <button className={`map-node ${node.kind} ${selected===node.id || current===node.id ? "node-lit" : ""}`} aria-describedby="architecture-description" aria-label={`${node.label}: ${node.detail}`} onMouseEnter={() => setSelected(node.id)} onMouseLeave={() => setSelected(null)} onFocus={() => setSelected(node.id)} onBlur={() => setSelected(null)} onClick={() => setSelected(node.id)} onKeyDown={e => { if(e.key==="Escape") { setSelected(null); e.currentTarget.blur(); } }}><Icon size={16}/><span>{node.label}<small>{node.kind === "logic" ? "CONDITIONAL LOGIC" : node.kind === "data" ? "READ / WRITE" : node.kind === "ai" ? "INTELLIGENCE" : node.kind === "input" ? "ENTRY POINT" : "WORKFLOW ACTION"}</small></span><i/></button>
          </foreignObject>; })}
        </svg>
        {focused && <div className="node-tooltip" role="tooltip" style={{ left:`${Math.min(79, focused.x/1540*100)}%`, top:`${(focused.y+58)/690*100}%` }}><strong>{focused.label}</strong><p>{focused.detail}</p></div>}
      </div>
    </div>
    <div className="canvas-detail" id="architecture-description" aria-live="polite"><span className="eyebrow">{focused ? focused.label : "EXPLORE THE ARCHITECTURE"}</span><p>{focused?.detail || "Select a node to trace its connections. Explore booking, rescheduling, cancellation and customer follow-up as connected workflows."}</p><span className="canvas-hint">HOVER / TAP TO INSPECT · SCROLL TO EXPLORE</span></div>
  </div>;
}
