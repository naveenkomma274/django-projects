import { useEffect, useState } from "react";
import { ApplicationsAPI } from "../api/client";
import PageBanner from "../components/layout/PageBanner";
import KpiCards from "../components/dashboard/KpiCards";
import TrendChart from "../components/dashboard/TrendChart";
import AppStatusGrid from "../components/dashboard/AppStatusGrid";

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [apps, setApps] = useState([]);
  const [range, setRange] = useState(7);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [summaryRes, appsRes] = await Promise.all([
          ApplicationsAPI.dashboardSummary(),
          ApplicationsAPI.list(),
        ]);
        setSummary(summaryRes.data);
        setApps(appsRes.data.results ?? appsRes.data);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            "Couldn't load dashboard data. Is the backend running?"
        );
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      <PageBanner
        title="Health Monitoring Dashboard"
        subtitle="Real-time status across all applications"
      />

      <div className="p-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
            {error}
          </div>
        )}

        {loading ? (
          <div className="p-8 text-gray-500 text-sm">Loading dashboard…</div>
        ) : (
          <>
            <KpiCards summary={summary} />

            <div className="flex items-center gap-2">
              {[7, 30, 90].map((d) => (
                <button
                  key={d}
                  onClick={() => setRange(d)}
                  className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
                    range === d
                      ? "bg-brand-dark text-white border-brand-dark"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Last {d} days
                </button>
              ))}
            </div>

            <TrendChart days={range} />
            <AppStatusGrid apps={apps} />
          </>
        )}
      </div>
    </div>
  );
}