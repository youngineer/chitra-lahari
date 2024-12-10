import React, { useEffect, useState } from 'react';
import { YOUTUBE_CHANNEL_API } from '../utils/Constants';

const VideoCard = ({ info }) => {
  const [channelInfo, setChannelInfo] = useState(null);
  const snippet = info.snippet || {};
  const statistics = info.statistics || {};
  const thumbnails = snippet.thumbnails?.maxres || {};

  const imgUrl = thumbnails.url || "default-thumbnail.png";
  const title = snippet.title || "Untitled Video";
  const channelName = snippet.channelTitle || "Unknown Channel";
  const totalViews = statistics.viewCount || "0";
  const channelId = snippet.channelId;

  const channelDetailsUrl =
    `${YOUTUBE_CHANNEL_API}${channelId}&fields=items(snippet)&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

  useEffect(() => {
    const fetchChannelDetails = async () => {
      try {
        const data = await fetch(channelDetailsUrl);
        const json = await data.json();
        if (json.items && json.items.length > 0) {
          setChannelInfo(json.items[0].snippet);
        }
      } catch (error) {
        console.error("Error fetching channel details:", error);
      }
    };

    fetchChannelDetails();
  }, []);

  const channelPhoto = channelInfo?.thumbnails?.high?.url;


  const getViews = (v) => {
    if (!v) return "No views"; 
    if (v.length < 4) return v; 
    if (v.length < 7) return v.slice(0, v.length - 3) + "K";
    if (v.length < 10) return v.slice(0, v.length - 6) + "M"; 
    return v.slice(0, v.length - 9) + "B"; 
  };

  return (
    <div className="w-80 mt-4">
      <img 
        alt="video thumbnail" 
        className="w-full h-48 rounded-lg mb-2" 
        src={imgUrl} 
      />

      <div className="flex space-x-3">
        <img
          alt="channel-photo"
          src={channelPhoto}
          className="w-9 h-9 rounded-full"
        />
        
        <div className="flex-1 overflow-hidden">
          <h4 className="text-base font-medium line-clamp-2 leading-tight">
            {title}
          </h4>
          <div className="text-sm text-gray-600">
            <h6>{channelName}</h6>
            <h6>{getViews(totalViews)} Views</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;