import { Card, CardContent } from "@losaweb/ui/components/card";
import { Badge } from "@losaweb/ui/components/badge";
import { Button } from "@losaweb/ui/components/button";
import { Product } from "../_data/product";
import Image from "next/image";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden group">
            <div className="aspect-[16/9] relative">
              <Image
                src="/images/default.jpg"
                alt={product.name}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <Badge className="absolute top-4 right-4">Featured</Badge>

              {/* Overlay with product details */}
              <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center p-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="text-2xl font-bold mb-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
                  repellendus!
                </h3>
                <p className="text-lg mb-2">{product.category}</p>
                <p className="text-3xl font-bold mb-4">${product.price}</p>
                <div className="space-x-4">
                  <Button variant="secondary" size="lg">
                    View Details
                  </Button>
                  <Button variant="default" size="lg">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-muted-foreground">{product.category}</p>
              <p className="text-lg font-bold mt-2">${product.price}</p>
              <Button className="w-full mt-4">Add to Cart</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
