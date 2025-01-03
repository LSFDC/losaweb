import MaxWidthWrapper from "@/components/max-width-wrapper";
import FeaturesSection from "@/components/sections/features-section";
import GallerySection from "@/components/sections/gallery-section";
import GuideSection from "@/components/sections/guides-section";
import HeroSection from "@/components/sections/hero-section";
import Link from "next/link";

export default function Page() {
  return (
    <MaxWidthWrapper>
      <main>
        <HeroSection />

        <section id="features" className="bg-black bg-opacity-70 py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-4xl font-bold">
              Game Features
            </h2>
            <FeaturesSection />
          </div>
        </section>

        <section id="guides" className="bg-black bg-opacity-70 py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-4xl font-bold">
              Game Guides
            </h2>
            <div>
              <GuideSection />
            </div>
          </div>
        </section>

        <GallerySection />

        <section id="download" className="bg-blue-900 bg-opacity-30 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-4xl font-bold">
              Ready to Begin Your Adventure?
            </h2>
            <p className="mb-8 text-xl">Download Client</p>
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link
                href="#"
                className="flex min-w-[200px] items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-lg font-bold text-white transition-colors duration-300 hover:bg-blue-700"
              >
                {/* <IoLogoWindows /> */}
                Download for Windows
              </Link>
              <Link
                href="#"
                className="flex min-w-[200px] items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 py-3 text-lg font-bold text-white transition-colors duration-300 hover:bg-indigo-700"
              >
                {/* <IoLogoApple /> */}
                Download for Mac
              </Link>
            </div>
          </div>
        </section>
      </main>
    </MaxWidthWrapper>
  );
}
