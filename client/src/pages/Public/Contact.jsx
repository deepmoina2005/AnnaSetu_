// src/components/ContactUs.jsx
import React from 'react';

const Contact = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 via-lime-100 to-yellow-50 h-screen flex items-center">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-green-700 mb-4">Contact Us</h2>
        <p className="text-gray-700 text-lg mb-10">
          Have questions, suggestions, or want to collaborate? We'd love to hear from you.
        </p>

        <form className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl mx-auto grid gap-6">
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
  );
};

export default Contact;