// PieCharts.jsx
import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, PolarAngleAxis
} from "recharts";



/* Helper: SVG label for callouts (draws a small leader line and text) */
function renderCalloutLabel(props:any, fill = "#213b43", bg = null) {
  // props contain: cx, cy, midAngle, outerRadius
  const RAD = Math.PI / 180;
  const { cx, cy, midAngle, outerRadius, name } = props;
  const angle = -midAngle * RAD; // flip direction for screen coords
  const sx = cx + Math.cos(angle) * (outerRadius + 6);
  const sy = cy + Math.sin(angle) * (outerRadius + 6);
  const ex = cx + Math.cos(angle) * (outerRadius + 36);
  const ey = cy + Math.sin(angle) * (outerRadius + 36);
  const textAnchor = ex > cx ? "start" : "end";
  return (
    <g>
      <line x1={sx} y1={sy} x2={ex} y2={ey} stroke="#d7e6ea" strokeWidth={2} />
      <circle cx={ex} cy={ey} r={3.5} fill={fill} stroke="#fff" strokeWidth={1} />
      <text
        x={ex + (textAnchor === "start" ? 8 : -8)}
        y={ey + 4}
        textAnchor={textAnchor}
        fontSize={12}
        fill={fill}
        style={{ fontWeight: 600 }}
      >
        {name}
      </text>
    </g>
  );
}

