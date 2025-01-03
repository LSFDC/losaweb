"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="">
      <Tabs value={activeCategory} onValueChange={onCategoryChange}>
        <TabsList className=" justify-start overflow-x-auto">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="px-6">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
