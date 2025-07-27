// src/components/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="font-sans bg-gradient-to-br from-green-50 via-lime-100 to-yellow-50">

      {/* 🌿 Hero Section */}
      <section className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-14">
          <div className="text-center md:text-left md:w-1/2">
            <h2 className="text-6xl font-extrabold text-green-700 leading-tight mb-6">
              Welcome to <span className="text-orange-500">GoodFresh</span>
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Bringing you the best of fresh produce, straight from local farmers to your table. Support local. Eat fresh.
            </p>
            <div className="space-x-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full shadow-md transition">
                About Us
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-md transition">
                Contact Us
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="./src/assets/Home_image.png"
              alt="Fresh produce market"
              className="rounded-2xl shadow-xl w-full hover:scale-105 transition-transform duration-300 bg-white"
            />
          </div>
        </div>
      </section>

      {/* 🧡 About Us Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div>
            <h3 className="text-4xl font-bold text-green-700 mb-6">About GoodFresh</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              At <span className="text-orange-500 font-semibold">GoodFresh</span>, we believe in the power of local. Our mission is to connect small-scale farmers, street vendors, and home-based food producers directly with their communities.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              By creating a digital space where trust and freshness come first, we help vendors thrive while giving customers access to healthy, authentic, and locally-sourced products.
            </p>
          </div>
          <div>
            <img
              src="./src/assets/GoodFresh_logo.png"
              alt="Local farmers community"
              className="rounded-2xl shadow-lg w-[400px] h-[400px] hover:scale-105 transition duration-300 ml-40"
            />
          </div>
        </div>
      </section>

      {/* 🚀 How to Use Section (Cool Design) */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-green-800 mb-4">How to Use GoodFresh</h3>
          <p className="text-gray-600 text-lg mb-12">Just 3 easy steps to enjoy freshness at your doorstep.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div className="bg-white rounded-xl shadow-xl p-6 transition hover:scale-105 hover:bg-green-50">
              <div className="text-5xl mb-4">📝</div>
              <h4 className="text-xl font-semibold text-green-700 mb-2">1. Register</h4>
              <p className="text-gray-600">Create an account as a customer or vendor to get started.</p>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6 transition hover:scale-105 hover:bg-green-50">
              <div className="text-5xl mb-4">🛒</div>
              <h4 className="text-xl font-semibold text-green-700 mb-2">2. Browse</h4>
              <p className="text-gray-600">Explore fresh produce listed by trusted local sellers.</p>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6 transition hover:scale-105 hover:bg-green-50">
              <div className="text-5xl mb-4">🤝</div>
              <h4 className="text-xl font-semibold text-green-700 mb-2">3. Connect</h4>
              <p className="text-gray-600">Place orders or connect with vendors directly for more info.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 📬 Contact Us Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-4">Contact Us</h2>
          <p className="text-gray-700 text-lg mb-10">
            Have questions, suggestions, or want to collaborate? We'd love to hear from you.
          </p>
          <form className="bg-white shadow-md rounded-2xl p-8 max-w-3xl mx-auto grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <textarea
              rows="5"
              placeholder="Your Message"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default Home;