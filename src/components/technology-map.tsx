"use client";
import { useEffect, useRef, useState } from "react";

const layers = [
  { label: "INPUT / COMMUNICATION", tools: ["Forms", "Gmail", "Messaging", "Voice AI"] },
  { label: "ORCHESTRATION / INTELLIGENCE", tools: ["Webhooks", "n8n", "AI / LLM", "REST APIs"] },
  { label: "DATA / EXECUTION", tools: ["Supabase", "CRM", "Database", "Google Calendar"] },
];
const details: Record<string,string> = {
  Forms: "Structured requests enter through forms and trigger the workflow.",
  Gmail: "Email becomes a connected input and a channel for customer communication.",
  Messaging: "SMS and WhatsApp connect customer conversations to business actions.",
  "Voice AI": "Spoken requests become structured information the system can act on.",
  Webhooks: "Events from connected tools initiate the appropriate workflow.",
  n8n: "The orchestration layer coordinates logic, integrations and execution.",
  "AI / LLM": "Language understanding supports intent detection and qualification.",
  "REST APIs": "Defined API calls connect the workflow to external business tools.",
  Supabase: "A shared data layer holds leads, appointments and availability.",
  CRM: "Customer context stays attached to leads and operational updates.",
  Database: "Consistent records keep individual workflows connected.",
  "Google Calendar": "Appointments are synchronized with the business calendar.",
};
const links = [
  ["Forms","Webhooks"],["Gmail","n8n"],["Messaging","n8n"],["Voice AI","AI / LLM"],
  ["Webhooks","n8n"],["n8n","AI / LLM"],["n8n","REST APIs"],
  ["n8n","Supabase"],["n8n","CRM"],["REST APIs","Database"],["REST APIs","Google Calendar"],
];
type Wire = { from:string; to:string; d:string };
export function TechnologyMap() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [wires, setWires] = useState<Wire[]>([]);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const measure = () => {
      const bounds = element.getBoundingClientRect();
      const nodes = new Map([...element.querySelectorAll<HTMLElement>("[data-tool]")].map(node => [node.dataset.tool, node.getBoundingClientRect()]));
      setWires(links.map(([from,to]) => {
        const a=nodes.get(from)!, b=nodes.get(to)!;
        const sameRow = Math.abs(a.top-b.top)<10;
        const x1=(sameRow ? a.right : a.left+a.width/2)-bounds.left;
        const x2=(sameRow ? b.left : b.left+b.width/2)-bounds.left;
        const y1=(sameRow ? a.top+a.height/2 : a.bottom)-bounds.top;
        const y2=(sameRow ? b.top+b.height/2 : b.top)-bounds.top;
        return {from,to,d:sameRow ? `M${x1} ${y1} H${x2}` : `M${x1} ${y1} C${x1} ${(y1+y2)/2},${x2} ${(y1+y2)/2},${x2} ${y2}`};
      }));
    };
    const observer=new ResizeObserver(measure); observer.observe(element);
    document.fonts.ready.then(measure);
    return () => observer.disconnect();
  }, []);
  return <div ref={root} className="technology-map">
    <svg className="tech-connectors" aria-hidden="true">{wires.map(({from,to,d},i) => <g key={`${from}-${to}`} className={active && from!==active && to!==active ? "dimmed" : ""}><path d={d} className={active && (from===active || to===active) ? "tech-highlight" : ""}/><path className="tech-signal" style={{animationDelay:`${i*1.7}s`}} d={d}/></g>)}</svg>
    {layers.map((layer,i) => <div className="tech-layer" key={layer.label}><div className="tech-layer-label"><span>0{i+1}</span>{layer.label}</div><div className="tech-nodes">{layer.tools.map((tool,n) => <button data-tool={tool} key={tool} className={`tech-node ${tool==="n8n" || tool==="AI / LLM" ? "tech-core" : ""} ${active===tool ? "selected" : ""}`} aria-pressed={active===tool} onMouseEnter={() => setActive(tool)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(tool)} onBlur={() => setActive(null)} onClick={() => setActive(tool)}><span className="tech-node-mark">{["◇","⌘","⊞","+"][n]}</span>{tool}<span className="tech-port"/></button>)}</div></div>)}
    <div className="tech-footer" aria-live="polite"><span className="status-dot"/>{active ? details[active] : "Connected by logic. Designed around your business."}</div>
  </div>;
}
