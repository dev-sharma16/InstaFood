import axios from '../axios/config';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function FoodPartnerProfile() {
  const [foodPartner, setFoodPartner] = useState({});
  const [foodItems, setFoodItems] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchFoodPartnerDetails = async () => {
      try {
        const res = await axios.get(`/food-partner/${id}`);
        if (!res) throw new Error("Error fetching Food Partner Details");

        const foodPartner = res.data.foodPartner;
        const foodItems = res.data.foodItems;

        setFoodPartner(foodPartner);
        setFoodItems(foodItems);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFoodPartnerDetails();
  }, [id]);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg overflow-hidden">
      
      {/* Header Section */}
      <div className="p-4 flex items-center gap-4 bg-gradient-to-b from-gray-800/70 to-gray-900/90 dark:from-gray-900 dark:to-black rounded-b-2xl shadow-lg">
        {/* Dummy Profile Pic */}
        <div className="w-20 h-20 rounded-full bg-green-700 flex items-center justify-center text-white text-2xl font-bold shrink-0">
          {foodPartner?.name?.charAt(0)?.toUpperCase() || "?"}
        </div>

        {/* Partner Info */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">{foodPartner?.name}</h2>
          <p className="text-sm text-gray-400">{foodPartner?.address}</p>
          <p className="text-sm text-gray-400">{foodPartner?.phone}</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex justify-around p-4 border-b border-gray-300 dark:border-gray-700">
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold">{foodItems.length}</span>
          <span className="text-xs text-gray-500">Meals</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold">15K</span>
          <span className="text-xs text-gray-500">Customers</span>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="p-4 grid grid-cols-3 gap-2">
        {foodItems.length > 0 ? (
          foodItems.map((item) => (
            <div key={item._id} className="aspect-[9/16] rounded-md overflow-hidden">
              <video
                src={item.video}
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500 text-sm">
            No posts available
          </p>
        )}
      </div>
    </div>
  );
}

export default FoodPartnerProfile;
