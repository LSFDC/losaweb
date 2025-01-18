import { useState } from "react";
import { motion } from "motion/react";

interface Feature {
  title: string;
  icon: string;
  picture: string[];
  description: string;
}

const features: Feature[] = [
  {
    title: "Infinite Hero",
    icon: "infinite-min.png",
    picture: ["feature-info1-cha-min.png", "feature-info1-img-min.png"],
    description:
      "Hundreds of heroes from various places and times are available, which will continue to be updated!",
  },
  {
    title: "Swap Hero",
    icon: "swap-min.png",
    picture: ["feature-info3-cha-min.png", "feature-info3-img-min.png"],
    description:
      "Perform combo attacks by changing heroes in the middle of the fight.",
  },
  {
    title: "Hero Upgrades",
    icon: "hero-min.png",
    picture: ["feature-info4-cha-min.png", "feature-info4-img-min.png"],
    description: "Upgrade each of your heroes and become the strongest.",
  },
  {
    title: "Gear Steal",
    icon: "gear-steal-min.png",
    picture: ["feature-info2-cha-min.png", "feature-info2-img-min.png"],
    description:
      "Take your opponent's gear and create new attack combinations.",
  },
  {
    title: "Gear Combination",
    icon: "gear-comb-min.png",
    picture: ["feature-info5-cha-min.png", "feature-info5-img-min.png"],
    description: "Combine Gear and create your own Hero.",
  },
];

export default function FeaturesSection() {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleMenuClick = (index: number) => {
    setSelectedMenu(index);
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative grid"
    >
      <div
        id="bg-features"
        className="h-[500px] rounded-lg bg-gradient-to-tl from-blue-300 via-blue-800 to-blue-800"
      >
        {features.map((item, index: number) => (
          <div
            id="content"
            className={`absolute bottom-0 left-0 right-0 top-0 ${
              selectedMenu === index ? "block" : "hidden"
            }`}
            key={index}
          >
            <img
              src={`/images/keyfeatures/${item.picture[0]}`}
              alt={item.title}
              width={433}
              height={586}
              className="absolute left-[25%] top-[50%] w-[40%] max-w-[433px] -translate-y-[50%] transform object-cover align-middle"
            />
            <div className="absolute right-10 top-[50%] w-[380px] -translate-y-[50%] transform py-0 pr-14 align-middle">
              <div className="relative text-2xl font-semibold text-white">
                <img
                  src={`/images/keyfeatures/${item.icon}`}
                  width={28}
                  height={10}
                  alt={item.title}
                  style={{ width: "auto", height: "auto" }}
                  className="h-auto w-auto"
                />
                <span className="uppercase">{item.title}</span>
              </div>
              <hr />
              <div className="mb-10 ml-0 mr-0 mt-7 text-sm leading-6 text-white">
                {item.description}
              </div>
              <div className="">
                <img
                  src={`/images/keyfeatures/${item.picture[1]}`}
                  width={328}
                  height={118}
                  alt={item.title}
                  style={{ width: "auto", height: "auto" }}
                  className="h-auto w-auto"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="keylist absolute left-0 top-0 h-full w-auto rounded-lg bg-black bg-opacity-70">
        <div className="mb-10 rounded-lg">
          {features.map((item, index: number) => (
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
              <img
                src={`/images/keyfeatures/${item.icon}`}
                width={28}
                height={10}
                alt={item.title}
                style={{ width: "auto", height: "auto" }}
              />
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
