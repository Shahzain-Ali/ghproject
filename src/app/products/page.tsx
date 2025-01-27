'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import FilteringData from '../components/FilteringData/FilteringData';
import ProductListing from '../components/ProductListing/ProductListing';
import { 
  getAllProducts, 
  getProductsByCategory, 
  searchProducts 
} from "../../sanity/lib/queries";
import { Product } from '@/app/types/Product';

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let fetchedProducts: Product[];
        
        if (searchTerm) {
          fetchedProducts = await searchProducts(searchTerm);
        } else if (category) {
          fetchedProducts = await getProductsByCategory(category);
        } else {
          fetchedProducts = await getAllProducts();
        }
        
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category, searchTerm]);

  const handleProductsChange = (filteredProducts: Product[]) => {
    setProducts(filteredProducts);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Trigger search when Enter key is pressed
      e.preventDefault();
      // The search will be triggered by the useEffect due to searchTerm change
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex items-center space-x-4">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={handleSearchSubmit}
            className="border px-2 py-1 rounded"
          />
          <FilteringData onProductsChange={handleProductsChange} />
        </div>
      </div>
      <ProductListing allProducts={products} />
    </div>
  );
};

export default ProductsPage;