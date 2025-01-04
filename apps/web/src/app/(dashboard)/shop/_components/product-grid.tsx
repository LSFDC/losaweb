"use client";
import { Card, CardContent } from "@losaweb/ui/components/card";
import { Button } from "@losaweb/ui/components/button";
import Image from "next/image";
import { CategoryTabs } from "./category-tab";
import { useState } from "react";

interface CategoryList {
  id: string;
  name: string;
  status: number;
}
interface ShopData {
  id: string;
  title: string;
  slug: string;
  description: string;
  stock: number;
  price: number;
  status: number;
  isFeatured: true;
  thumbnailUrl: string;
  images: string;
  categoryId: string;
  category: CategoryList;
  publisedDate: string;
  updateDate: string;
}

interface ProductGridProps {
  products: ShopData[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const categoryMap = [
    "All",
    ...new Set(products.map((product) => product.category.name)),
  ];
  const [activeCategory, setActiveCategory] = useState("All");

  const regularProducts = products.filter(
    (product) =>
      activeCategory === "All" || product.category.name === activeCategory
  );

  return (
    <>
      <div>
        <CategoryTabs
          categories={categoryMap}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        {regularProducts.map((product) => (
          <Card
            key={product.id}
            className="group hover:cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <div className="aspect-square relative">
              <Image
                src={product.thumbnailUrl}
                alt={product.title}
                layout="fill"
                className="object-cover w-full h-full rounded-t-lg"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-sm text-muted-foreground">
                {product.category.name}
              </p>
              <div className="flex items-center justify-between mt-2">
                <p className="font-bold">{product.price}</p>
                <Button size="sm">Add to Cart</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
