import Image from "next/image";

import ComponentBenefitLandingPage from "@/components/layouts/landing/benefit";
import ComponentRecentLandingPage from "@/components/layouts/landing/recent";

export default function Home() {
  return (
    <main className="">

      {/* Header Banner */}
      <header className="relative w-full h-screen">
        <Image 
          src="/car-banner.jpg" 
          alt="Car Banner" 
          layout="fill" 
          objectFit="cover" 
          quality={100} 
          className="z-0"
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Rent Your Dream Car</h1>
        </div>
      </header>

      {/* Card */}
      <div>
        <ComponentBenefitLandingPage />
      </div>

      {/* Recent Car */}
      <div>
        <ComponentRecentLandingPage />
      </div>

    </main>
  );
}
