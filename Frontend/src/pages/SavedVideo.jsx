import React, { useEffect, useState } from 'react'
import axios from '../axios/config'

function SavedVideo() {
  const [savedVideos, setSavedVideos] = useState([])

  useEffect(() => {
    const fetchSavedVideos = async () => {
      try {
        const res = await axios.get(`/food/save`)
        // console.log(res.data.videos)
        setSavedVideos(res.data.videos)
      } catch (error) {
        console.error('Error in loading saved videos: ', error)
      }
    }
    fetchSavedVideos()
  }, [])

  return (
    <div className="p-4 dark:bg-gray-900 h-screen overflow-y-scroll">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 px-1">
        Saved Videos
      </h1>

      {/* Grid layout */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6  gap-2">
        {savedVideos.length > 0 ? (
          savedVideos.map((item) => (
            <div
              key={item._id}
              className="relative w-full aspect-[9/16] bg-black overflow-hidden rounded-md"
            >
              <video
                src={item.food.video}
                muted
                className="w-full h-full object-cover"
              />
              {/* Overlay (name) */}
              <div className="absolute bottom-1 left-1 text-xs text-white bg-black/50 px-1 rounded">
                {item.food.name}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 col-span-full text-center">
            No saved videos yet.
          </p>
        )}
      </div>
    </div>
  )
}

export default SavedVideo
