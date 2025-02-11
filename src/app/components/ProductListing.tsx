import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, X } from 'lucide-react';
import { Product } from '@/app/types/Product';
import ReviewsSection from "./PreviewComponent";

interface ProductListingProps {
  allProducts: Product[];
}

const ProductListing: React.FC<ProductListingProps> = ({ allProducts }) => {
  const [wishlistedProducts, setWishlistedProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistedProducts(JSON.parse(savedWishlist));
    }
  }, []);

  const handleAddToWishlist = (product: Product) => {
    const isAlreadyWishlisted = wishlistedProducts.some(item => item._id === product._id);
    
    let updatedWishlist: Product[];
    if (isAlreadyWishlisted) {
      updatedWishlist = wishlistedProducts.filter(item => item._id !== product._id);
    } else {
      updatedWishlist = [...wishlistedProducts, product];
    }
  
    setWishlistedProducts(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const handleProductSelect = (product: Product) => {
    const isSelected = selectedProducts.some(p => p._id === product._id);
    
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter(p => p._id !== product._id));
    } else if (selectedProducts.length < 2) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleCompareProducts = () => {
    if (selectedProducts.length === 2) {
      setIsCompareModalOpen(true);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleCompareProducts}
          disabled={selectedProducts.length !== 2}
          className={`px-4 py-2 rounded transition ${
            selectedProducts.length === 2
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Compare Products
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allProducts.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 relative group">
            <div className="absolute top-2 left-2 z-20">
              <input 
                type="checkbox"
                checked={selectedProducts.some(p => p._id === product._id)}
                onChange={() => handleProductSelect(product)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>

            {product.image && product.slug?.current && (
              <div className="relative">
                <Link href={`/products/${product.slug.current}`}>
                  <Image 
                    src={product.image.asset.url} 
                    alt={product.name} 
                    width={500} 
                    height={500} 
                    className="w-full h-60 object-contain mb-4 "
                  />
                </Link>
                <div className="absolute top-2 right-2 z-20">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToWishlist(product);
                    }}
                    className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition"
                  >
                    <Heart 
                      className={`${
                        wishlistedProducts.some(item => item._id === product._id)
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-500'
                      }`} 
                      size={16} 
                    />
                  </button>
                </div>
                <ReviewsSection productId={product._id} />
              </div>
            )}
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">£{product.price}</p>
          </div>
        ))}
      </div>

      {isCompareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Product Comparison</h2>
              <button 
                onClick={() => setIsCompareModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Attribute</th>
                  <th className="border p-3">{selectedProducts[0].name}</th>
                  <th className="border p-3">{selectedProducts[1].name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3 font-semibold">Price</td>
                  <td className="border p-3 text-center">£{selectedProducts[0].price}</td>
                  <td className="border p-3 text-center">£{selectedProducts[1].price}</td>
                </tr>
                <tr>
                  <td className="border p-3 font-semibold">Description</td>
                  <td className="border p-3">{selectedProducts[0].description}</td>
                  <td className="border p-3">{selectedProducts[1].description}</td>
                </tr>
                <tr>
                  <td className="border p-3 font-semibold">Category</td>
                  <td className="border p-3 text-center">{selectedProducts[0].category}</td>
                  <td className="border p-3 text-center">{selectedProducts[1].category}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;