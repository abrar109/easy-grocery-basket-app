
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  unit: string;
}

export interface Category {
  name: string;
  image?: string;
}
