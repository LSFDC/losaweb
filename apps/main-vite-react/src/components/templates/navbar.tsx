import logo from "@/assets/logo.png";
import { navItems } from "@/lib/constant/navigation";

import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      const sections = ["home", "features", "guides", "gallery", "download"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn("fixed left-0 right-0 top-0 z-50 bg-transparent py-2", {
        "bg-black bg-opacity-50 backdrop-blur-md": isScrolled,
      })}
    >
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto flex items-center justify-between px-4 py-4"
      >
        <a href="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Lost Saga Logo"
            className="rounded-full"
            width={40}
            height={40}
          />
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-2xl font-bold text-transparent">
            Lost Saga
          </span>
        </a>
        <div className="hidden space-x-6 md:flex">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                document
                  .getElementById(item.href.replace("#", ""))
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
              className={cn("transition-colors hover:text-blue-400", {
                "text-blue-400": activeSection === item.href.slice(1),
              })}
            >
              {item.name}
            </button>
          ))}
        </div>
        <button
          className="text-white focus:outline-none md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-black bg-opacity-90 backdrop-blur-md md:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-4 py-2 text-center transition-colors hover:bg-blue-800"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}
