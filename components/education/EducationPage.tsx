import React from "react";
import Style from "../../styles/pages/favorites/favorites.module.css";
import VideoWatchLater from "../watch-later/VideoWatchLater";

const EducationPage = () => {
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

export default EducationPage;
