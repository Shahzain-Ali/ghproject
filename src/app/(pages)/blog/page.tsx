import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Blog = () => {
  return (
    <div>
        <div className="h-[200px] bg-[#F6F5FF] flex items-center py-16">
          <div className="container md:w-[1170px] mx-auto px-6">
            <h1 className="text-3xl text-center md:text-left font-bold mb-4 md:ml-20">
              Blog Page
            </h1>
            <div className="flex justify-center md:justify-start items-center gap-2 text-sm md:ml-20">
              <Link href="/">Home</Link>
              <span>•</span>
              <Link href="/pages">Pages</Link>
              <span>•</span>
              <span className="text-[#FB2E86]">Blog Page</span>
            </div>
          </div>
        </div>

      <div className="container mx-auto px-4 w-[80%] py-6 my-6 ">
        {/* <!-- Main Content --> */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* <!-- Blog Posts --> */}
          <div className="lg:col-span-3">
            {/* <!-- Post 1 --> */}
            <div className="mb-8 border-b pb-4">
            <Image
              src="/bruce-mars-FWVMhUa_wbY-unsplash 2 (1).png"
              alt="Post Image"
              width={500} // Specify the width of the image
              height={240} // Specify the height of the image
              className="w-full h-60 object-cover rounded-md"
            />
              <div className="mt-4 flex items-center justify-between">
                <p className="text-purple-600">Self Author</p>
                <p className="text-gray-500 text-sm bg-[#FFA454] p-1 rounded-sm">Aug 29 2023</p>
              </div>
              <h2 className="mt-2 text-xl font-bold text-gray-800">
                Mauris at orci non vulputate diam tincidunt nec.
              </h2>
              <p className="mt-2 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum...
              </p>
              <a
                href="#"
                className="mt-4 inline-block text-purple-600 font-semibold"
              >
                Read More &rarr;
              </a>
            </div>

            {/* <!-- Post 2 --> */}
            <div className="mb-8 border-b pb-4">
            <Image
              src="/bruce-mars-FWVMhUa_wbY-unsplash 3 (1).png"
              alt="Post Image"
              width={500} // Specify the width of the image
              height={240} // Specify the height of the image
              className="w-full h-60 object-cover rounded-md"
            />
              
              <div className="mt-4 flex items-center justify-between">
                <p className="text-purple-600">Self Author</p>
                <p className="text-gray-500 text-sm bg-[#FFA454] p-1 rounded-sm">Aug 29 2023</p>
              </div>
              <h2 className="mt-2 text-xl font-bold text-gray-800">
                Aenean vitae in aliquam ultrices lectus.
              </h2>
              <p className="mt-2 text-gray-600 ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum...
              </p>
              <a
                href="#"
                className="mt-4 inline-block text-purple-600 font-semibold"
              >
                Read More &rarr;
              </a>
            </div>

            {/* <!-- Post 3 --> */}
            <div className="mb-8 border-b pb-4">
            <Image
              src="/bruce-mars-FWVMhUa_wbY-unsplash 4 (1).png"
              alt="Post Image"
              width={500} // Specify the width of the image
              height={240} // Specify the height of the image
              className="w-full h-60 object-cover rounded-md"
            />
              
              <div className="mt-4 flex items-center justify-between">
                <p className="text-purple-600">Self Author</p>
                <p className="text-gray-500 text-sm bg-[#FFA454] p-1 rounded-sm">Aug 29 2023</p>
              </div>
              <h2 className="mt-2 text-xl font-bold text-gray-800">
                Phasellus vitae magna eget ipsum sollicitudin.
              </h2>
              <p className="mt-2 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum...
              </p>
              <a
                href="#"
                className="mt-4 inline-block text-purple-600 font-semibold"
              >
                Read More &rarr;
              </a>
            </div>
          </div>

          {/* <!-- Sidebar --> */}
          <div>

            {/* <!-- Search --> */}
            <h1>Search</h1>
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search"
                className="w-full border rounded-md px-4 py-2 focus:outline-none"
              />
            </div>

            

            {/* <!-- Categories --> */}
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <div className='mb-2'>
                <Image 
                src="/Group_223.png"
                alt=""
                >

                </Image>
              </div>
            
                {/* <!-- Recent Posts --> */}

              <h3 className="font-bold text-lg mb-4">Recent Post</h3>
              <div className='mb-2'>
              <Image 
                src="/Group_222.png"
                alt=""
                >
                </Image>
              </div>
              
              <h3 className="font-bold text-lg mb-4">Sale Product</h3>
              <div className='mb-2'>
              <Image 
                src="/Group_221.png"
                alt=""
                >
                </Image>
              </div>
            

               {/* <!-- Offer Product --> */}



              <h3 className="font-bold text-lg mb-4">Offer Product</h3>
              <div className='my-2'>
              <Image 
                src="Group_225.png"
                alt=""
                >
                </Image>
                
              </div>
            </div>


             {/* <!-- Offer Product --> */}

            <div className='mb-4'>
              <h3 className="font-bold text-lg mb-4">Follow</h3>
              <div className='my-2 '>
              <i className="fab fa-facebook "></i>
              <i className="fab fa-instagram ml-4"></i>
              <i className="fab fa-twitter ml-4 "></i>
              </div>
            </div>

            <h3 className="font-bold text-lg mb-4">Tags</h3>
            <div >
                <li className='inline-block hover:border-b hover:border-b-[#151875] text-[#151875]'>General</li><li className='inline-block ml-2 text-[#FB2E86] hover:border-b hover:border-b-[#151875] text-[#151875]'>Atsanil</li>
                <li className="inline-block ml-2 hover:border-b hover:border-b-[#151875] text-[#151875]">Insas</li> <br />
                <li className='inline-block hover:border-b hover:border-b-[#151875] text-[#151875]'>Bibsaas</li><li className='inline-block ml-2 hover:border-b hover:border-b-[#151875] text-[#151875]'>Nulla.</li>
            </div>
                
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
