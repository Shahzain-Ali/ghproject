// pages/checkout.js
import Image from 'next/image';
// import Link from 'next/link';

const DemoPage = () => {
  const cartItems = [
    {
      id: 1,
      name: 'Ut enim consequat',
      size: 'Size XL',
      price: 39.00,
      image: '/Rectangle_11.png'
    },
    {
      id: 2,
      name: 'Ut enim consequat',
      size: 'Size XL',
      price: 39.00,
      image: '/Rectangle_144.png'
    },
    {
      id: 3,
      name: 'Ut enim consequat',
      size: 'Size XL',
      price: 39.00,
      image: '/Rectangle_146.png'
    },
    {
      id: 4,
      name: 'Ut enim consequat',
      size: 'Size XL',
      price: 39.00,
      image: '/Rectangle_145.png'
    },
    {
      id: 5,
      name: 'Ut enim consequat',
      size: 'Size XL',
      price: 39.00,
      image: '/Rectangle_147.png'
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal + 66.00; // Additional costs

  return (
    <div className="min-h-screen bg-gray-50 py-8">

    <div className="h-[200px] bg-[#F6F5FF] flex items-center py-16">
          <div className=" md:w-[1170px] ml-[90px]  customsm:mx-auto smm:mx-auto sm:ml-[18px] md:ml-[60px] customsm:w-[200px]">
            <h1 className="text-3xl  md:text-left font-bold mb-4  customsm:text-[18px]inline-block">
                 Hekto Demo
            </h1>
    
          </div>
        </div>


                         {/*############# Main Section #################*/}

      <div className="mx-auto px-4 w-[80%] my-10  customsm:w-[95%] smm:w-[90%]">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Left Column - Form */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-6">Hekto Demo</h1>
            <p className="text-gray-600 mb-8">Cart Information/ Shopping Payment</p>

            <div className="bg-[#F6F5FF] p-6 rounded-lg shadow-sm mb-6">
              <div className="mb-6 ">
                <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                <div className="flex items-center justify-between mb-4">
                  <input
                    type="text"
                    placeholder="Email or mobile phone number"
                    className="w-full p-3 border border-gray-200 rounded-md"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="updates" />
                  <label htmlFor="updates" className="text-sm text-gray-600">
                    Keep me up to date on news and exclusive offers
                  </label>
                </div>
              </div>

              <div className=''>
                <h2 className="text-lg font-semibold mb-4">Shipping address</h2>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 ">
                  <input
                    type="text"
                    placeholder="First name"
                    className="p-3 border-b-2 border-gray-300 w-[100%] rounded-md bg-[#F6F5FF]"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="p-3 border-b-2 border-gray-300 w-[100%] rounded-md bg-[#F6F5FF]"
                  />
                  <div className='col-span-2'>
                  <input
                    type="text"
                    placeholder="Address"
                    className="p-3 border-b-2 border-gray-300 w-[100%] rounded-md md:col-span-2 bg-[#F6F5FF]"
                  />
                  </div>
                  <div className='col-span-2'>
                  <input
                    type="text"
                    placeholder="Apartment, suite, etc. (optional)"
                    className="p-3 border-b-2 border-gray-300 w-[100%] rounded-md md:col-span-2 bg-[#F6F5FF]"
                  />
                  </div>
                  <div className='col-span-2 '>
                  <input
                    type="text"
                    placeholder="City"
                    className="p-3 border-b-2 border-gray-300 w-[100%] bg-[#F6F5FF]"
                  />
                  </div>
                  <input
                    type="text"
                    placeholder="Bangladesh"
                    className="p-3 border-b-2 border-gray-300 w-[100%] rounded-md bg-[#F6F5FF]"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="p-3 border-b-2 border-gray-300 w-[100%] rounded-md bg-[#F6F5FF]"
                  />
                </div>
              </div>
            </div>

            <button className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 transition-colors">
              Continue Shopping
            </button>
          </div>

          {/* Right Column - Cart Summary */}
          <div className="lg:w-1/3 ">
            <div className="bg-white p-6 rounded-lg shadow-sm border-b-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.size}</p>
                    </div>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
           
          </div>
          <div className='bg-[#F6F5FF] py-6 px-4 mt-4 rounded-sm'>
              <div className="">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Shipping & taxes calculated at checkout
                </p>
              </div>

              <button className="w-full bg-green-500 text-white py-3 rounded-md mt-6 hover:bg-green-600 transition-colors">
                Proceed To Checkout
              </button>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;