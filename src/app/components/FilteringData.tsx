'use client';

import React, { useState, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { fetchAllProducts } from '@/sanity/lib/queries';
import { Product } from '@/app/types/Product';

interface FiltersProps {
  onProductsChange: (products: Product[]) => void;
}

const FilteringData: React.FC<FiltersProps> = ({ onProductsChange }) => {
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchAllProducts();
        const uniqueCategories = Array.from(
          new Set(data.filter(product => product.category).map(product => product.category))
        )
        .filter(category => category !== undefined)
        .map((name, index) => ({ _id: `category_${index}`, name: name! }));
        
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.category-dropdown')) {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    setIsCategoryDropdownOpen(false);
    
    const allProducts = await fetchAllProducts();
    const filteredProducts = allProducts.filter(
      product => product.category === category
    );
  
    onProductsChange(filteredProducts);
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  return (
    <div className="relative category-dropdown">
      <div 
        onClick={toggleCategoryDropdown} 
        className="flex items-center justify-between w-48 customsm:w-40 smm:w-40 sm:w-40 md:w-40 lg:w-40 px-4 py-2 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-indigo-400 transition-colors"
      >
        <span className="text-sm font-medium truncate">
          {selectedCategory || 'Select Category'}
        </span>
        <ChevronDown size={18} className={`transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
      </div>

      {isCategoryDropdownOpen && (
        <div className="absolute border right-0 top-full customsm:right-auto customsm:w-[8rem] smm:w-[8rem] sm:w-[10rem] mt-2 w-48 bg-white text-black shadow-lg rounded-lg border-gray-200 z-50">
          <div className="py-1">
            {categories.map((category) => (
              <div
                key={category._id}
                onClick={() => handleCategoryChange(category.name)}
                className={`
                  flex items-center justify-between px-4 py-2 cursor-pointer 
                  hover:bg-[#7E33E0] hover:text-white transition-colors duration-200
                  ${selectedCategory === category.name ? 'bg-gray-100' : ''}
                `}
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{category.name}</span>
                </div>
                {selectedCategory === category.name && (
                  <Check className="w-5 h-5" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilteringData;