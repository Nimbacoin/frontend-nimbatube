import React, { useEffect, useState } from "react";
import VideoWatchLater from "../watch-later/VideoWatchLater";
import Style from "../../styles/pages/favorites/favorites.module.css";
import { useRouter } from "next/router";
import basedGetUrlRequestLogedIn from "../../utils/basedGetUrlRequestLogedIn";

const WatchHistoryPage = ({}: any) => {
  const [videosData, setVideosData] = useState([]);
  useEffect(() => {
    const locaFetch = async () => {
      await basedGetUrlRequestLogedIn("/api/get/video/history-video/").then(
        (res) => {
          if (res?.responseData) {
            setVideosData(res.responseData);
          }
        }
      );
    };
    locaFetch();
  }, []);

  return (
    <div className={Style.container}>
      {videosData.length
        ? videosData.map((item: any) => <VideoWatchLater VideoData={item} />)
        : null}
    </div>
  );
};

export default WatchHistoryPage;
