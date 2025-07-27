// FRONTEND: AddProductModal.jsx
import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddProductModal = ({ product, setProduct, onClose, fetchProducts }) => {
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setProduct((prev) => ({
          ...prev,
          image: [imageUrl],
          imageFile: file
        }));
      }
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("offerPrice", product.offerPrice);
      formData.append("quantity", product.quantity);
      formData.append("inStock", product.inStock);
      formData.append("image", product.imageFile);

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/product/add",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data.message || "Product added successfully");
      onClose();
      if (fetchProducts) fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
        <button
          className="absolute top-3 right-4 text-gray-500 text-xl hover:text-red-600"
          onClick={onClose}
        >
          &times;
        </button>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-5"
        >
          <div>
            <p className="text-base font-medium mb-1">Product Image</p>
            <div className="flex items-center gap-4">
              <input
                accept="image/*"
                type="file"
                name="image"
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
              {product.image?.[0] && (
                <img
                  src={product.image[0]}
                  alt="preview"
                  className="w-16 h-16 object-cover rounded border"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="name">Product Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={product.name}
              onChange={handleChange}
              placeholder="Type here"
              className="outline-none py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="description">Product Description</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={product.description || ''}
              onChange={handleChange}
              className="outline-none py-2 px-3 rounded border border-gray-500/40 resize-none"
              placeholder="Type here"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="outline-none py-2 px-3 rounded border border-gray-500/40"
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Shoes">Shoes</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-5">
            <div className="flex-1 flex flex-col gap-1 min-w-[120px]">
              <label className="text-base font-medium" htmlFor="price">Product Price</label>
              <input
                id="price"
                name="price"
                type="number"
                value={product.price || ''}
                onChange={handleChange}
                placeholder="0"
                className="outline-none py-2 px-3 rounded border border-gray-500/40"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1 min-w-[120px]">
              <label className="text-base font-medium" htmlFor="offerPrice">Offer Price</label>
              <input
                id="offerPrice"
                name="offerPrice"
                type="number"
                value={product.offerPrice || ''}
                onChange={handleChange}
                placeholder="0"
                className="outline-none py-2 px-3 rounded border border-gray-500/40"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1 min-w-[120px]">
              <label className="text-base font-medium" htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                value={product.quantity || ''}
                onChange={handleChange}
                placeholder="0"
                className="outline-none py-2 px-3 rounded border border-gray-500/40"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="inStock"
              name="inStock"
              checked={product.inStock}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label htmlFor="inStock" className="text-base font-medium">In Stock</label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded hover:bg-indigo-600"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;