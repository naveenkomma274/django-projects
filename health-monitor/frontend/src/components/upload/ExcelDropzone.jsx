import { useCallback, useState } from "react";
import { IncidentsAPI } from "../../api/client";

export default function ExcelDropzone() {
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFile = useCallback(async (file) => {
    if (!file) return;
    const validExt = /\.(xlsx|xls)$/i.test(file.name);
    if (!validExt) {
      setError("Only .xlsx or .xls files are supported.");
      return;
    }

    setError("");
    setResult(null);
    setUploading(true);
    setProgress(0);

    try {
      const res = await IncidentsAPI.uploadExcel(file, setProgress);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }, []);

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors ${
          dragActive ? "border-brand-dark bg-brand-light/10" : "border-gray-300 bg-white"
        }`}
      >
        <p className="text-gray-600 mb-2">Drag & drop your .xlsx / .xls file here</p>
        <p className="text-gray-400 text-sm mb-4">or</p>
        <label className="inline-block cursor-pointer bg-brand-dark text-white px-4 py-2 rounded-md text-sm hover:opacity-90">
          Browse Files
          <input
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
      </div>

      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-brand-dark h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-2">
          <p className="font-medium text-gray-900">Upload Complete</p>
          <div className="flex gap-6 text-sm">
            <span className="text-gray-500">Total rows: <b className="text-gray-900">{result.total_rows}</b></span>
            <span className="text-emerald-600">Succeeded: <b>{result.success_count}</b></span>
            <span className="text-red-600">Failed: <b>{result.failed_count}</b></span>
          </div>
          {result.error_report?.length > 0 && (
            <div className="mt-2 max-h-48 overflow-y-auto text-xs border-t border-gray-100 pt-2">
              {result.error_report.map((e, i) => (
                <p key={i} className="text-red-600">Row {e.row}: {e.error}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}