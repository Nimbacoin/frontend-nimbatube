import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";

const MainVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  
  return (
    <ReactPlayer
      playing={true}
      url="https://www.w3schools.com/tags/movie.mp4"
      controls
    />
  );
};

export default MainVideo;
