"use client";
import { modules } from "@/lib/content";

export function ServiceDiagram({ active }: { active: number }) {
  const service = modules[active];
  return <div className={`service-instrument instrument-${active}`} key={active} role="img" aria-label={`${service.title}: ${service.input}, ${service.action}, ${service.output}`}>
    <div className="instrument-top"><span>INPUT → INTELLIGENCE → ACTION</span><span>SYS / 0{active+1}</span></div>
    <svg viewBox="0 0 600 290" aria-hidden="true">
      <defs><linearGradient id={`instrument-light-${active}`}><stop stopColor="#bedfff" stopOpacity=".08"/><stop offset=".5" stopColor="#ddecff"/><stop offset="1" stopColor="#bedfff" stopOpacity=".08"/></linearGradient></defs>
      <path d="M30 245 H570 M30 45 H570" className="instrument-grid"/>
      {active === 0 && <g className="voice-wave">{Array.from({length:47},(_,i)=> {
        // Round trigonometric output so server and browser serialize identically.
        const height = Math.round((12+Math.sin(i*.67)**2*64)*Math.sin((i+1)/49*Math.PI)*100)/100;
        return <line key={i} x1={70+i*10} x2={70+i*10} y1={(145-height).toFixed(2)} y2={(145+height).toFixed(2)} style={{animationDelay:`${i*-.13}s`}}/>;
      })}</g>}
      {active === 1 && <g className="schedule-grid">{Array.from({length:21},(_,i)=><g key={i}><rect x={100+i%7*58} y={74+Math.floor(i/7)*50} width="44" height="35" rx="4" className={i===10?'chosen-slot':''}/>{i===10&&<path d="m282 140 8 8 15-17"/>}</g>)}<text x="300" y="230" textAnchor="middle">AVAILABILITY VERIFIED</text></g>}
      {active === 2 && <g className="qualification-flow"><path d="M80 90 H180 L300 145 L420 85 H525 M80 200 H180 L300 145 L420 205 H525"/>{[[80,90],[80,200],[300,145],[525,85],[525,205]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i===2?28:7}/>)}<text x="300" y="149" textAnchor="middle">IF</text><text x="435" y="66">QUALIFIED</text><text x="435" y="234">REVIEW</text></g>}
      {active === 3 && <g className="customer-network">{[[130,80],[470,90],[120,210],[475,210],[300,48],[300,242]].map(([x,y],i)=><g key={i}><path d={`M${x} ${y} Q300 ${y} 300 145`}/><circle cx={x} cy={y} r="13"/></g>)}<circle cx="300" cy="145" r="43"/><text x="300" y="149" textAnchor="middle">CRM</text></g>}
      {active === 4 && <g className="follow-timeline"><path d="M65 145 H535"/>{[90,230,370,510].map((x,i)=><g key={x}><circle cx={x} cy="145" r={i===2?14:7}/><text x={x} y="108" textAnchor="middle">{['ENQUIRY','WAIT','FOLLOW-UP','REPLY'][i]}</text><path d={`M${x} 173 V187`}/></g>)}</g>}
      {active === 5 && <g className="reactivation-loop"><path d="M194 145 A106 85 0 1 1 300 230 M194 145 l-9 17 m9-17 16 10"/><circle cx="300" cy="145" r="43"/><text x="300" y="149" textAnchor="middle">RECONNECT</text><circle className="instrument-dot" cx="394" cy="110" r="5"/></g>}
      {active === 6 && <g className="routing-flow"><path d="M65 145 H205 L300 75 H530 M205 145 H530 M205 145 L300 215 H530"/>{[[65,145],[205,145],[530,75],[530,145],[530,215]].map(([x,y],i)=><rect key={i} x={x-10} y={y-10} width="20" height="20" rx="3"/>)}<text x="338" y="59">TRANSFORM</text><text x="338" y="129">EXECUTE</text><text x="338" y="199">ESCALATE</text></g>}
      {active === 7 && <g className="agent-architecture"><path d="M105 145 H245 M355 145 H495 M300 92 V55 M300 198 V235"/><rect x="245" y="92" width="110" height="106" rx="12"/><text x="300" y="140" textAnchor="middle">REASON</text><text x="300" y="162" textAnchor="middle">+ ACT</text><text x="100" y="125" textAnchor="middle">CONTEXT</text><text x="490" y="125" textAnchor="middle">TOOLS</text><circle cx="300" cy="55" r="5"/><circle cx="300" cy="235" r="5"/></g>}
      <path className="instrument-scan" d="M40 260 H560" stroke={`url(#instrument-light-${active})`}/>
    </svg>
    <div className="instrument-bottom"><span>{service.input}</span><span>{service.output} ↗</span></div>
  </div>;
}
