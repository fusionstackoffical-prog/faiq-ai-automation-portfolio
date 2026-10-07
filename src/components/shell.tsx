"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";
import { profile } from "@/lib/content";
import { ProjectButton } from "./ui";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-15% 0px -60% 0px" });
    document.querySelectorAll("section[id]").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <header className="site-header"><a className="wordmark" href="#top" aria-label="Faiq, back to top">FAIQ<span>.</span></a><nav aria-label="Main navigation" className={open ? "nav-links is-open" : "nav-links"}>
    {[['Work', 'work'], ['Systems', 'systems'], ['About', 'about'], ['Contact', 'contact']].map(([label, id]) => <a href={`#${id}`} className={active === id ? "active" : ""} key={id} onClick={() => setOpen(false)}>{label}</a>)}
  </nav><div className="nav-action"><ProjectButton className="button-nav">Let’s talk</ProjectButton></div><button className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></header>;
}

export function ProjectDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const open = () => dialog.current?.showModal();
    window.addEventListener("open-project", open);
    return () => window.removeEventListener("open-project", open);
  }, []);
  return <dialog ref={dialog} className="project-dialog" onClick={e => { if (e.target === dialog.current) dialog.current?.close(); }} aria-labelledby="project-title"><div className="dialog-content"><button className="dialog-close" aria-label="Close project enquiry" onClick={() => dialog.current?.close()}><X/></button><div className="eyebrow">LET’S CONNECT THE DOTS</div><h2 id="project-title">What could your<br/>business automate?</h2><p>Tell me where the repetitive work happens. We’ll start there.</p><form onSubmit={e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const subject = `AI automation project — ${form.get("business")}`;
    const body = `Hi Faiq,\n\nI'm ${form.get("name")} from ${form.get("business")}.\n\nI'd like to automate:\n${form.get("message")}\n\nYou can reach me at ${form.get("email")}.`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }}><div className="form-grid"><label>Your name<input autoComplete="name" name="name" required placeholder="Alex" maxLength={100}/></label><label>Business name<input autoComplete="organization" name="business" required placeholder="Your business" maxLength={120}/></label></div><label>Email address<input type="email" autoComplete="email" name="email" required placeholder="you@business.com" maxLength={200}/></label><label>What would you like to automate?<textarea name="message" required rows={3} placeholder="Missed calls, booking, follow-ups…" maxLength={2500}/></label><button type="submit" className="button button-primary">Prepare project email<ArrowUpRight size={18}/></button><small className="form-note">Opens a draft in your email app. Nothing is sent automatically.</small></form><div className="dialog-email"><a href={`mailto:${profile.email}`}>{profile.email}</a><button aria-label="Copy email address" onClick={async () => { try { await navigator.clipboard.writeText(profile.email); setCopied(true); } catch { setCopied(false); } }}>{copied ? <Check size={17}/> : <Copy size={17}/>}</button><span role="status">{copied ? "Copied" : ""}</span></div></div></dialog>;
}

export function BootSequence() {
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || sessionStorage.getItem("faiq-booted")) {
      const immediate = window.setTimeout(() => setVisible(false), 0);
      return () => clearTimeout(immediate);
    }
    const interval = window.setInterval(() => setStep(s => Math.min(s + 1, 3)), 190);
    const timeout = window.setTimeout(() => { setVisible(false); sessionStorage.setItem("faiq-booted", "1"); }, 900);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, []);
  return visible ? <div className="boot-screen" aria-hidden="true"><div className="boot-brand">FAIQ<span>.</span></div><div className="boot-line"/><span>{["INITIALIZING SYSTEM", "LOADING AUTOMATION ENGINE", "CONNECTING NODES", "SYSTEM ONLINE"][step]}</span></div> : null;
}
