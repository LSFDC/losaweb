import { useState } from "react";
import { motion } from "motion/react";

interface GuidesProps {
  title: string;
  picture: string[];
  description: string;
}

const guides = [
  {
    title: "Attack System",
    picture: ["keybinds.jpg"],
    description:
      "At first glance seems relatively simple, but theres a lot of advanced fighting mechanics that go into just a few buttons. With such a wide variety of characters, explaining the details behind each and every character is a daunting task, but this guide will help you to understand the basic and advanced fighting mechanics behind in order to learn the characters you pick up!",
  },
  {
    title: "Game Modes",
    picture: ["gamemodes.png"],
    description:
      "Offers a variety of game modes for its players to take in and participate in but before you try them all out take a few to learn what each mode is so you know exactly what you're getting into! offers PvP and PvE Modes.",
  },
];

export default function GuideSection() {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleMenuClick = (index: number) => {
    setSelectedMenu(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative"
    >
      <div
        id="bg-features"
        className="h-[500px] rounded-lg bg-gradient-to-tl from-blue-300 via-blue-800 to-blue-800"
      >
        {guides.map((item: GuidesProps, index: number) => (
          <div
            className={`absolute bottom-0 left-0 right-0 top-0 ${
              selectedMenu === index ? "block" : "hidden"
            }`}
            key={index}
          >
            <img
              src={`/images/guides/${item.picture[0]}`}
              alt={item.title}
              width={600}
              height={397}
              className="absolute left-[17%] top-[50%] w-[45%] -translate-y-[50%] transform object-cover align-middle"
            />
            <div className="absolute right-10 top-[50%] w-[380px] -translate-y-[50%] transform py-0 pr-14 align-middle">
              <div className="relative text-2xl font-semibold text-white">
                {item.title}
              </div>
              <hr />
              <div className="mb-10 ml-0 mr-0 mt-7 text-sm leading-6 text-white">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="keylist absolute left-0 top-0 h-full w-auto overflow-y-auto rounded-lg bg-black bg-opacity-70">
        <div className="mb-10">
          {guides.map((item: GuidesProps, index: number) => (
            <a
              id="menu"
              href={"#"}
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick(index);
              }}
              key={index}
              className={`flex h-[100px] cursor-pointer flex-col items-center justify-center rounded-t-sm px-4 py-0 text-center text-sm leading-5 hover:bg-blue-800 hover:text-white ${
                selectedMenu === index
                  ? "bg-blue-800"
                  : "bg-black bg-opacity-70"
              } text-white transition-all duration-300 ease-in-out`}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
