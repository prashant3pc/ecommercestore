export interface Category {
  slug: string;
  name: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  thumbnail: string;
  rating: number;
  stock: number;
  brand?: string;
  discountPercentage?: number;
}

export interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}