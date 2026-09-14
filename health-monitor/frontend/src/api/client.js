import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  headers: { "Content-Type": "application/json" },
});

export const ApplicationsAPI = {
  list: (params) => client.get("/applications/", { params }),
  detail: (id) => client.get(`/applications/${id}/`),
  dashboardSummary: () => client.get("/applications/dashboard_summary/"),
  trend: (days, applicationId) =>
    client.get("/applications/trend/", {
      params: { days, application_id: applicationId },
    }),
};

export const IncidentsAPI = {
  list: (params) => client.get("/incidents/", { params }),
  uploadExcel: (file, onProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    return client.post("/incidents/upload-excel/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        if (onProgress) onProgress(Math.round((e.loaded * 100) / e.total));
      },
    });
  },
};

export default client;