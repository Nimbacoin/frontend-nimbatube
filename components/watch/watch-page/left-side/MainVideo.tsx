import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import Style from "../../../../styles/pages/watch/leftside/leftside.module.css";

const MainVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className={Style.video_container}>
      <ReactPlayer playing={true} url="https://youtu.be/yI12AC94ado" controls />
    </div>
  );
};

export default MainVideo;
