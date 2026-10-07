import { ImageResponse } from "next/og";
export const alt = "Muhammad Faiq Khan — AI Automation & AI Agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#080a0c", color: "#f0f1ed", padding: "60px", fontFamily: "sans-serif" }}><div style={{ display: "flex", fontSize: 32 }}>FAIQ<span style={{ color: "#83e9f4" }}>.</span></div><div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1, letterSpacing: -3 }}><span>I BUILD SYSTEMS</span><span>THAT THINK, ACT</span><span style={{ color: "#83e9f4" }}>& AUTOMATE.</span></div><div style={{ display: "flex", fontSize: 20, color: "#a0a7ab" }}>MUHAMMAD FAIQ KHAN / AI AUTOMATION & AI AGENTS</div></div>, size);
}
