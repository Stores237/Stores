export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
  isSpecialOffer?: boolean;
  originalPrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
}