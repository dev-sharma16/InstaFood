import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Volume2, VolumeOff } from 'lucide-react';

function VideoCard({ video }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
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
      <div className="absolute bottom-16 left-2 text-white p-2 bg-black/40 rounded-lg w-[96%] md:w-[98%] lg:w-[98.5%] flex items-center justify-between px-10">
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

      {/* Sound Indicator */}
      <div className="absolute top-4 right-4 bg-black/40 text-xs px-2 py-1 rounded-md">
        {isMuted ? <VolumeOff color="white" /> : <Volume2 color="white" />}
      </div>
    </div>
  );
}

export default VideoCard;
