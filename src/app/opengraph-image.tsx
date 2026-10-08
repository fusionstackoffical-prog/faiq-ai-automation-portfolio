import { ImageResponse } from "next/og";
export const alt = "Muhammad Faiq Khan — AI Automation & AI Agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#050505", color: "#F5F5F2", padding: "60px", fontFamily: "sans-serif" }}><div style={{ display: "flex", fontSize: 32 }}>FAIQ<span style={{ color: "#E5E5E3" }}>.</span></div><div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1, letterSpacing: -3 }}><span>I BUILD SYSTEMS</span><span>THAT THINK, ACT</span><span style={{ color: "#E5E5E3" }}>& AUTOMATE.</span></div><div style={{ display: "flex", fontSize: 20, color: "#A3A3A3" }}>MUHAMMAD FAIQ KHAN / AI AUTOMATION & AI AGENTS</div></div>, size);
}
