'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import FilteringData from '../components/FilteringData';
import ProductListing from '../components/ProductListing';
import { 
  getAllProducts, 
  getProductsByCategory, 
  searchProducts 
} from "../../sanity/lib/queries";
import { Product } from '@/app/types/Product';

// Create a separate component for the search functionality
const ProductsContent = () => {
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
      e.preventDefault();
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

// Loading component
const LoadingComponent = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="bg-gray-200 h-64 rounded"></div>
        ))}
      </div>
    </div>
  </div>
);

// Main component
const ProductsPage = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <ProductsContent />
    </Suspense>
  );
};

export default ProductsPage;