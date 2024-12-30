import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FAQ = () => {
  return (
    <div className="w-full pb-8 md:py-12">
          <div className="h-[200px] bg-[#F6F5FF] mb-8 flex items-center py-16 w-[100%px]">
          <div className=" md:w-[1170px] ml-[82px]  customsm:mx-auto smm:mx-auto sm:ml-[18px] md:ml-[60px] customsm:w-[200px]">
            <h1 className="text-3xl  md:text-left font-bold mb-4  customsm:text-[18px]inline-block">
              FAQ
            </h1>
            <div className="flex md:justify-start items-center gap-2 text-sm  md:ml-0 customsm:w-[250px] ">
              <Link href="/">Home</Link>
              <span>•</span>
              <Link href="/pages">Pages</Link>
              <span>•</span>
              <span className="text-[#FB2E86]">FAQ</span>
            </div>
          </div>
        </div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 w-[75%] ">
        {/* FAQ Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-[#151875] text-2xl md:text-3xl font-semibold mb-8">
            General Information
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-[#151875] font-medium text-lg">
                Eu dictumst cum ut sed euismod condimentum?
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sed
                tristique mollis vitae, consequat gravida sagittis.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-[#151875] font-medium text-lg">
                Magna bibendum est fermentum eros?
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sed
                tristique mollis vitae, consequat gravida sagittis.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-[#151875] font-medium text-lg">
                Odio malesuada nec cras ornare volutpat?
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sed
                tristique mollis vitae, consequat gravida sagittis.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-[#151875] font-medium text-lg">
                Eius ut kimenih culuma ha veli qua muma?
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sed
                tristique mollis vitae, consequat gravida sagittis.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="w-full lg:w-1/2 bg-gray-50 rounded-lg p-6 md:p-8">
          <h2 className="text-[#151875] text-xl md:text-2xl font-semibold mb-6">
            Ask a Question
          </h2>

          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name*"
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Subject*"
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <textarea
                rows={6}
                placeholder="Type Your Message*"
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <button
              type="submit"
              className="bg-pink-500 text-white px-8 py-3 rounded-md hover:bg-pink-600 transition-colors duration-200"
            >
              Send Mail
            </button>
          </form>
        </div>
      </div>

      <section className='my-6'>
            <Image src="/Group_124 (2).png" alt='' width={950} height={50} className='mx-auto'></Image>
      </section>
    </div>
  );
};

export default FAQ;