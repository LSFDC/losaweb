import { type Metadata } from "next";
import { Fragment } from "react";
import { NewsSection } from "./_component/news-section";
// import { getAllNews } from "@/services/news.service";

export const metadata: Metadata = {
  title: "News",
};

export default async function NewsPage() {
  const news = null;

  if (!news) {
    return (
      <div className="flex flex-col gap-6 items-center">
        <h1 className="text-4xl font-bold mt-10">News</h1>
        <p className="text-lg text-center max-w-xl text-gray-400">
          No news available.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6 items-center">
        <h1 className="text-4xl font-bold mt-10">News</h1>
        <p className="text-lg text-center max-w-xl text-gray-400">
          Breaking News, Fresh Perspectives.
        </p>

        <NewsSection news={news} />
      </div>
    </>
  );
}
