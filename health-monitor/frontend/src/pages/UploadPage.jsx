import PageBanner from "../components/layout/PageBanner";
import ExcelDropzone from "../components/upload/ExcelDropzone";

export default function UploadPage() {
  return (
    <div>
      <PageBanner
        title="Excel Data Upload"
        subtitle="Bulk import incidents and health check records"
      />
      <div className="p-6 max-w-2xl">
        <ExcelDropzone />
      </div>
    </div>
  );
}