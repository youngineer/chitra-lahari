import React from "react";
import { useSearchParams } from "react-router-dom";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  // console.log(searchParams.get("v"));
  const videoId = searchParams.get("v");


  return (
    <div>
      <iframe
        width="866"
        height="487"
        src={"https://www.youtube.com/embed/" + videoId}
        title="Youtube Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
  
};

export default WatchPage;
