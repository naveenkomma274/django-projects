import { useMemo, useState } from "react";

const statusColor = {
  UP: "bg-emerald-100 text-emerald-700",
  DOWN: "bg-red-100 text-red-700",
  DEGRADED: "bg-amber-100 text-amber-700",
  UNKNOWN: "bg-gray-100 text-gray-600",
};

export default function AppStatusGrid({ apps }) {
  const [query, setQuery] = useState("");
  const [envFilter, setEnvFilter] = useState("ALL");

  const filtered = useMemo(() => {
    return apps.filter((a) => {
      const matchesQuery = a.name.toLowerCase().includes(query.toLowerCase());
      const matchesEnv = envFilter === "ALL" || a.environment === envFilter;
      return matchesQuery && matchesEnv;
    });
  }, [apps, query, envFilter]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm flex-1 min-w-[200px]"
          placeholder="Search applications…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
          value={envFilter}
          onChange={(e) => setEnvFilter(e.target.value)}
        >
          <option value="ALL">All Environments</option>
          <option value="PROD">Prod</option>
          <option value="QA">QA</option>
          <option value="DEV">Dev</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {filtered.map((app) => (
          <div key={app.id} className="border border-gray-200 rounded-lg p-3 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">{app.name}</p>
              <p className="text-xs text-gray-500">{app.environment}</p>
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor[app.current_status] || statusColor.UNKNOWN}`}>
              {app.current_status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}