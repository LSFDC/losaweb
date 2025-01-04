import { Button } from "@losaweb/ui/components/button";

interface CategoryListProps {
  categories: string[];
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <section className="mb-8">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {categories.map((category) => (
          <Button key={category} variant="outline">
            {category}
          </Button>
        ))}
      </div>
    </section>
  );
}
