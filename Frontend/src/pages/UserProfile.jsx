import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../store/authSlice"
import axios from "../axios/config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import SavedVideo from "./SavedVideo";

function UserProfile() {
  const [videos, setVideos] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async() => {
    try {
      await axios.post('/auth/user/logout');
      dispatch(userLogout());
      navigate("/user/login");
    } catch (error) {
      console.log(error);
    }
  };
  //todo check why not saved section is not working for food partner 
  useEffect(()=>{
    const fetchVideos = async()=>{
      if(user.role === "foodPartner"){
        try {
          const res = await axios.get(`/food-partner/${user._id}`)
          // console.log(res.data); 
          setVideos(res.data.foodItems);
          // console.log(videos);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchVideos();
  },[]);

  const handleClick = (videoId)=>{
    navigate(`/saved/${videoId}`)
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        No user data available
      </div>
    );
  }

  return (
    <div className="min-h-screen flex-col items-center justify-start px-4 py-6 dark:bg-gray-900 overflow-y-scroll ">
      {/* profile section */}
      <div className="w-full max-w-md rounded-2xl shadow-lg p-5 backdrop-blur-md bg-white/60 dark:bg-black/40 dark:text-white">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-green-700 flex items-center justify-center text-white text-2xl font-bold">
            {user.fullName?.charAt(0).toUpperCase()}
          </div>
          <h2 className="mt-3 text-lg font-semibold">{user.fullName}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            @{user.username}
          </p>
        </div>

        {/* User Info */}
        <div className="mt-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium">Phone:</span>
            <span>{user.phone}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium">Address:</span>
            <span>{user.address}</span>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
          {user.role === "foodPartner" ? 
            <button
            onClick={()=>{navigate("/food-partner/addFood")}}
            className="w-full py-2 px-4 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
            >
            Add Food
            </button>
            : <></>
          }
        </div>
      </div>
      {/* //todo render this section only for food partner */}
      {/* video section */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 mt-4">
        {videos?.length > 0 ? (
          videos?.map((item) => (
            <div
              key={item._id}
              className="relative w-full aspect-[9/16] bg-black overflow-hidden rounded-md"
              onClick={()=>{handleClick(item._id)}}
            >
              <video
                src={item.video}
                muted
                className="w-full h-full object-cover"
              />
              {/* Overlay (name) */}
              <div className="absolute bottom-1 left-1 text-xs text-white bg-black/50 px-1 rounded">
                {item.name}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 col-span-full text-center">
            No videos yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
