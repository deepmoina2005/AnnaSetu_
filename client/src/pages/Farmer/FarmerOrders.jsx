import React, { useState } from 'react';

const FarmerOrders = () => {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [orders, setOrders] = useState([
    {
      id: 1,
      items: [
        {
          product: {
            name: 'Nike Air Max 270',
            image: 'https://images.unsplash.com/photo-1606813909185-439ec5fbcf43',
          },
          quantity: 1,
        },
      ],
      amount: 320.0,
      paymentType: 'Credit Card',
      orderDate: '10/10/2022',
      isPaid: true,
      status: 'Delivered',
      vendor: {
        name: 'John Doe',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        location: 'New York, USA',
        phone: '+1 555-1234',
        email: 'john.doe@example.com',
        storeName: 'John’s Store',
        address: '321 Market St, NY',
      },
      address: {
        firstName: 'Michael',
        lastName: 'Jordan',
        street: '123 Main St',
        city: 'Brooklyn',
        state: 'NY',
        zipcode: '10001',
        country: 'USA',
      },
    },
    {
      id: 2,
      items: [
        {
          product: {
            name: 'Apple MacBook Air M2',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
          },
          quantity: 1,
        },
      ],
      amount: 1199.99,
      paymentType: 'UPI',
      orderDate: '03/12/2023',
      isPaid: false,
      status: 'Processing',
      vendor: {
        name: 'Jane Smith',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        location: 'Los Angeles, USA',
        phone: '+1 555-5678',
        email: 'jane.smith@example.com',
        storeName: 'Jane’s Boutique',
        address: '789 Sunset Blvd, CA',
      },
      address: {
        firstName: 'Emma',
        lastName: 'Watson',
        street: '456 Elm St',
        city: 'LA',
        state: 'CA',
        zipcode: '90001',
        country: 'USA',
      },
    },
  ]);

  const statusOptions = ['Pending', 'Processing', 'Dispatched', 'Delivered', 'Cancelled'];

  const handleStatusChange = (index, newStatus) => {
    const updated = [...orders];
    updated[index].status = newStatus;
    setOrders(updated);
  };

  const closeModal = () => setSelectedVendor(null);

  return (
    <div className="md:p-10 p-4 space-y-4 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Orders Table</h2>
      <table className="min-w-[1000px] w-full border border-gray-200 rounded-md text-sm bg-white shadow-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-left">Vendor</th>
            <th className="px-4 py-3 text-left">Shipping Address</th>
            <th className="px-4 py-3 text-left">Payment Info</th>
            <th className="px-4 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id} className="border-t border-gray-200">
              {/* Product */}
              <td className="px-4 py-3">
                <div className="flex gap-3 items-center">
                  <img
                    src={order.items[0].product.image}
                    alt={order.items[0].product.name}
                    className="w-12 h-12 rounded object-cover border"
                  />
                  <div>
                    <p className="font-medium">{order.items[0].product.name}</p>
                    {order.items[0].quantity > 1 && (
                      <p className="text-xs text-indigo-500">x{order.items[0].quantity}</p>
                    )}
                  </div>
                </div>
              </td>

              {/* Vendor */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={order.vendor.image}
                    alt={order.vendor.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-medium">{order.vendor.name}</p>
                    <p className="text-xs text-gray-500">{order.vendor.location}</p>
                    <button
                      className="text-indigo-600 text-xs underline mt-1"
                      onClick={() => setSelectedVendor(order.vendor)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </td>

              {/* Address */}
              <td className="px-4 py-3">
                <p className="font-medium mb-1">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-gray-600 text-xs leading-tight">
                  {order.address.street}, {order.address.city}, {order.address.state},{' '}
                  {order.address.zipcode}
                </p>
              </td>

              {/* Payment */}
              <td className="px-4 py-3">
                <p className="font-semibold">${order.amount.toFixed(2)}</p>
                <p className="text-xs">Method: {order.paymentType}</p>
                <p
                  className={`text-xs font-medium ${
                    order.isPaid ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {order.isPaid ? 'Paid' : 'Pending'}
                </p>
                <p className="text-xs text-gray-500">{order.orderDate}</p>
              </td>

              {/* Status Dropdown */}
              <td className="px-4 py-3">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                  className="border px-3 py-2 rounded w-full text-sm"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Vendor Profile Modal */}
      {selectedVendor && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative">
            <button
              className="absolute top-3 right-4 text-xl text-gray-500 hover:text-red-600"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="flex flex-col items-center text-center space-y-3">
              <img
                src={selectedVendor.image}
                alt={selectedVendor.name}
                className="w-24 h-24 rounded-full object-cover border"
              />
              <h2 className="text-lg font-semibold">{selectedVendor.name}</h2>
              <p className="text-sm text-gray-500">{selectedVendor.storeName}</p>
              <div className="text-sm space-y-1 text-left w-full">
                <p><span className="font-medium">Location:</span> {selectedVendor.location}</p>
                <p><span className="font-medium">Email:</span> {selectedVendor.email}</p>
                <p><span className="font-medium">Phone:</span> {selectedVendor.phone}</p>
                <p><span className="font-medium">Address:</span> {selectedVendor.address}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerOrders;