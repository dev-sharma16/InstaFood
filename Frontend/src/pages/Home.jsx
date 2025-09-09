import React, { useEffect, useState } from "react";
import axios from "../axios/config";
import VideoCard from "../components/VideoCard";

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("/food");
        if (!res) throw new Error("Error in loading post");

        setVideos(res.data.foodItems);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll scrollbar-none">
      {videos.map((video) => (
        <div key={video._id} className="snap-start">
          <VideoCard video={video} />
        </div>
      ))}
    </div>
  );
}

export default Home;
