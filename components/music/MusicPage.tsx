import React, { useEffect, useState } from "react";
import Style from "../../styles/pages/featured/featured.module.css";
import allVideosFetch from "../../utils/allVideosFetch";
import LoaodingAll from "../modals/LoaodingAll";
import AllVideosBeforLoad from "../modals/pages-boforload/AllVideosBeforLoad";
import Vedio from "../video/Video";
import VideoWatchLater from "../watch-later/VideoWatchLater";

const FeaturedPage = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const locaFetch = async () => {
      const dataRes: any = await allVideosFetch();
      setVideos(dataRes.responseData);
    };
    locaFetch();
  }, []);
  return (
    <div className={Style.container}>
      <div className={Style.vedio_container}>
        {videos.length ? (
          videos.map((vid: any) => <Vedio VideoData={vid} />)
        ) : (
          <AllVideosBeforLoad />
        )}
      </div>
      <div></div>
      <LoaodingAll />
    </div>
  );
};

export default FeaturedPage;
