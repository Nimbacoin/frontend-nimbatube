import React, { useState, useEffect } from "react";
import Style from "../../styles/pages/favorites/favorites.module.css";
import basedGetUrlRequestLogedIn from "../../utils/basedGetUrlRequestLogedIn";
import VideoWatchLater from "../watch-later/VideoWatchLater";

const FavoritesPage = () => {
  const [videosData, setVideosData] = useState([]);
  useEffect(() => {
    const locaFetch = async () => {
      await basedGetUrlRequestLogedIn("/api/get/video/favorites-video/").then(
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

export default FavoritesPage;
