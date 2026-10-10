"use client";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { ProjectButton, SectionLabel } from "@/components/ui";
import { profile } from "@/lib/content";

export function Contact() {
  return <><section className="section contact-section" id="contact"><SectionLabel index="07">YOUR NEXT CHAPTER</SectionLabel>
    <div className="contact-beam" aria-hidden="true"/><div className="contact-content"><span className="eyebrow">HUMAN AMBITION. LIMITLESS POSSIBILITY.</span><h2 data-reveal>Let’s build<br/>something<br/><em>intelligent.</em></h2><p>Your business deserves systems that work even when you’re not working.</p><div className="contact-actions"><ProjectButton className="button-primary"/><a className="button button-text" href={`mailto:${profile.email}`}>Send an email<ArrowUpRight size={18}/></a></div><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={16}/></a></div>
    <div className="contact-signoff"><span>AN OPEN CHANNEL</span><span>ISLAMABAD → EVERYWHERE</span><i/></div>
  </section><footer className="footer"><div className="footer-top"><div><a href="#top" className="wordmark">FAIQ<span>.</span></a><p>MUHAMMAD FAIQ KHAN<br/>AI AUTOMATION & AI AGENTS</p></div><div className="footer-location"><span>BASED IN ISLAMABAD / PAKISTAN</span><a href={profile.whatsapp} target="_blank" rel="noopener noreferrer">+92 319 9463735</a></div><div className="footer-socials"><span>ELSEWHERE / CONNECT</span><div><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a><a href={profile.instagram} target="_blank" rel="noopener noreferrer">Instagram</a><a href={profile.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a></div></div><a className="back-top" href="#top" aria-label="Back to top"><ArrowUp size={20}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} MUHAMMAD FAIQ KHAN</span><span>BEYOND INTELLIGENCE</span><span className="footer-system"><span className="status-dot"/>END OF SEQUENCE</span></div></footer></>;
}
