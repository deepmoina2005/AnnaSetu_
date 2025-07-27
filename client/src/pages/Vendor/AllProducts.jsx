/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/product/all", {
        withCredentials: true,
      });
      setProducts(data.products || []);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center p-10">Loading products...</div>;
  if (products.length === 0) return <div className="text-center p-10">No products found.</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">All Products</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const productImage =
            product.image || "https://dummyimage.com/400x300/ccc/000&text=No+Image";
          const farmerImage =
            product.farmer?.photo || "https://dummyimage.com/40x40/ccc/000&text=F";
          const farmerName = product.farmer?.name || "Unknown Farmer";

          return (
            <Link
              to={`/vendor/product/${product._id}`}
              key={product._id}
              className="bg-white rounded-2xl shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              {/* Product Image */}
              <div
                className="w-full h-48 bg-cover bg-center rounded-xl mb-4"
                style={{ backgroundImage: `url(${productImage})` }}
              />

              {/* Product Info */}
              <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 text-sm truncate">{product.description}</p>
              <p className="mt-2 text-green-600 font-bold">₹{product.price}</p>

              {/* Farmer Info */}
              {product.farmer && (
                <div className="mt-4 flex items-center gap-2">
                  <img
                    src={farmerImage}
                    alt={farmerName}
                    className="w-8 h-8 rounded-full object-cover border"
                  />
                  <span className="text-sm text-gray-700 font-medium truncate">
                    {farmerName}
                  </span>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
