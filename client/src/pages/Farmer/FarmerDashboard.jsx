import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Package, Truck, Users } from 'lucide-react';

const FarmerDashboard = () => {
  const stats = [
    { title: 'Total Products', count: 28, icon: <Package className="text-blue-600" /> },
    { title: 'Total Deliveries', count: 102, icon: <Truck className="text-green-600" /> },
    { title: 'Total Subscribers', count: 64, icon: <Users className="text-purple-600" /> },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 1200 },
    { month: 'Feb', revenue: 1800 },
    { month: 'Mar', revenue: 2200 },
    { month: 'Apr', revenue: 1600 },
    { month: 'May', revenue: 2100 },
    { month: 'Jun', revenue: 2500 },
    { month: 'Jul', revenue: 1900 },
  ];

  return (
    <div className="px-6 md:px-10 py-8 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Farmer Dashboard</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white p-5 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="bg-gray-100 p-3 rounded-full">{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-xl font-semibold text-gray-900">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FarmerDashboard;
