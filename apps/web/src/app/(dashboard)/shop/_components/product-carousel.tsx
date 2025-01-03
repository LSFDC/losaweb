"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { products } from "../_data/product";
import Autoplay from "embla-carousel-autoplay";

export function ProductCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const secondaryProducts = products;
  return (
    <div
      className="embla mx-auto w-full h-[400px] border rounded-lg "
      ref={emblaRef}
    >
      <div className="embla__container h-full w-full mb-3">
        {secondaryProducts.map((product) => (
          <div
            key={product.id}
            className="embla__slide flex items-center justify-center relative group overflow-hidden hover:cursor-pointer"
          >
            <Image
              src="/images/shop-default.jpeg"
              fill
              style={{ objectFit: "fill" }}
              alt={product.name}
              className="w-full h-auto transition-transform duration-300 group-hover:scale-105 rounded-lg"
            />

            {/* <div className="absolute inset-0  flex flex-col justify-end  text-white opacity-100 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex flex-col p-4 bg-black/60">
                <h3 className="text-lg font-bold">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel,
                  assumenda?
                </h3>
                <p className="text-sm">Lorem, ipsum.</p>
                <p className="text-lg font-bold mt-1">$5000</p>
              </div>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
