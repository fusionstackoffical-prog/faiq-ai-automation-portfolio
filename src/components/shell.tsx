"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
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
  </nav><div className="nav-action"><a className="contact-shortcut" href={profile.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Contact Faiq on WhatsApp"><Phone size={16}/></a><ProjectButton className="button-nav">Let’s talk</ProjectButton></div><button className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></header>;
}
