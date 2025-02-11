'use client';

import React, { useState, useEffect } from 'react';
import { FaCaretDown } from 'react-icons/fa';
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
    <div className="relative">
      <div 
        onClick={toggleCategoryDropdown} 
        className="flex items-center justify-between px-4 py-2 border rounded cursor-pointer"
      >
        <span>{selectedCategory || 'Select Category'}</span>
        <FaCaretDown />
      </div>

      {isCategoryDropdownOpen && (
        <ul className="absolute z-10 w-full border rounded mt-1 bg-white shadow-lg">
          {categories.map((category) => (
            <li 
              key={category._id}
              onClick={() => handleCategoryChange(category.name)}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
            >
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilteringData;