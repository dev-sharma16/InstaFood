import React, { useEffect, useState } from "react";
import axios from "../axios/config";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";

function SavedVideoDetail() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);   // null = not loaded yet
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`/food/${id}`);
        if (res.data && res.data.success) {
          setVideo(res.data.foodItem);
        } else {
          setError("Video not found");
        }
      } catch (err) {
        console.error("Error fetching video:", err);
        setError("Something went wrong while fetching the video");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) {
    return <div className="text-center p-10">Loading video...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  if (!video) {
    return <div className="text-center p-10">No video found</div>;
  }

  return (
    <div>
      <VideoCard video={video} />
    </div>
  );
}

export default SavedVideoDetail;
