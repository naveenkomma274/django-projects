const severityColor = {
  LOW: "bg-blue-100 text-blue-700",
  MEDIUM: "bg-amber-100 text-amber-700",
  HIGH: "bg-orange-100 text-orange-700",
  CRITICAL: "bg-red-100 text-red-700",
};

const statusColor = {
  OPEN: "bg-red-100 text-red-700",
  IN_PROGRESS: "bg-amber-100 text-amber-700",
  RESOLVED: "bg-emerald-100 text-emerald-700",
};

export default function IncidentTable({ incidents }) {
  if (!incidents.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 text-sm">
        No incidents found for this filter.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Application</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Severity</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Downtime (min)</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Root Cause</th>
            <th className="text-left px-4 py-3 font-medium text-gray-600">Source</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {incidents.map((inc) => (
            <tr key={inc.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-900">{inc.application_name}</td>
              <td className="px-4 py-3 text-gray-700">{inc.title}</td>
              <td className="px-4 py-3">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${severityColor[inc.severity]}`}>
                  {inc.severity}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor[inc.status]}`}>
                  {inc.status.replace("_", " ")}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-700">
                {inc.downtime_duration_minutes ?? "—"}
              </td>
              <td className="px-4 py-3 text-gray-500 max-w-xs truncate">
                {inc.root_cause || "—"}
              </td>
              <td className="px-4 py-3 text-gray-500">
                {inc.uploaded_via_excel ? "Excel" : "System"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}