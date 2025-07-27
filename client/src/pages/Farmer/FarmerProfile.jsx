/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { Country, State, City } from "country-state-city";
import { Context } from "../../main";
import axios from "axios";

const deliveryDurationOptions = ["1 Day", "2–3 Days", "4–7 Days"];

const FarmerProfile = () => {
  const { isAuthorized, setIsAuthorized, setUser, user } = useContext(Context);

  const [farmer, setFarmer] = useState({
    name: "",
    shopName: "",
    phone: "",
    email: "",
    country: "",
    state: "",
    district: "",
    location: "",
    deliveryTime: "",
    deliveryDuration: "",
    deliveryAreas: "",
    description: "",
    avatar: "",
    imageFile: null,
  });

  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/getuser", {
          withCredentials: true,
        });
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.email) return;
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/profile/get-profile?email=${user.email}`,
          { withCredentials: true }
        );
        if (res.data.farmer) {
          setFarmer((prev) => ({
            ...prev,
            ...res.data.farmer,
            name: user.name,
            email: user.email,
            imageFile: null,
          }));
        }
      } catch (error) {
        if (error.response?.status === 404) {
          toast("No profile found. Please complete your profile.");
          setFarmer((prev) => ({
            ...prev,
            name: user?.name,
            email: user?.email,
          }));
        } else {
          toast.error("Failed to load profile.");
        }
      }
    };
    fetchProfile();
  }, [user?.email]);

  useEffect(() => {
    if (!farmer.imageFile && farmer.name && !farmer.avatar) {
      const seed = encodeURIComponent(farmer.name);
      setFarmer((prev) => ({
        ...prev,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${seed}`,
      }));
    }
  }, [farmer.name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarmer((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "country" ? { state: "", district: "" } : {}),
      ...(name === "state" ? { district: "" } : {}),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFarmer((prev) => ({
        ...prev,
        imageFile: file,
        avatar: URL.createObjectURL(file),
      }));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", farmer.name);
      formData.append("email", farmer.email);
      Object.entries(farmer).forEach(([key, value]) => {
        if (!["imageFile", "name", "email"].includes(key) && value) {
          formData.append(key, value);
        }
      });
      if (farmer.imageFile) {
        formData.append("avatar", farmer.imageFile);
      }

      const res = await fetch("http://localhost:4000/api/v1/profile/farmer-profile", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Profile saved successfully!");
        setShowDialog(false);
      } else {
        toast.error(data.message || "Failed to save profile.");
      }
    } catch (error) {
      console.error("Save Error:", error);
      toast.error("Server error while saving profile.");
    }
  };

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center gap-6 mb-6">
          <img
            src={farmer.avatar || "/default-avatar.png"}
            alt="Avatar"
            className="w-24 h-24 rounded-full border shadow-sm object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{farmer.name || "Unnamed Farmer"}</h2>
            <p className="text-sm text-gray-600">{farmer.location || "-"}</p>
            <p className="text-sm text-gray-500">{farmer.email || "-"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <p><strong>Shop Name:</strong> {farmer.shopName || "-"}</p>
          <p><strong>Phone:</strong> {farmer.phone || "-"}</p>
          <p><strong>Country:</strong> {farmer.country || "-"}</p>
          <p><strong>State:</strong> {farmer.state || "-"}</p>
          <p><strong>District:</strong> {farmer.district || "-"}</p>
          <p><strong>Delivery Time:</strong> {farmer.deliveryTime || "-"}</p>
          <p><strong>Delivery Duration:</strong> {farmer.deliveryDuration || "-"}</p>
          <p><strong>Delivery Areas:</strong> {farmer.deliveryAreas || "-"}</p>
          <div className="md:col-span-2">
            <p><strong>About:</strong></p>
            <p className="mt-1">{farmer.description || "-"}</p>
          </div>
        </div>

        <button
          className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={() => setShowDialog(true)}
        >
          Edit Profile
        </button>
      </div>

      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-4xl mx-2 bg-white rounded-lg shadow-2xl max-h-[80vh] overflow-y-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="p-4 md:p-6"
            >
              <h2 className="text-2xl font-semibold text-center mb-6">
                Edit Farmer Profile
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="col-span-full">
                  <label className="block font-medium mb-1">Upload Avatar</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border rounded p-2"
                  />
                </div>

                {["name", "shopName", "phone", "email", "location", "deliveryAreas"].map((key) => (
                  <div key={key}>
                    <label className="block font-medium mb-1 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
                    <input
                      type="text"
                      name={key}
                      value={farmer[key]}
                      onChange={handleChange}
                      className="w-full border rounded p-2"
                      disabled={key === "name" || key === "email"}
                    />
                  </div>
                ))}

                <div>
                  <label className="block font-medium mb-1">Country</label>
                  <select name="country" value={farmer.country} onChange={handleChange} className="w-full border rounded p-2">
                    <option value="">Select Country</option>
                    {Country.getAllCountries().map((c) => (
                      <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1">State</label>
                  <select name="state" value={farmer.state} onChange={handleChange} className="w-full border rounded p-2" disabled={!farmer.country}>
                    <option value="">Select State</option>
                    {State.getStatesOfCountry(farmer.country).map((s) => (
                      <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1">District</label>
                  <select name="district" value={farmer.district} onChange={handleChange} className="w-full border rounded p-2" disabled={!farmer.state}>
                    <option value="">Select District</option>
                    {City.getCitiesOfState(farmer.country, farmer.state).map((c) => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1">Delivery Time</label>
                  <input type="time" name="deliveryTime" value={farmer.deliveryTime} onChange={handleChange} className="w-full border rounded p-2" />
                </div>

                <div>
                  <label className="block font-medium mb-1">Delivery Duration</label>
                  <select name="deliveryDuration" value={farmer.deliveryDuration} onChange={handleChange} className="w-full border rounded p-2">
                    <option value="">Select Duration</option>
                    {deliveryDurationOptions.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-full">
                  <label className="block font-medium mb-1">Description</label>
                  <textarea name="description" value={farmer.description} onChange={handleChange} rows={3} className="w-full border rounded p-2" />
                </div>

                <div className="col-span-full flex justify-end gap-4 mt-4">
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg">Save</button>
                  <button type="button" onClick={() => setShowDialog(false)} className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerProfile;
