export interface Product {
  _id: string;
  name: string;
  slug: {
      current: string;
  };
  image: {
      asset: {
          _id: string;
          url: string;
      };
  };
  price: number;
  description?: string;
  discountPercentage?: number;
  isFeaturedProduct?: boolean;
  stockLevel: number;
  category: string;
  _createdAt: string;
  _updatedAt?: string;
}