/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Star, StarOff } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
      if (data.success) {
        setProduct(data.product);
      } else {
        toast.error("Product not found");
      }
    } catch (error) {
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!product) return <div className="text-center py-10">Product not found.</div>;

  const descriptionList =
    typeof product.description === "string"
      ? product.description.split(",")
      : product.description || [];

  const imageUrl = product.image || product.images?.[0] || "https://dummyimage.com/400x300/cccccc/000000&text=No+Image";

  return (
    <div className="max-w-5xl mx-auto w-full px-6 py-8">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-2">
        Home / Products / <span className="text-indigo-500">{product.name}</span>
      </p>

      {/* Product Details */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-10">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={imageUrl}
            alt={product.name}
            onError={(e) =>
              (e.target.src = "https://dummyimage.com/400x300/cccccc/000000&text=No+Image")
            }
            className="w-full h-96 object-cover border rounded-xl"
          />
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 space-y-4 text-sm text-gray-700">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array(5)
              .fill("")
              .map((_, i) =>
                product.rating > i ? (
                  <Star key={i} size={16} className="text-indigo-500 fill-indigo-500" />
                ) : (
                  <StarOff key={i} size={16} className="text-indigo-300" />
                )
              )}
            <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
          </div>

          {/* Category */}
          <div>
            <span className="font-semibold">Category:</span> {product.category}
          </div>

          {/* Price */}
          <div>
            <p className="line-through text-gray-400">MRP: ₹{product.price}</p>
            <p className="text-xl font-semibold text-green-700">Offer Price: ₹{product.offerPrice}</p>
          </div>

          {/* Quantity */}
          <div>
            <span className="font-semibold">Available Quantity:</span> {product.quantity}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            <span className="font-semibold">In Stock:</span>
            <input type="checkbox" checked={product.inStock} readOnly className="cursor-not-allowed" />
          </div>

          {/* Description */}
          <div>
            <p className="font-semibold">About Product:</p>
            <ul className="list-disc ml-5 mt-1 text-gray-600">
              {descriptionList.map((desc, index) => (
                <li key={index}>{desc.trim()}</li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded font-medium">
              Add to Cart
            </button>
            <button className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded font-medium">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;