import React, { useEffect, useState } from "react";
import VideoWatchLater from "./VideoWatchLater";
import Style from "../../styles/pages/watch-later/watch-later.module.css";
import basedGetUrlRequestLogedIn from "../../utils/basedGetUrlRequestLogedIn";
import AllVideosBeforLoad from "../modals/pages-boforload/AllVideosBeforLoad";
import Vedio from "../video/Video";

const WatchLater = () => {
  const [videosData, setVideosData] = useState([]);
  useEffect(() => {
    const locaFetch = async () => {
      await basedGetUrlRequestLogedIn("/api/get/video/watch-later-video/").then(
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
      <div className={Style.container_desktop}>
        {videosData.length
          ? videosData.map((item: any) => <VideoWatchLater VideoData={item} />)
          : null}
      </div>
      <div className={Style.vedio_container}>
        {videosData.length ? (
          videosData.map((vid: any) => <Vedio VideoData={vid} />)
        ) : (
          <AllVideosBeforLoad />
        )}
      </div>
    </div>
  );
};

export default WatchLater;
