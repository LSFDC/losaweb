import Image from "next/image";
import { Product } from "../_data/product";

interface FeaturedSectionProps {
  mainProduct: Product;
  secondaryProducts: Product[];
}

export function FeaturedSection({
  mainProduct,
  secondaryProducts,
}: FeaturedSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Large Left Section */}
      <div className="md:col-span-2 relative group overflow-hidden rounded-lg">
        <Image
          src="/images/default.jpg"
          alt={mainProduct.name}
          layout="fill"
          className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="text-2xl font-bold">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
            laborum.
          </h3>
          <p className="text-lg">Lorem, ipsum.</p>
          <p className="text-xl font-bold mt-2">$5000</p>
        </div>
      </div>

      {/*  Small Right Column */}
      <div className="flex flex-col gap-6">
        {secondaryProducts.map((product) => (
          <div
            key={product.id}
            className="relative group overflow-hidden rounded-lg"
          >
            <Image
              src="/images/default.jpg"
              alt={product.name}
              className="w-full h-[190px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-sm">{product.category}</p>
              <p className="text-lg font-bold mt-1">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
