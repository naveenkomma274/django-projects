import { useEffect, useState } from "react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from "recharts";
import { ApplicationsAPI } from "../../api/client";

export default function TrendChart({ days }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    ApplicationsAPI.trend(days).then((res) => setData(res.data));
  }, [days]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Health Status Trend</h2>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" fontSize={12} />
          <YAxis fontSize={12} allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="UP" stroke="#10b981" strokeWidth={2} />
          <Line type="monotone" dataKey="DOWN" stroke="#ef4444" strokeWidth={2} />
          <Line type="monotone" dataKey="DEGRADED" stroke="#f59e0b" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}