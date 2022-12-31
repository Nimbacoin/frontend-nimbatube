import React, { useEffect, useState } from "react";
import VideoWatchLater from "../watch-later/VideoWatchLater";
import Style from "../../styles/pages/watch-later/watch-later.module.css";
import { useRouter } from "next/router";
import basedGetUrlRequestLogedIn from "../../utils/basedGetUrlRequestLogedIn";
import AllVideosBeforLoad from "../modals/pages-boforload/AllVideosBeforLoad";
import Vedio from "../video/Video";
import { useSelector } from "react-redux";
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
  const MenuBoolean = useSelector((state: any) => state.SideMenu.MenuBoolean);

  return (
    <div className={Style.container}>
      <div className={Style.container_desktop}>
        {videosData.length
          ? videosData.map((item: any, index) => (
              <VideoWatchLater key={index} VideoData={item} />
            ))
          : null}
      </div>
      <div className={Style.vedio_container}>
        {videosData.length ? (
          videosData.map((vid: any, index) => (
            <Vedio key={index} VideoData={vid} />
          ))
        ) : (
          <AllVideosBeforLoad />
        )}
      </div>
    </div>
  );
};

export default WatchHistoryPage;
