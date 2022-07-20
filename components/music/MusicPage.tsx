import React from "react";
import Style from "../../styles/pages/favorites/favorites.module.css";
import VideoWatchLater from "../watch-later/VideoWatchLater";

const MusicPage = () => {
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

export default MusicPage;
