import React from "react";
import Style from "../../styles/pages/favorites/favorites.module.css";
import VideoWatchLater from "../watch-later/VideoWatchLater";

const NewsPoliticsPage = () => {
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

export default NewsPoliticsPage;