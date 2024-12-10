import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import { YOUTUBE_VIDEOS_API } from '../utils/Constants';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const isMenuOpen = useSelector((store) => store.appSlice.isMenuOpen); 
  useEffect(() => {
    getVideo();
  }, []);

  const getVideo = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const json = await data.json();
    setVideos(json.items);
  };

  return (
    <div className="flex">
      <div className="flex-1 flex flex-wrap p-4 m-2">
        {videos.map((video) => (
          <Link 
            to={"/watch?v=" + video.id} 
            key={video.id} 
            className={`block ${isMenuOpen ? 'w-1/3' : 'w-1/4'}`}
          >
            <div className="p-2 cursor-pointer"> 
              <VideoCard info={video} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VideoContainer;
