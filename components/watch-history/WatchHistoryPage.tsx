import React from "react";
import VideoWatchLater from "../watch-later/VideoWatchLater";
import Style from "../../styles/pages/favorites/favorites.module.css";

const WatchHistoryPage = () => {
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

export default WatchHistoryPage;
