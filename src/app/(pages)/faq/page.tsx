"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FAQ = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { name, subject, message } = formData;
    const mailtoLink = `mailto:support@yourcompany.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\n\nMessage: ${message}`)}`;
    
    window.location.href = mailtoLink;
  };

  return (
    <div className="w-full pb-8 md:py-12">
      <div className="h-[200px] bg-[#F6F5FF] mb-8 flex items-center py-16 w-[100%px]">
        <div className="md:w-[1170px] ml-[82px] customsm:mx-auto smm:mx-auto sm:ml-[18px] md:ml-[60px] customsm:w-[200px]">
          <h1 className="text-3xl md:text-left font-bold mb-4 customsm:text-[18px] inline-block">
            FAQ
          </h1>
          <div className="flex md:justify-start items-center gap-2 text-sm md:ml-0 customsm:w-[250px]">
            <Link href="/">Home</Link>
            <span>•</span>
            <Link href="/pages">Pages</Link>
            <span>•</span>
            <span className="text-[#FB2E86]">FAQ</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 w-[75%]">
        {/* FAQ Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-[#151875] text-2xl md:text-3xl font-semibold mb-8">
            General Information
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-[#151875] font-medium text-lg">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                We accept major credit and debit cards, PayPal, and other secure payment methods.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-[#151875] font-medium text-lg">
                How can I track my order?
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Once your order is shipped, you&apos;ll receive an email with a tracking link to monitor its progress.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-[#151875] font-medium text-lg">
                What is your return policy?
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                You can return items within 30 days of purchase if they&apos;re unused and in original packaging.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-[#151875] font-medium text-lg">
                Are your products covered by warranty?
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Yes, most of our products come with a 1-year warranty. Please check individual product pages for details.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-[#151875] font-medium text-lg">
                Do you offer international shipping?
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Yes, we ship worldwide. Shipping costs and delivery times vary by destination.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-[#151875] font-medium text-lg">
                How can I contact customer support?
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                You can contact us via the “Contact Us” form, email, or by calling our support team directly.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="w-full lg:w-1/2 bg-gray-50 rounded-lg p-6 md:p-8">
          <h2 className="text-[#151875] text-xl md:text-2xl font-semibold mb-6">
            Ask a Question
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name*"
                required
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject*"
                required
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                placeholder="Type Your Message*"
                required
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-grow bg-pink-500 text-white px-8 py-3 rounded-md hover:bg-pink-600 transition-colors duration-200"
              >
                Submit
              </button>
              <a
                href={``}
                className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors duration-200 text-center"
              >
                Send Mail
              </a>
            </div>
          </form>
        </div>
      </div>

      <section className="my-6">
        <Image
          src="/Group_124 (2).png"
          alt=""
          width={950}
          height={50}
          className="mx-auto"
        ></Image>
      </section>
    </div>
  );
};

export default FAQ;
