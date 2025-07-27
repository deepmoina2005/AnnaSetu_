/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products from API
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/product/all", {
        withCredentials: true,
      });
      setProducts(data.products || []);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);  // <-- Set loading to false after fetch completes
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center p-10">Loading products...</div>;

  if (products.length === 0)
    return <div className="text-center p-10">No products found.</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">All Products</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id || product.id}
            className="bg-white rounded-2xl shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <div
              className="w-full h-48 bg-cover bg-center rounded-xl mb-4"
              style={{ backgroundImage: `url(${product.image || "https://via.placeholder.com/400x300"})` }}
            />
            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-600 text-sm">{product.description}</p>
            <p className="mt-2 text-green-600 font-bold">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;