export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'Audio' | 'Smartphones' | 'Electronics' | 'Fashion' | 'Living' | 'Games & Toys';
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  inStock: boolean;
  badge?: 'HOT' | 'SALE' | 'NEW' | 'BESTSELLER';
  discountPercent?: number;
  isDealOfTheDay?: boolean;
  soldCount?: number;
  availableStock?: number;
  colors?: { name: string; hex: string }[];
  features?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export type CategoryFilter =
  | 'All'
  | 'Audio'
  | 'Smartphones'
  | 'Electronics'
  | 'Fashion'
  | 'Living'
  | 'Games & Toys';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
