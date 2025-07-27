import React, { useEffect, useState } from "react";
import axios from "axios";

const FarmersList = () => {
  const [farmers, setFarmers] = useState([]);
  const [popularFarmer, setPopularFarmer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/profile/all-farmer", {
          withCredentials: true,
        });
        if (res.data.success) {
          setFarmers(res.data.farmers);

          // For example, pick the highest rated farmer as popular
          const popular = res.data.farmers.reduce((prev, curr) =>
            curr.rating > (prev?.rating || 0) ? curr : prev,
            null
          );
          setPopularFarmer(popular);
        }
      } catch (err) {
        console.error("Failed to fetch farmers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  if (loading) return <div className="text-center p-10">Loading farmers...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Meet Our Farmers
      </h1>

      {/* Most Popular Farmer */}
      {popularFarmer && (
        <div className="mb-10 bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🌟 Most Popular Farmer</h2>
          <div className="flex items-center gap-4">
            <img
              src={popularFarmer.avatar || "https://source.unsplash.com/100x100/?farmer"}
              alt={popularFarmer.name}
              className="w-20 h-20 object-cover rounded-full border-2 border-green-600"
            />
            <div>
              <h3 className="text-lg font-bold">{popularFarmer.name}</h3>
              <p className="text-gray-600">{popularFarmer.location || popularFarmer.district || "-"}</p>
              <p className="text-sm text-yellow-600">⭐ {popularFarmer.rating || "N/A"} rating</p>
              <p className="text-sm text-gray-700 italic">{popularFarmer.category || "-"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Other Farmers List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {farmers.map((farmer) => (
          <div
            key={farmer._id}
            className="bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={farmer.avatar || "https://source.unsplash.com/100x100/?farmer"}
                alt={farmer.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{farmer.name}</h3>
                <p className="text-sm text-gray-600">{farmer.location || farmer.district || "-"}</p>
                <p className="text-xs text-yellow-600">⭐ {farmer.rating || "N/A"} rating</p>
                <p className="text-xs text-gray-700">{farmer.category || "-"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmersList;