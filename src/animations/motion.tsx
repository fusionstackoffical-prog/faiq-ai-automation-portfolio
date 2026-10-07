"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Motion() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(el => {
        gsap.from(el, { y: 32, opacity: .18, duration: .8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });
      gsap.to(".hero-visual .network", { y: 80, scale: 1.13, opacity: .25, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.from(".process-stage", { borderTopColor: "#76ddeb", stagger: .22, duration: 1.5, scrollTrigger: { trigger: ".process-grid", start: "top 70%" } });
    });
    media.add("(min-width: 1000px) and (prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({ scrollTrigger: { trigger: ".philosophy-section", start: "top top", end: "+=1200", scrub: 1, pin: true } });
      timeline.to(".philosophy-first", { opacity: 0, y: -90, scale: .95, duration: 1 }).fromTo(".philosophy-second", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 }, .45);
    });
    const move = (event: PointerEvent) => {
      if (!cursor.current || !window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
      cursor.current.style.opacity = "1";
      cursor.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      cursor.current.classList.toggle("cursor-active", !!(event.target as HTMLElement).closest("a, button, input, select, textarea"));
    };
    const hide = () => { if (cursor.current) cursor.current.style.opacity = "0"; };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    const cleanups: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach(button => {
      const onMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const rect = button.getBoundingClientRect();
        gsap.to(button, { x: (event.clientX - rect.left - rect.width / 2) * .12, y: (event.clientY - rect.top - rect.height / 2) * .16, duration: .3 });
      };
      const onLeave = () => { gsap.to(button, { x: 0, y: 0, duration: .3 }); };
      button.addEventListener("pointermove", onMove);
      button.addEventListener("pointerleave", onLeave);
      cleanups.push(() => { button.removeEventListener("pointermove", onMove); button.removeEventListener("pointerleave", onLeave); gsap.killTweensOf(button); });
    });
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => { media.revert(); window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", hide); cleanups.forEach(fn => fn()); };
  }, []);
  return <div ref={cursor} className="cursor-follower" aria-hidden="true"/>;
}
