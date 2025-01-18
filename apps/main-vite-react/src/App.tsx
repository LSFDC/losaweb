import FeaturesSection from "@/components/sections/features-section";
import GallerySection from "@/components/sections/gallery-section";
import GuideSection from "@/components/sections/guides-section";
import HeroSection from "@/components/sections/hero-section";
import MaxWidthWrapper from "@/components/templates/max-width-wrapper";

function App() {
  return (
    <main className="min-h-screen antialiased">
      <MaxWidthWrapper>
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

        <section id="download" className="bg-black bg-opacity-30 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-4xl font-bold">
              Ready to Begin Your Adventure?
            </h2>
            <p className="mb-8 text-xl">Download Client</p>
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <a
                href="#"
                className="flex min-w-[200px] items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-3 text-lg font-bold text-white transition-colors duration-300 hover:bg-red-700"
              >
                {/* <IoLogoWindows /> */}
                Download for Windows
              </a>
              <a
                href="#"
                className="flex min-w-[200px] items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 py-3 text-lg font-bold text-white transition-colors duration-300 hover:bg-indigo-700"
              >
                {/* <IoLogoApple /> */}
                Download for Mac
              </a>
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
    </main>
  );
}

export default App;
