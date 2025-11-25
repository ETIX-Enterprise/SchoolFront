import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  AreaChart,
  Area,
  Line,
} from "recharts";

type SeriesPoint = { x: string; y: number };
type Series = { name: string; data: SeriesPoint[] };

/* NestedStackedBar
   props: categories, outerData, innerData, height, colors
*/
export function NestedStackedBar({
  categories = [],
  outerData = [],
  innerData = [],
  height = 320,
  colors = ["#315c66", "#6f98a7"],
}: {
  categories?: string[];
  outerData?: number[];
  innerData?: number[];
  height?: number;
  colors?: string[];
}) {
  const data = categories.map((name, i) => ({
    name,
    outer: outerData[i] ?? 0,
    inner: innerData[i] ?? 0,
  }));

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 12, left: 6, bottom: 6 }}>
          <CartesianGrid stroke="#eef6f7" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#596f72", fontSize: 12 }} />
          <YAxis tick={{ fill: "#596f72", fontSize: 12 }} />
          <Tooltip wrapperStyle={{ borderRadius: 8 }} />
          <Legend verticalAlign="top" height={24} />
          <Bar dataKey="outer" stackId="a" fill={colors[0]} radius={[6, 6, 0, 0]}>
            <LabelList dataKey="outer" position="top" />
          </Bar>
          <Bar dataKey="inner" stackId="a" fill={colors[1]} radius={[6, 6, 0, 0]}>
            <LabelList dataKey="inner" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* CalloutBars
   props: data [{name, value}], height, barColor
*/
export function CalloutBars({
  data = [],
  height = 300,
  barColor = "#396b78",
  showCallouts = true,
}: {
  data?: { name: string; value: number }[];
  height?: number;
  barColor?: string;
  showCallouts?: boolean;
}) {
  const sorted = [...(data || [])].sort((a, b) => b.value - a.value);

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={sorted}
          margin={{ top: 8, right: 12, left: 100, bottom: 8 }}
        >
          <CartesianGrid stroke="#f3f7f8" vertical={false} />
          <XAxis type="number" tick={{ fill: "#596f72" }} />
          <YAxis dataKey="name" type="category" width={110} tick={{ fill: "#11343a", fontWeight: 600 }} />
          <Tooltip wrapperStyle={{ borderRadius: 8 }} />
          <Bar dataKey="value" fill={barColor} radius={[6, 6, 6, 6]}>
            <LabelList dataKey="value" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {showCallouts && (
        <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
          {sorted.slice(0, 3).map((d, i) => (
            <div
              key={d.name}
              style={{
                background: i === 1 ? "#396b78" : "#e6eef0",
                color: i === 1 ? "#fff" : "#11343a",
                padding: "6px 10px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              {d.name} — {d.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* OverviewLines
   props: series = [{ name, data: [{ x, y }] }], height, maxY
   This version uses gentle sea-like gradients for fills and smoother lines.
*/
export function OverviewLines({
  series = [],
  height = 320,
  maxY = null,
}: {
  series?: Series[];
  height?: number;
  maxY?: number | null;
}) {
  const xValues = Array.from(new Set((series || []).flatMap((s) => s.data.map((d) => d.x))));
  const combined = xValues.map((x) => {
    const point: any = { x };
    (series || []).forEach((s) => {
      const found = s.data.find((d) => d.x === x);
      point[s.name] = found ? found.y : 0;
    });
    return point;
  });

  const palette = ["#60a5fa", "#93c5fd", "#bde0fe"]; // sea-like blues

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={combined} margin={{ top: 12, right: 12, left: 8, bottom: 8 }}>
          <defs>
            <linearGradient id="seaGrad0" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.06} />
            </linearGradient>
            <linearGradient id="seaGrad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity={0.26} />
              <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.04} />
            </linearGradient>
            <linearGradient id="seaGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bde0fe" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#bde0fe" stopOpacity={0.03} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#eef6f7" strokeDasharray="3 3" />
          <XAxis dataKey="x" tick={{ fill: "#596f72" }} />
          <YAxis tick={{ fill: "#596f72" }} domain={maxY ? [0, maxY] : ["auto", "auto"]} />
          <Tooltip wrapperStyle={{ borderRadius: 8 }} />
          <Legend verticalAlign="top" height={24} />

          {(series || []).map((s, i) => (
            <React.Fragment key={s.name}>
              <Area
                type="monotone"
                dataKey={s.name}
                stroke={palette[i % palette.length]}
                fill={`url(#seaGrad${i % 3})`}
                fillOpacity={1}
                isAnimationActive={false}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey={s.name}
                stroke={palette[i % palette.length]}
                dot={false}
                strokeWidth={1.2}
              />
            </React.Fragment>
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default {
  NestedStackedBar,
  CalloutBars,
  OverviewLines,
};

