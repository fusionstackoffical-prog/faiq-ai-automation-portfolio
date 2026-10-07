"use client";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { SectionLabel } from "@/components/ui";

export function Process() {
  return <section className="section process-section"><SectionLabel index="07">HOW I THINK</SectionLabel><div className="process-grid">{[
    ["01", "Understand", "Find where the business is losing time, leads or opportunities.", "THE PROBLEM BEFORE THE PLATFORM"],
    ["02", "Systemize", "Design the logic, data flow, integrations and decision-making process.", "A CLEAR PATH FROM INPUT TO OUTCOME"],
    ["03", "Automate", "Build a system capable of executing that process automatically.", "BUILD. TEST. REFINE. CONNECT."],
  ].map(([number, title, copy, detail]) => <article className="process-stage" key={number} data-reveal><div className="process-top"><span>{number}</span><ArrowUpRight size={28} strokeWidth={1}/></div><h2>{title}<span>.</span></h2><p>{copy}</p><div className="process-detail">{detail}</div></article>)}</div></section>;
}

export function About() {
  return <section className="section about-section" id="about"><SectionLabel index="08">THE HUMAN BEHIND THE SYSTEMS</SectionLabel><div className="about-grid"><div className="portrait-wrap" data-reveal><Image src="/images/faiq-portrait.jpg" width={1536} height={1536} sizes="(max-width: 700px) 90vw, 38vw" alt="Muhammad Faiq Khan wearing a dark suit in an office" className="portrait"/><div className="portrait-overlay"/><div className="portrait-caption"><span>MUHAMMAD FAIQ KHAN</span><span><MapPin size={12}/>ISLAMABAD, PAKISTAN</span></div><span className="portrait-index">FIG. 01 / THE BUILDER</span></div><div className="about-copy"><span className="eyebrow">AI AUTOMATION & AI AGENT SPECIALIST</span><h2 data-reveal>I don’t automate<br/>for the sake of<br/><span className="muted">automation.</span></h2><p>I build AI-powered systems around real business problems — reducing repetitive operations, improving response times, connecting tools and creating workflows capable of operating without constant human intervention.</p><p>My focus is practical: give business owners more time to serve their customers, and give their teams fewer things to chase.</p><div className="about-facts"><div><strong>01</strong><span>YEAR OF EXPERIENCE</span></div><div><strong>Real work.</strong><span>REAL BUSINESS PROBLEMS.</span></div></div><div className="about-niches">HOME SERVICES <span>/</span> HVAC <span>/</span> LOCAL BUSINESSES</div></div></div></section>;
}

export function Philosophy() {
  return <section className="philosophy-section"><span className="eyebrow philosophy-label">A SIMPLE OPERATING PRINCIPLE</span><div className="philosophy-first"><h2>DON’T HIRE PEOPLE<br/>TO DO WHAT<br/><span className="muted">A SYSTEM CAN DO.</span></h2></div><div className="philosophy-second"><span className="philosophy-plus">+</span><h2>LET PEOPLE DO<br/>WHAT SYSTEMS<br/><span className="cyan">CAN’T.</span></h2></div><span className="philosophy-bottom">AUTOMATION SHOULD CREATE ROOM FOR PEOPLE.</span></section>;
}
