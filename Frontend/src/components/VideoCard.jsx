import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Volume2, VolumeOff, Heart, Bookmark } from 'lucide-react';
import axios from "../axios/config";
//todo: make an video component fro profile and saved page so if we click on the component it open an particular video
function VideoCard({ video }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [likes, setLikes] = useState(video.likeCount || 0);  
  const [saves, setSaves] = useState(video.saveCount || 0);  
  const [liked, setLiked] = useState(video.isLiked || false);
  const [saved, setSaved] = useState(video.isSaved || false);

  const navigate = useNavigate();

  // Auto play when video enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play();
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.75 } // play only when 75% in view
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleLike = async () => {
    try {
      const res = await axios.post(`/food/like`,{ foodId: video._id });
      console.log(res.data);
      
      setLiked(!liked);
      setLikes((prev) => (liked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error("Error liking video:", err);
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(`/food/save`,{ foodId: video._id });
      console.log(res.data);

      setSaved(!saved);
      setSaves((prev) => (saved ? prev - 1 : prev + 1));
    } catch (err) {
      console.error("Error saving video:", err);
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black">
      {/* Video */}
      <video
        ref={videoRef}
        src={video.video}
        className="w-full h-full object-cover"
        muted={isMuted}
        loop
        playsInline
        onClick={toggleMute}
      />

      {/* Overlay Info */}
      <div className="absolute bottom-17 left-1.5 md:left-2 lg:left-3 text-white p-2 bg-black/40 rounded-lg w-[96%] md:w-[98%] lg:w-[98.5%] flex items-center justify-between px-10">
      <div>
        <h2 className="text-lg font-bold">{video.name}</h2>
        <p className="text-sm opacity-80">{video.description}</p>
      </div>
        <button
          onClick={() => navigate(`/food-partner/${video.foodPartner}`)}
          className="mt-2 px-3 py-1 bg-blue-600 rounded-md text-sm hover:bg-blue-700"
        >
          Show Details
        </button>
      </div>

      {/* Right side buttons */}
      <div className="absolute right-4 bottom-37 flex flex-col items-center gap-4">
        {/* Like button */}
        <button
          onClick={handleLike}
          className="flex flex-col items-center text-white hover:scale-110 transition"
        >
          <Heart
            size={32}
            className={`${
              liked ? "text-red-500" : "text-white"
            }`}
          />
          <span className="text-sm">{likes}</span>
        </button>
        {/* Save button */}
        <button
          onClick={handleSave}
          className="flex flex-col items-center text-white hover:scale-110 transition"
        >
          <Bookmark
            size={32}
            className={`${
              saved ? "text-blue-500" : "text-white"
            }`}
          />
          <span className="text-sm">{saves}</span>
        </button>
      </div>
      
      {/* Sound Indicator */}
      <div className="absolute top-4 right-4 text-xs px-2 py-1 rounded-md">
        {isMuted ? <VolumeOff color="white"/> : <></>}
      </div>
    </div>
  );
}

export default VideoCard;
