export default function KpiCards({ summary }) {
  if (!summary) return null;

  const cards = [
    { label: "Total Applications", value: summary.total_applications, color: "text-gray-900" },
    { label: "Healthy", value: summary.healthy_count, color: "text-emerald-600" },
    { label: "Down", value: summary.down_count, color: "text-red-600" },
    { label: "Avg Uptime %", value: `${summary.average_uptime_percent}%`, color: "text-brand-dark" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-white rounded-xl border-t-4 border-t-brand-dark border-x border-b border-gray-200 p-4 shadow-sm"
        >
          <p className="text-sm text-gray-500">{c.label}</p>
          <p className={`text-3xl font-bold mt-1 ${c.color}`}>{c.value}</p>
        </div>
      ))}
    </div>
  );
}