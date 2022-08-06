import React from "react";
import Style from "../../styles/pages/featured/featured.module.css";
import Vedio from "../video/Video";
import VideoWatchLater from "../watch-later/VideoWatchLater";

const FeaturedPage = () => {
  return (
    <div className={Style.container}>
      <div className={Style.vedio_container}>
        <Vedio />
        <Vedio />
        <Vedio />
        <Vedio />
        <Vedio />
        <Vedio />
        <Vedio />
        <Vedio />
        <Vedio />
        <Vedio />
        <Vedio />
        <Vedio />
        <Vedio />
      </div>
    </div>
  );
};

export default FeaturedPage;
