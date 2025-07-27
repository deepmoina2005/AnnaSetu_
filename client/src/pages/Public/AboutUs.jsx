// src/components/AboutUs.jsx
import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 via-lime-100 to-yellow-50 h-screen flex items-center">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        
        {/* Text Section */}
        <div>
          <h3 className="text-4xl font-bold text-green-700 mb-6">About GoodFresh</h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            At <span className="text-orange-500 font-semibold">GoodFresh</span>, we believe in the power of local. Our mission is to connect small-scale farmers, street vendors, and home-based food producers directly with their communities.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            By creating a digital space where trust and freshness come first, we help vendors thrive while giving customers access to healthy, authentic, and locally-sourced products. Together, we’re building a fresher future — one connection at a time.
          </p>
        </div>

        {/* Image Section */}
        <div>
          <img
            src="./src/assets/GoodFresh_logo.png"
            alt="Local farmers community"
            className="rounded-2xl shadow-lg w-[400px] h-[400px] hover:scale-105 transition duration-300 ml-40"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;