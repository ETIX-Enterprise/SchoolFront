// ExampleUsage.jsx
import React from "react";
import { NestedStackedBar, CalloutBars, OverviewLines } from "./PieCharts";
import Dots from "/Icona/fill.png";

const outer = [200, 120, 180, 300];
const inner = [80, 30, 40, 70];
const categories = ["A", "B", "C", "D"];

const busData = [
  { name: "Kigali", value: 150 },
  { name: "Karongi", value: 200 },
  { name: "Muhanga", value: 120 },
];

const overviewSeries = [
  {
    name: "Onboarded",
    data: [
      { x: "Jan", y: 300 },
      { x: "Feb", y: 420 },
      { x: "Mar", y: 560 },
    ],
  },
  {
    name: "Scheduled",
    data: [
      { x: "Jan", y: 380 },
      { x: "Feb", y: 500 },
      { x: "Mar", y: 620 },
    ],
  },
];

export default function ExampleUsage() {
  return (
    <div className="w-full px-6 lg:px-12 flex pb-10 flex-wrap justify-between gap-8">
      {/* Card 1 */}
      <div className="flex-1 min-w-[320px] max-w-[520px] bg-white text-black p-5 rounded-lg shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[15px] font-bold">Payments Summary</p>
            <p className="text-[12px] opacity-80 mt-1 text-blue-800">Monthly payments by category</p>
          </div>
          <img src={Dots} alt="menu" className="w-6 h-6 opacity-80" />
        </div>

        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <NestedStackedBar
            categories={categories}
            outerData={outer}
            innerData={inner}
            height={320}
            colors={["#93c5fd", "#60a5fa"]} /* light blues that show on blue bg */
          />
        </div>
      </div>

      {/* Card 2 */}
      <div className="flex-1 min-w-[320px] max-w-[520px] bg-white text-black p-5 rounded-lg shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[15px] font-bold">Bus Assignments</p>
            <p className="text-[12px] opacity-80 text-blue-800 mt-1">Active bus load by region</p>
          </div>
          <img src={Dots} alt="menu" className="w-6 h-6 opacity-80" />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <CalloutBars
            data={busData}
            height={320}
            barColor="#bfdbfe" /* pale blue bar to contrast */
            showCallouts={true}
          />
        </div>
      </div>

      {/* Card 3 */}
      <div className="flex-1 min-w-[320px] max-w-full bg-white text-black p-5 rounded-lg shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[15px] font-bold">Registered Students</p>
            <p className="text-[12px] opacity-80 text-blue-800 mt-1">Trend of registrations</p>
          </div>
          <img src={Dots} alt="menu" className="w-6 h-6 opacity-80" />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <OverviewLines series={overviewSeries} height={320} maxY={700} />
        </div>
      </div>
    </div>
  );
}
