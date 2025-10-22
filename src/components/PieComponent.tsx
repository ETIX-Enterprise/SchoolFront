// ExampleUsage.jsx
import React from "react";
import { CalloutDonut, NestedDonut, RadialOverview } from "./PieCharts";
import Dots from "/Icona/fill.png";

const outer = [
  { name: "A", value: 200 },
  { name: "B", value: 120 },
  { name: "C", value: 180 },
  { name: "D", value: 300 },
];

const inner = [
  { name: "A.1", value: 80 },
  { name: "B.1", value: 30 },
  { name: "C.1", value: 40 },
  { name: "D.1", value: 70 },
];

const donutData = [
  { name: "Kigali", value: 150 },
  { name: "Karongi", value: 200 },
  { name: "Muhanga", value: 120 },
];

const rings = [
  { name: "2025", data: [{ name: "v", value: 300 }], max: 600 },
  { name: "2024", data: [{ name: "v", value: 420 }], max: 600 },
  { name: "2023", data: [{ name: "v", value: 560 }], max: 600 },
];

export default function ExampleUsage() {
  return (
    <div className="w-full px-8 lg:px-12 flex pb-10 flex-wrap justify-between gap-8">
      {/* Card 1 (selected look) */}
      <div
        className="flex-1 min-w-[320px] max-w-[520px] bg-white p-5 border border-[#D0D0D0] rounded-lg shadow-sm"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[15px] font-bold text-[#0f1f22]">Payments Summary</p>
          </div>
          <img src={Dots} alt="menu" className="w-6 h-6 cursor-pointer " />
        </div>

        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <NestedDonut outerData={outer} innerData={inner} colorsInner={["#DFE8EC", "#4C7080", "#5F8CA0"]} colorsOuter={["#e6eef0", "#cfe0e4", "#9fb8c1", "#5e8b98"]} size="340px" />
        </div>
      </div>

      {/* Card 2 */}
      <div
        className="flex-1 min-w-[320px] max-w-[520px] bg-white border border-[#D0D0D0] p-5 rounded-lg shadow-sm"
        
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[15px] font-bold text-[#0f1f22]">Bus Assignments</p>
            
          </div>
          <img src={Dots} alt="menu" className="w-6 h-6 cursor-pointer " />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <CalloutDonut data={donutData} size="340px"   colors ={ ["#DFE8EC", "#4C7080", "#5F8CA0", "#396b78"]} showInnerRing = {true} />
        </div>
      </div>

      {/* Card 3 */}
      <div
        className="flex-1 min-w-[320px] border border-[#D0D0D0] max-w-[520px] bg-white p-5 rounded-lg shadow-sm"
        
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[15px] font-bold text-[#0f1f22]">Registered Students</p>
            <p className="text-[12px] text-[#2F2B3DB2] mt-1">Overview of registered Students</p>
          </div>
          <img src={Dots} alt="menu" className="w-6 h-6 cursor-pointer" />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <RadialOverview rings={rings} size="360px" />
        </div>
      </div>
    </div>
  );
}
