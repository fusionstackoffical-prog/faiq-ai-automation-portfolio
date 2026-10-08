"use client";
import { modules } from "@/lib/content";
const branches = ["Business context", "Available slots", "Service rules", "Record lookup", "Reply received?", "Eligibility check", "Exception route", "Connected tools"];
export function ServiceDiagram({ active }: { active: number }) {
  const service = modules[active];
  return <div className="service-diagram" key={active}>
    <svg viewBox="0 0 440 280" preserveAspectRatio="none" aria-hidden="true"><path className="service-path" d="M220 52 V99 M220 140 V213 M220 119 H352 V235 H290"/><path className="service-signal" d="M220 52 V99 M220 140 V213"/></svg>
    <div className="service-input">{service.input}</div><div className="service-action"><span className="status-dot"/>{service.action}</div><div className="service-output">{service.output}</div><div className="service-branch">{branches[active]}</div>
  </div>;
}
