import React from 'react';

const suppliers = [
  {
    name: 'Fresh Farm Co.',
    material: 'Organic Vegetables',
    img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=600',
  },
  {
    name: 'Spice Hub',
    material: 'Indian Spices',
    img: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=600',
  },
  {
    name: 'ChakkiWale',
    material: 'Whole Wheat Flour',
    img: 'https://images.unsplash.com/photo-1585937421614-6564f5f90b6e?q=80&w=600',
  },
];

const VendorHomeSupplierSection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">Top Raw Material Suppliers</h2>
        <p className="mt-2 text-gray-600 text-sm md:text-base">
          Trusted partners supplying fresh and high-quality materials to street food vendors across India.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {suppliers.map((supplier, index) => (
            <div
              key={index}
              className="bg-gray-50 p-5 rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={supplier.img}
                alt={supplier.name}
                className="h-40 w-full object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{supplier.name}</h3>
              <p className="text-sm text-gray-600">{supplier.material}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VendorHomeSupplierSection;
