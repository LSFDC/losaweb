import { Button } from "@losaweb/ui/components/button";
import { motion } from "motion/react";
import { ArrowDownIcon, ArrowRightIcon, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* <Image
        src={herobg1}
        alt="Lost Saga Game World"
        fill
        style={{ objectFit: "cover" }}
        className="absolute inset-0 z-0"
        priority
      /> */}
      <video autoPlay loop muted className="absolute inset-0 z-0 object-cover">
        <source src="./videos/bg-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-10 bg-black bg-opacity-50"></div>
      <div className="container z-20 mx-auto px-4 mt-10 text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className=" text-5xl font-bold leading-tight md:text-7xl"
        >
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text  font-bold text-transparent">
            Lost Saga
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-7xl text-sm md:text-2xl"
        >
          a free-to-play 3D fighting online game for the Lost Saga. The game
          featured characters from science fiction, culture, and real-world
          history, and offered players the ability to switch characters on the
          fly to improve gameplay, combinations, and the overall combat
          experience.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-x-4"
        >
          <Button
            asChild
            variant="expandIcon"
            Icon={ArrowRightIcon}
            iconPlacement="right"
            className="rounded-full bg-red-600 !px-8 !py-3 text-lg font-bold text-white transition-colors duration-300 hover:bg-red-700"
          >
            <a href="/" className="">
              Get Started
            </a>
          </Button>
          <Button
            variant="expandIcon"
            Icon={ArrowDownIcon}
            iconPlacement="right"
            onClick={() => {
              document
                .getElementById("download")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="rounded-full bg-blue-600 px-8 py-3 text-lg font-bold text-white transition-colors duration-300 hover:bg-blue-700"
          >
            Play Now
          </Button>
        </motion.div>
      </div>
      <motion.button
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 transform"
      >
        <ChevronDown
          size={32}
          onClick={() => {
            document.getElementById("features")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          className="text-white opacity-80 hover:cursor-pointer"
        />
      </motion.button>
    </section>
  );
}
