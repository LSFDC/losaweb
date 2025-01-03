export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Leather Backpack",
    price: 129.99,
    category: "Bags",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Minimalist Watch",
    price: 199.99,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 159.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Cotton T-Shirt",
    price: 29.99,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
  },
];

export const categories = [
  "All",
  "Clothing",
  "Accessories",
  "Electronics",
  "Bags",
];
