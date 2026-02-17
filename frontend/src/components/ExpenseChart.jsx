import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const BASE_URL = import.meta.env.VITE_API_URL;

const CHART_COLORS = ["#1E3A8A", "#10B981", "#f59e0b", "#6366f1", "#ef4444", "#64748b"];

export default function ExpenseChart() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get(`${BASE_URL}/expenses/`)
      .then((res) => {
        const formatted = res.data.map((exp, i) => ({
          name: exp.title?.length > 12 ? exp.title.slice(0, 12) + "…" : exp.title,
          fullName: exp.title,
          amount: exp.amount,
          fill: CHART_COLORS[i % CHART_COLORS.length],
        }));
        setData(formatted);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div
        style={{
          background: "var(--bg-card)",
          padding: "10px 14px",
          borderRadius: "var(--radius-sm)",
          boxShadow: "var(--shadow-lg)",
          border: "1px solid var(--border)",
          fontSize: "0.9rem",
        }}
      >
        <div style={{ fontWeight: 600 }}>{d.fullName ?? d.name}</div>
        <div style={{ color: "var(--primary)", fontWeight: 600 }}>₹ {d.amount?.toLocaleString?.() ?? d.amount}</div>
      </div>
    );
  };

  return (
    <div className="chart-wrap" style={{ width: "100%", height: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${v}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(16, 185, 129, 0.08)" }} />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]} maxBarSize={48}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
