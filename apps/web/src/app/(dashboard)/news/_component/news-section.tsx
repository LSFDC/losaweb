"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import NewsCard from "./news-card";
import { Loader2 } from "lucide-react";

interface NewsProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  publishDate: string;
  authorIDX: number;
  status: string;
  views: number;
  thumbnailUrl: string;
  isFeatured: boolean;
}

export function NewsSection({ news }: { news: NewsProps[] }) {
  const [newsCount, setNewsCount] = useState(10); // Start with 10 items
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let currentLoaderRef = null;
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target?.isIntersecting && newsCount < news.length) {
        setLoading(true);
        setTimeout(() => {
          setNewsCount((prev) => prev + 10);
          setLoading(false);
        }, 1000); // Simulate loading delay
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
      currentLoaderRef = loaderRef.current;
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [newsCount, news.length]);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {news.slice(0, newsCount).map((data, i) => (
          <NewsCard
            key={i}
            title={data.title}
            description={data.description}
            image={data.thumbnailUrl}
            href={`/news/${data.slug}`}
            date={new Date(data.publishDate).toDateString()}
          />
        ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <Loader2 className="animate-spin h-8 w-8 text-gray-400" />
        </div>
      )}
      {newsCount < news.length && <div ref={loaderRef} className="h-10"></div>}
    </>
  );
}
