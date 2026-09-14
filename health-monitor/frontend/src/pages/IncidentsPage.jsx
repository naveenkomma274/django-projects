import { useEffect, useState } from "react";
import PageBanner from "../components/layout/PageBanner";
import IncidentTable from "../components/incidents/IncidentTable";
import { IncidentsAPI } from "../api/client";

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const params = statusFilter !== "ALL" ? { status: statusFilter } : {};
        const res = await IncidentsAPI.list(params);
        setIncidents(res.data.results ?? res.data);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            "Couldn't load incidents. Is the backend running?"
        );
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [statusFilter]);

  return (
    <div>
      <PageBanner
        title="Incident & Issue Log"
        subtitle="Historic incidents, root causes, and resolution status"
      />

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          {["ALL", "OPEN", "IN_PROGRESS", "RESOLVED"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
                statusFilter === s
                  ? "bg-brand-dark text-white border-brand-dark"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
            {error}
          </div>
        )}

        {loading ? (
          <div className="p-8 text-gray-500 text-sm">Loading incidents…</div>
        ) : (
          <IncidentTable incidents={incidents} />
        )}
      </div>
    </div>
  );
}