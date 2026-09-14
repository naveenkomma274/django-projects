import bannerHero from "@/assets/brand/banner-hero.jpg";

export default function PageBanner({ title, subtitle }) {
  return (
    <div
      className="relative h-32 md:h-40 rounded-b-xl overflow-hidden bg-gradient-to-br from-brand-dark to-brand-light bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerHero})` }}
    >
      <div className="absolute inset-0 bg-brand-dark/40" />
      <div className="relative h-full flex flex-col justify-center px-6">
        <h1 className="text-white text-xl md:text-2xl font-bold">{title}</h1>
        {subtitle && (
          <p className="text-white/80 text-sm mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}