/*
  1) NestedDonut
*/
export function NestedDonut({
  outerData ,
  innerData ,
  size = "360px",
  colorsOuter = ["#DFE8EC", "#4C7080", "#5F8CA0", "#5e8b98"],
  colorsInner = ["#DFE8EC", "#4C7080", "#5F8CA0"]
}:{outerData : [] | any , innerData : [] | any , size:string , colorsOuter: [string , string , string , string] ,colorsInner :[string , string , string]}) {
  return (
    <div style={{ width: "100%", maxWidth: size, aspectRatio: "1 / 1", position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={outerData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="62%"
            innerRadius="38%"
            paddingAngle={2}
            isAnimationActive={false}
            labelLine={false}
  label={(props) => {
  // treat incoming props as any so we can access midAngle/outerRadius reliably
  const p = props as any;
  const cx: number = Number(p.cx ?? 0);
  const cy: number = Number(p.cy ?? 0);
  const midAngle: number = Number(p.midAngle ?? 0);
  const outerRadiusNum: number = Number(p.outerRadius ?? 0); // <-- important

  const RAD = Math.PI / 180;
  const angle = -midAngle * RAD;
  const r = (outerRadiusNum + 38) / 2;
  const x = cx + Math.cos(angle) * r;
  const y = cy + Math.sin(angle) * r;

  return (
    <text x={x} y={y} fill="#3f5f67" textAnchor="middle" dominantBaseline="central" fontSize={14}>
      {outerData[p.index] ? outerData[p.index].name[0] : ""}
    </text>
  );
}}

          >
            {outerData.map((entry:any, idx:any) => (
              <Cell key={`o-${idx}`} fill={colorsOuter[idx % colorsOuter.length]} stroke="#fff" strokeWidth={1} />
            ))}
          </Pie>

          <Pie
            data={innerData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="12%"
            outerRadius="30%"
            isAnimationActive={false}
            labelLine={false}
            label={(props : any) => {
              const { cx, cy, midAngle, outerRadius, index } = props as any;
              // show small inner segment labels (A.1 etc)
              const RAD = Math.PI / 180;
              const angle = -midAngle * RAD;
              const r = outerRadius + 8;
              const x = cx + Math.cos(angle) * r;
              const y = cy + Math.sin(angle) * r;
              return (
                <text x={x} y={y} fill="#62767a" textAnchor="middle" dominantBaseline="central" fontSize={10}>
                  {innerData[index] ? innerData[index].name : ""}
                </text>
              );
            }}
          >
            {innerData.map((entry:any, idx:any) => (
              <Cell key={`i-${idx}`} fill={colorsInner[idx % colorsInner.length]} stroke="#fff" strokeWidth={0.8} />
            ))}
          </Pie>

          {/* faint tooltip */}
          <Tooltip
            wrapperStyle={{ borderRadius: 8, boxShadow: "0 6px 18px rgba(25,41,47,0.08)" }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* white center ring with subtle border to match screenshot */}
      <div style={{
        position: "absolute",
        left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        width: "24%", height: "24%",
        borderRadius: "50%",
        background: "#fff",
        boxShadow: "inset 0 1px 0 rgba(0,0,0,0.02)",
        border: "6px solid rgba(255,255,255,0.9)"
      }} />
    </div>
  );
}

/*
  2) CalloutDonut
*/
export function CalloutDonut({
  data = [],
  size = "360px",
  colors = ["#dbeaf0", "#b6d3db", "#6f98a7", "#396b78"],
  showInnerRing = true
}:{data:[]|any , size:string , colors:[string , string , string]|any , showInnerRing:boolean}) {
  // pick colors for callout label dots
  const labelColors = ["#7ea7b2", "#396b78", "#cfe0e4"];

  return (
    <div style={{ width: "100%", maxWidth: size, aspectRatio: "1 / 1", position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="45%"
            outerRadius="70%"
            paddingAngle={2}
            isAnimationActive={false}
            labelLine={false}
            label={(props) => renderCalloutLabel(props, "#355e66")}
          >
            {data.map((entry:any, idx:any) => (
              <Cell key={`c-${idx}`} fill={colors[idx % colors.length]} stroke="#fff" strokeWidth={1} />
            ))}
          </Pie>

          {showInnerRing && (
            <Pie
              data={[{ name: "ring", value: 1 }]}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius="36%"
              outerRadius="40%"
              startAngle={0}
              endAngle={360}
              isAnimationActive={false}
            >
              <Cell fill="#f0f3f4" />
            </Pie>
          )}

          <Tooltip wrapperStyle={{ borderRadius: 8 }} />
        </PieChart>
      </ResponsiveContainer>

      {/* styled rectangular callouts (fallback / decorative) */}
      {/* left */}
      <div style={{
        position: "absolute",
        left: -12,
        top: "41%",
        transform: "translateY(-50%)",
        background: "#e6eef0",
        padding: "8px 10px",
        borderRadius: 6,
        boxShadow: "0 4px 14px rgba(20,40,48,0.04)"
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#11343a" }}>Kigali</div>
      </div>

      {/* right dark */}
      <div style={{
        position: "absolute",
        right: -12,
        top: "36%",
        transform: "translateY(-50%)",
        background: "#396b78",
        color: "#fff",
        padding: "8px 10px",
        borderRadius: 6,
        boxShadow: "0 4px 14px rgba(20,40,48,0.06)"
      }}>
        <div style={{ fontSize: 12, fontWeight: 700 }}>Karongi</div>
      </div>

      {/* bottom center */}
      <div style={{
        position: "absolute",
        left: "50%",
        bottom: -10,
        transform: "translateX(-50%)",
        background: "#cfe0e4",
        padding: "8px 10px",
        borderRadius: 6
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#11343a" }}>Muhanga</div>
      </div>
    </div>
  );
}

/*
  3) RadialOverview
*/
export function RadialOverview({
  rings = [],
  size = "360px",
}:{rings:[]|any , size : string}) {
  return (
    <div style={{ width: "100%", maxWidth: size, aspectRatio: "1 / 1", position: "relative" }}>
      {/* background grid circles and radial labels */}
      <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* concentric grid arcs (quarter-circle visible like screenshot) */}
        <g transform="translate(50,50)">
          {/* draw faint partial arc grid that resembles the screenshot */}
          <path d="M0,-40 A40,40 0 0 1 40,0" fill="none" stroke="#edf3f5" strokeWidth="0.8" />
          <path d="M0,-30 A30,30 0 0 1 30,0" fill="none" stroke="#eef6f7" strokeWidth="0.8" />
          <path d="M0,-20 A20,20 0 0 1 20,0" fill="none" stroke="#f3f7f8" strokeWidth="0.8" />
        </g>
        {/* number ticks along right quadrant */}
        <text x="66" y="6" fontSize="4" fill="#9fb0b3">100</text>
        <text x="93" y="45" fontSize="4" fill="#9fb0b3">200</text>
        <text x="80" y="90" fontSize="4" fill="#9fb0b3">300</text>
        <text x="47" y="98" fontSize="4" fill="#9fb0b3">400</text>
        <text x="17" y="92" fontSize="4" fill="#9fb0b3">500</text>
      </svg>

      {rings.map((ring:any, idx:any) => {
        // outermost ring idx=0 => larger radii
        const outerRadius = 90 - idx * 18;
        const innerRadius = outerRadius - 14;
        // adapt bar size visually
        const barSize = 12;
        return (
          <div key={idx} style={{ position: "absolute", inset: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius={`${innerRadius}%`}
                outerRadius={`${outerRadius}%`}
                barSize={barSize}
                data={ring.data}
                startAngle={90}
                endAngle={450}
                
              >
                <PolarAngleAxis type="number" domain={[0, ring.max || 1000]} tick={false} />
                <RadialBar 
                  background
                  dataKey="value"
                  cornerRadius={8}
                  // give each ring its own color (darker for outer)
                  fill={idx === 0 ? "#315c66" : idx === 1 ? "#6f98a7" : "#cfe0e4"}
                />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        );
      })}

      {/* center white circle */}
      <div style={{
        position: "absolute",
        left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        width: "26%", height: "26%",
        borderRadius: "50%",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "inset 0 1px 0 rgba(0,0,0,0.02)"
      }}>
        <div style={{ fontSize: 12, color: "#718a92", fontWeight: 700 }}>Overview</div>
      </div>
    </div>
  );
}
