import { ProductGrid } from "./_components/product-grid";

import { ProductCarousel } from "./_components/product-carousel";
import { type Metadata } from "next";
// import { getShopData } from "@/services/shop.service";

export const metadata: Metadata = {
  title: "Shop",
};

export default async function ShopPage() {
  // const { shopdata } = await getShopData();

  return (
    <>
      {/* <FeaturedSection
        mainProduct={featuredProduct}
        secondaryProducts={secondaryProducts}
      /> */}
      <ProductCarousel />

      {/* <ProductGrid products={shopdata} /> */}
    </>
  );
}
