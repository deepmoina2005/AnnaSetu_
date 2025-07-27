import React, { useRef, useState } from 'react';

const FarmerSubscriber = () => {
  const [subscribers] = useState([
    {
      id: 1,
      name: 'Amit Kumar',
      phone: '+91 9876543210',
      location: 'Patna, Bihar',
      date: '2024-12-10',
      type: 'Weekly',
      deliveryDays: ['Monday', 'Wednesday', 'Friday'],
    },
    {
      id: 2,
      name: 'Ravi Sharma',
      phone: '+91 9988776655',
      location: 'Lucknow, UP',
      date: '2025-01-20',
      type: 'Weekly',
      deliveryDays: ['Tuesday', 'Thursday'],
    },
    {
      id: 3,
      name: 'Pooja Verma',
      phone: '+91 9123456789',
      location: 'Jaipur, Rajasthan',
      date: '2025-07-01',
      type: 'Monthly',
      deliveryDates: [1, 15, 30],
    },
    {
      id: 4,
      name: 'Suresh Patel',
      phone: '+91 9012345678',
      location: 'Indore, MP',
      date: '2025-06-15',
      type: 'Monthly',
      deliveryDates: [5, 20],
    },
  ]);

  const [selectedSubscriber, setSelectedSubscriber] = useState(null);

  const Card = ({ subscriber }) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const divRef = useRef(null);

    const handleMouseMove = (e) => {
      const bounds = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    };

    return (
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="relative w-72 h-[300px] rounded-xl p-0.5 bg-white backdrop-blur-md text-gray-800 overflow-hidden shadow-md cursor-pointer"
      >
        {visible && (
          <div
            className="pointer-events-none blur-xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 size-56 absolute z-0 transition-opacity duration-300"
            style={{ top: position.y - 100, left: position.x - 100 }}
          />
        )}
        <div className="relative z-10 bg-white p-4 h-full w-full rounded-[10px] flex flex-col items-center text-center">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${subscriber.name}`}
            alt="Profile Avatar"
            className="w-16 h-16 rounded-full shadow-md mb-2"
          />
          <h2 className="text-lg font-bold text-gray-800">{subscriber.name}</h2>
          <p className="text-xs text-gray-500">{subscriber.phone}</p>
          <p className="text-xs text-gray-600">{subscriber.location}</p>
          <p className="text-xs text-gray-600">Subscribed: {subscriber.date}</p>
          <p className="text-xs mt-1 font-semibold text-indigo-600">{subscriber.type}</p>
          <p className="text-xs text-gray-700 mt-1">
            {subscriber.type === 'Weekly'
              ? `Days: ${subscriber.deliveryDays.join(', ')}`
              : `Dates: ${subscriber.deliveryDates.map(
                  (d) => `${d}${d === 1 ? 'st' : d === 2 ? 'nd' : d === 3 ? 'rd' : 'th'}`
                ).join(', ')}`}
          </p>
          <button
            onClick={() => setSelectedSubscriber(subscriber)}
            className="mt-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded"
          >
            View
          </button>
        </div>
      </div>
    );
  };

  const weekly = subscribers.filter((s) => s.type === 'Weekly');
  const monthly = subscribers.filter((s) => s.type === 'Monthly');

  return (
    <div className="px-4 md:px-10 py-6 space-y-10">
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Subscribers</h2>
        <div className="flex flex-wrap gap-6">
          {weekly.map((s) => (
            <Card key={s.id} subscriber={s} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Subscribers</h2>
        <div className="flex flex-wrap gap-6">
          {monthly.map((s) => (
            <Card key={s.id} subscriber={s} />
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedSubscriber && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md space-y-3 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800">Subscriber Profile</h2>
            <p><strong>Name:</strong> {selectedSubscriber.name}</p>
            <p><strong>Phone:</strong> {selectedSubscriber.phone}</p>
            <p><strong>Location:</strong> {selectedSubscriber.location}</p>
            <p><strong>Subscribed Date:</strong> {selectedSubscriber.date}</p>
            <p><strong>Type:</strong> {selectedSubscriber.type}</p>
            <p>
              <strong>Delivery Info:</strong>{' '}
              {selectedSubscriber.type === 'Weekly'
                ? selectedSubscriber.deliveryDays.join(', ')
                : selectedSubscriber.deliveryDates.map(
                    (d) => `${d}${d === 1 ? 'st' : d === 2 ? 'nd' : d === 3 ? 'rd' : 'th'}`
                  ).join(', ')}
            </p>
            <button
              onClick={() => setSelectedSubscriber(null)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerSubscriber;
