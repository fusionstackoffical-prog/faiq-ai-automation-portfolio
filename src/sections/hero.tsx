"use client";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HeroGalaxy } from "@/components/hero-galaxy";
import { ProjectButton } from "@/components/ui";

export function Hero() {
  return <section className="hero" id="top">
    <div className="hero-grid-bg" aria-hidden="true"/>
    <div className="hero-topline"><span className="eyebrow">BEYOND INTELLIGENCE / 01</span><span className="availability"><i/>AVAILABLE FOR PROJECTS</span></div>
    <div className="hero-main">
      <div className="hero-copy">
        <div className="hero-kicker"><span/>HUMAN AMBITION. MACHINE PRECISION.</div>
        <h1><span className="hero-line">I build systems</span><span className="hero-line">that think,</span><span className="hero-line hero-last">act <span className="amp">&</span> <em>automate.</em></span></h1>
        <p>AI automation and intelligent agents designed to eliminate repetitive operations, capture opportunities and keep businesses running 24/7.</p>
        <div className="hero-actions"><a href="#systems" className="button button-primary">Explore my systems<ArrowUpRight size={18}/></a><ProjectButton className="button-text"/></div>
      </div>
      <div className="hero-visual"><div className="visual-caption"><span className="tiny-cross">+</span> THE INTELLIGENCE UNIVERSE / FIG. 01</div><HeroGalaxy/><div className="network-status"><span className="status-dot"/>SYSTEM CONNECTED<span className="network-status-line"/>READY TO EXECUTE</div></div>
    </div>
    <div className="hero-bottom"><a className="scroll-prompt" href="#about"><span className="scroll-icon"><ArrowDown size={15}/></span>DISCOVER THE HUMAN BEHIND THE SYSTEMS</a><span className="hero-specialties">INTELLIGENCE <b>/</b> ARCHITECTURE <b>/</b> EXECUTION</span><span className="hero-location">ISLAMABAD, PK ↗</span></div>
  </section>;
}
