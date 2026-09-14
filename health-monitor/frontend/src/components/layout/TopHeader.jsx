import logoIcon from "@/assets/brand/logo-icon.png";

export default function TopHeader() {
  return (
    <header className="h-16 bg-gradient-to-r from-brand-dark to-brand-light flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <img src={logoIcon} alt="Amgen" className="h-8 w-8 rounded-full bg-white p-0.5" />
        <div>
          <p className="text-white font-semibold text-sm leading-tight">Amgen</p>
          <p className="text-brand-white/70 text-xs leading-tight">Health Monitoring System</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-white/80 text-xs px-2 py-1 rounded-full bg-white/10">
          Environment: Production
        </span>
      </div>
    </header>
  );
}