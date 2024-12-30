// types.ts
interface Product {
    id: number;
    name: string;
    rating: number;
    price: string;
    image: string;
    isSelected?: boolean;
  }
  
  // components/ProductGrid.tsx
  import Image from 'next/image';
  import { FC } from 'react';
  
  const ProductGrid: FC = () => {
    const products: Product[] = [
      {
        id: 1,
        name: "Vel elit euismod",
        rating: 3,
        price: "$26.00",
        image: "/image_1173.png"
      },
      {
        id: 2,
        name: "Ultricies condimentum imperdiet",
        rating: 5,
        price: "$42.00",
        image: "/image_1165.png"
      },
      {
        id: 3,
        name: "Vitae suspendisse sed",
        rating: 4,
        price: "$52.00",
        image: "/image_9.png",
        isSelected: true
      },
      {
        id: 4,
        name: "Sed at fermentum",
        rating: 3,
        price: "$34.00",
        image: "/10011_1 (1).png"
      },
      {
        id: 5,
        name: "Fusce pellentesque at",
        rating: 4,
        price: "$34.00",
        image: "/unnamed_1.png"
      },
      {
        id: 6,
        name: "Vestibulum magna laoreet",
        rating: 5,
        price: "$42.00",
        image: "/1562173100-movado-connect-1562173094 2.png"
      },
      {
        id: 7,
        name: "Sollicitudin amet orci",
        rating: 3,
        price: "$68.00",
        image: "/okay.png"
      },
      {
        id: 8,
        name: "Ultrices ipsum sit",
        rating: 4,
        price: "$47.00",
        image: "/image_1164 (1).png"
      },
      {
        id: 9,
        name: "Pellentesque condimentum ac",
        rating: 5,
        price: "$32.00",
        image: "/res_7e.png"
      },
      {
        id: 10,
        name: "Cras scelerisque velit",
        rating: 4,
        price: "$56.00",
        image: "/cam_2.png"
      },
      {
        id: 11,
        name: "Lectus vulputate faucibus",
        rating: 3,
        price: "$47.00",
        image: "/purepng_1.png"
      },
      {
        id: 12,
        name: "Purus vitae, at",
        rating: 5,
        price: "$47.00",
        image: "/10011_1 (1).png"
      },
    ];
  
    const renderStars = (rating: number) => (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-sm ${index < rating ? 'text-pink-500' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  
    return (
      <div className="max-w-5xl sm:max-w-2xl smm:max-w-xl customsm:max-w-xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 customsm:w-[70%]  smm:w-[60%] w-[90%] mx-auto ">
          {products.map((product) => (
            <div
              key={product.id}
              className={`bg-white border-2 customsm:h-[250px] customsm:py-4 customsm:px-0 smm:h-[250px] smm:p-0 sm:h-[250px] sm:p-0 p-4 hover:ring-2 hover:ring-purple-500 rounded-lg transition-all duration-300 hover:shadow-lg ${
                product.isSelected ? 'hover:ring-2 hover:ring-purple-500' : ''
              }`}
            >
              <div className="relative aspect-square mb-4 customsm:h-[140px] customsm:mx-auto smm:h-[150px] smm:mx-auto sm:h-[130px] sm:mx-auto ">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover bg-center rounded-lg"
                />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex justify-center mb-2">
                  {renderStars(product.rating)}
                </div>
                <p className="text-pink-500 font-medium">
                  {product.price}
                  <span className="text-gray-400 line-through ml-2">$65.00</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ProductGrid;