"use client";
import Link from "next/link";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div>
      {/* Page Header */}
      <div className="h-[286px] bg-[#F6F5FF] flex items-center py-16">
        <div className="container md:w-[1170px] mx-auto px-4">
          <h1 className="text-3xl text-center md:text-left font-bold mb-4 md:ml-20">Contact Us</h1>
          <div className="flex justify-center md:justify-start items-center gap-2 text-sm md:ml-20">
            <Link href="/">Home</Link>
            <span>•</span>
            <Link href="/pages">Pages</Link>
            <span>•</span>
            <span className="text-[#FB2E86]">Contact Us</span>
          </div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-center items-start gap-16">
          {/* Left Side: Information About Us and Get In Touch */}
          <div className="w-full md:w-1/2 max-w-xl">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#151875] mb-4">Information About Us</h2>
              <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices
                mattis aliquam, malesuada diam est.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#151875] mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices
                tristique amet erat vitae eget dolor lobortis.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6 mt-6 w-full">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Your Name*"
                    required
                    className="border rounded-[4px] border-gray-500 p-2 w-full"
                  />
                  <input
                    type="email"
                    placeholder="Your E-mail*"
                    required
                    className="border rounded-[4px] border-gray-500 p-2 w-full"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  required
                  className="border rounded-[4px] border-gray-500 p-2 w-full"
                />
                <textarea
                  placeholder="Type Your Message"
                  required
                  className="min-h-[150px] border rounded-[4px] border-gray-500 p-2 w-full"
                />
                <button
                  type="submit"
                  className="bg-[#FB2E86] rounded-[4px] px-10 py-2 text-white hover:bg-[#FB2E86]/90"
                >
                  Send Mail
                </button>
              </form>
            </div>
          </div>

          {/* Right Side: Contact Way and Image */}
          <div className="w-full md:w-1/2 max-w-xl">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#151875] mb-6">Contact Way</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <img src="Group 100.png" alt="Contact information" className="w-full" />
              </div>
            </div>

            <div className="relative">
              <img src="/Group 124.png" alt="Contact illustration" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
