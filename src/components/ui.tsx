import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return <div className="section-label"><span className="section-index">{index}</span><span>{children}</span><span className="label-line" /></div>;
}

export function ProjectButton({ children = "Start a project", className = "" }: { children?: ReactNode; className?: string }) {
  return <button className={`button ${className}`} data-magnetic onClick={() => window.dispatchEvent(new Event("open-project"))}>{children}<ArrowUpRight size={17} /></button>;
}

export function CornerMarks() {
  return <><span className="corner top-left"/><span className="corner top-right"/><span className="corner bottom-left"/><span className="corner bottom-right"/></>;
}
