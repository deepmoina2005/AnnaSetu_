/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import AddProductModal from '../../components/FarmerComponents/AddProductModal';

const FarmerProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    offerPrice: '',
    quantity: '',
    inStock: false,
    imageFile: null,
  });

  // ✅ Fetch products from API
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("https://anna-setu-5sz2.vercel.app/api/v1/product/all", {
        withCredentials: true,
      });
      setProducts(data.products || []);
    } catch (err) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Delete product from API
  const handleDelete = async (product) => {
    const confirmDelete = window.confirm(`Delete "${product.name}"?`);
    if (!confirmDelete) return;

    try {
      const { data } = await axios.delete(`https://anna-setu-5sz2.vercel.app/api/v1/product/delete/${product._id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      fetchProducts(); // Refresh product list
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // ✅ Filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div className="flex-1 py-10 px-4 md:px-10">
      {/* Header and Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
        <h2 className="text-lg font-semibold">All Products</h2>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm w-48"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-6xl w-full overflow-x-auto rounded-md bg-white border border-gray-300 shadow">
        <table className="w-full table-auto text-sm min-w-[800px]">
          <thead className="text-gray-900 bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Product</th>
              <th className="px-4 py-3 text-left font-semibold">Category</th>
              <th className="px-4 py-3 text-left font-semibold">Price</th>
              <th className="px-4 py-3 text-left font-semibold">Quantity</th>
              <th className="px-4 py-3 text-left font-semibold">In Stock</th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {filteredProducts.map((product, index) => (
              <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-cover border rounded"
                  />
                  <span className="truncate max-w-[200px]">{product.name}</span>
                </td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">₹{product.offerPrice}</td>
                <td className="px-4 py-3">{product.quantity}</td>
                <td className="px-4 py-3">
                  <input type="checkbox" checked={product.inStock} readOnly />
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(product)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal - only UI, not wired */}
      {showAddModal && (
        <AddProductModal
          product={newProduct}
          setProduct={setNewProduct}
          onClose={() => setShowAddModal(false)}
          onSubmit={() => {}} // not implemented as per your request
        />
      )}
    </div>
  );
};

export default FarmerProducts;
