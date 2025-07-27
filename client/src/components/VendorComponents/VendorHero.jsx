import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Required CSS
import img1 from "../../assets/image1.jpg"

const VendorHero = () => {
  return (
    <section className="bg-gradient-to-b from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF] w-full py-16">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-12">
          {/* Left Text Content */}
          <div className="flex flex-col items-center md:items-start flex-1">
            <button
              className="mb-6 flex items-center space-x-2 border border-indigo-600 text-indigo-600 text-xs rounded-full px-4 pr-1.5 py-1.5 hover:bg-indigo-50 transition"
              type="button"
            >
              <span>Empowering India's Street Food Vendors</span>
              <span className="flex items-center justify-center size-6 p-1 rounded-full bg-indigo-600">
                <svg width="14" height="11" viewBox="0 0 16 13" fill="none">
                  <path d="M1 6.5h14M9.5 1 15 6.5 9.5 12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>

            <h1 className="text-gray-900 font-semibold text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-tight">
              India’s #1 Platform for Buying{' '}
              <span className="text-indigo-600">Street Food Raw Materials</span>
            </h1>

            <p className="mt-4 text-gray-600 max-w-md text-sm sm:text-base leading-relaxed">
              Trusted by thousands of vendors across India — get the freshest ingredients, best prices,
              and doorstep delivery for your chaat, momo, dosa, roll, and more.
            </p>

            <div className="flex flex-col md:flex-row items-center mt-8 gap-3">
              <button
                className="bg-indigo-600 text-white px-6 pr-2.5 py-2.5 rounded-full text-sm font-medium flex items-center space-x-2 hover:bg-indigo-700 transition"
                type="button"
              >
                <span>Explore Ingredients</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4.821 11.999h13.43m0 0-6.714-6.715m6.715 6.715-6.715 6.715"
                    stroke="#fff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <a
                className="text-indigo-600 bg-indigo-100 px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 transition"
                href="#"
              >
                Become a Vendor
              </a>
            </div>
          </div>

          {/* Right Side Auto-Sliding Carousel */}
<div className="flex-1 w-full max-w-md h-auto md:h-[400px]">
  <Carousel
    autoPlay
    infiniteLoop
    showArrows={false}
    showStatus={false}
    showIndicators={true}
    showThumbs={false}
    interval={3000}
    className="rounded-lg shadow-lg overflow-hidden h-full"
  >
    <div className="h-[400px]">
      <img
        src={img1}
        alt="Vendor 1"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="h-[400px]">
      <img
        src="https://image.lexica.art/full_webp/11029f35-fe5f-477f-a2d5-0282096271b9"
        alt="Vendor 2"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="h-[400px]">
      <img
        src="https://image.lexica.art/full_webp/75c52bc1-95cc-49af-ab42-ff5e9eeb46b6"
        alt="Vendor 3"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="h-[400px]">
      <img
        src="https://image.lexica.art/full_webp/14e24076-6a31-45d0-ba70-d36d09530309"
        alt="Vendor 4"
        className="w-full h-full object-cover"
      />
    </div>
  </Carousel>
</div>

        </div>
      </div>
    </section>
  );
};

export default VendorHero;
