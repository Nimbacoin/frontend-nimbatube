import React from "react";
import VideoWatchLater from "./VideoWatchLater";
import Style from "../../styles/pages/watch-later/watch-later.module.css";

const WatchLater = () => {
  return (
    <div className={Style.container}>
      <VideoWatchLater />

      <VideoWatchLater />
      <VideoWatchLater />
      <VideoWatchLater />
      <VideoWatchLater />
      <VideoWatchLater />
    </div>
  );
};

export default WatchLater;
