import React from "react";
import VideoWatchLater from "../watch-later/VideoWatchLater";
import Style from "../../styles/pages/favorites/favorites.module.css";
import { useRouter } from "next/router";

const WatchHistoryPage = ({ VideosData }: any) => {
  console.log("VideosData", VideosData);
  
  return (
    <div className={Style.container}>
      {VideosData.length
        ? VideosData.map((item: any) => <VideoWatchLater VideoData={item} />)
        : null}
      <VideoWatchLater />
    </div>
  );
};

export default WatchHistoryPage;
