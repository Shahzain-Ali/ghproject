/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Product {
  quantity: ReactI18NextChildren | Iterable<ReactI18NextChildren>;
  dimensions: any;
  features: any;
  discountPercentage: any;
  stockLevel: string;
  _id: string;
  name: string;
  description: string;
  price: string | number;
  image: {
    asset: { 
      _id: string; 
      url: string; 
    };
  };
  slug: {
    current: string;
  };
  category?: string; // Note the optional
  _createdAt: string; // Ensure this is a string
  _updatedAt?: string;
}