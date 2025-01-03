import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Season Pass",
};

export default function SeasonPassPage() {
  return (
    <>
      <div className="flex flex-col gap-6 items-center">
        <h1 className="text-4xl font-bold mt-10">Season Pass</h1>
        <p className="text-lg text-center max-w-xl text-gray-400">
          Embark on a seasonal journey filled with exclusive rewards, quests,
          and unique collectibles. Choose the Free Pass or upgrade to VIP for
          premium content and faster progression.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-10 mt-10">
          {/* Basic Season Pass Card */}
          <div className="relative w-80 border border-gray-500 rounded-xl overflow-hidden bg-gray-800 shadow-lg hover:scale-105 transition-all">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-400"></div>
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-white">
                Free Season Pass
              </h2>
              <p className="mt-4 text-gray-300">
                Progress at your own pace and unlock seasonal rewards as you
                complete quests and challenges.
              </p>
              <ul className="mt-6 space-y-2 text-gray-400">
                <li>🎁 Free seasonal items</li>
                <li>🗺️ Unlock new areas and quests</li>
                <li>⏳ Level up through play</li>
              </ul>
              <button className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium">
                Activate Free Pass
              </button>
            </div>
          </div>

          {/* VIP Season Pass Card */}
          <div className="relative w-80 border border-yellow-400 rounded-xl overflow-hidden bg-gradient-to-br from-yellow-300 to-orange-400 shadow-xl hover:scale-105 transition-all">
            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-600"></div>
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-black">
                VIP Season Pass
              </h2>
              <p className="mt-4 text-black">
                Unlock exclusive rewards, rare collectibles, and premium quests.
                Experience more with VIP access!
              </p>
              <ul className="mt-6 space-y-2 text-black">
                <li>🌟 Exclusive rewards & cosmetics</li>
                <li>🏆 Premium questlines & events</li>
                <li>⚡ Bonus XP for faster leveling</li>
              </ul>
              <button className="w-full mt-8 bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-medium">
                Upgrade to VIP
              </button>
            </div>
          </div>
        </div>

        <p className="text-gray-400 mt-8">
          The Season ends soon. Don&apos;t miss out on the adventure!
        </p>
      </div>
    </>
  );
}
