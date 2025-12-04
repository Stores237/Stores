export function Hero() {
  return (
    <div className="bg-gray-100">
      {/* Main hero banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="/Banner page.png"
          alt="iPhone 14 Pro"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>
    </div>
  );
}