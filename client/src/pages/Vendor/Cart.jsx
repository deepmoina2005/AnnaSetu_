import React from 'react';

const cartItems = [
  {
    id: 1,
    name: 'Organic Tomatoes',
    description: 'Freshly harvested organic tomatoes.',
    price: 50,
    quantity: 2,
    image: 'https://source.unsplash.com/100x100/?tomatoes',
  },
  {
    id: 2,
    name: 'Farm Fresh Eggs',
    description: 'Free-range eggs from local farms.',
    price: 6,
    quantity: 12,
    image: 'https://source.unsplash.com/100x100/?eggs',
  },
  {
    id: 3,
    name: 'Pure Cow Milk',
    description: 'Fresh cow milk delivered daily.',
    price: 60,
    quantity: 1,
    image: 'https://source.unsplash.com/100x100/?milk',
  },
];

const getTotal = () => {
  return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const Cart = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Product List */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row border-b pb-4 gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-gray-700">Qty:</span>
                    <div className="flex items-center border rounded">
                      <button className="px-2 py-1 text-gray-600 hover:bg-gray-100">-</button>
                      <span className="px-3">{item.quantity}</span>
                      <button className="px-2 py-1 text-gray-600 hover:bg-gray-100">+</button>
                    </div>
                    <button className="text-red-500 text-sm hover:underline ml-4">
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right sm:text-left sm:w-28 font-bold text-green-600">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Summary */}
          <div className="bg-white rounded-lg shadow-md p-4 h-fit">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="flex justify-between text-gray-700 text-sm mb-2">
              <span>Items ({cartItems.length})</span>
              <span>₹{getTotal()}</span>
            </div>
            <hr className="mb-4" />
            <div className="text-lg font-bold text-gray-800 flex justify-between">
              <span>Subtotal</span>
              <span>₹{getTotal()}</span>
            </div>
            <button className="w-full mt-6 bg-yellow-500 text-black font-semibold py-2 rounded hover:bg-yellow-400 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;