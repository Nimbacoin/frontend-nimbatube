import React, { useEffect, useState } from "react";
import Style from "../../../styles/pages/watch/rightside/rightside.module.css";
import allVideosFetch from "../../../utils/allVideosFetch";
import HomeTags from "../../home/HomeTags";
import LoaodingAll from "../../modals/LoaodingAll";
import VideosRight from "../../modals/pages-boforload/VideosRight";
import Vedio from "../../video/Video";
import LiveCommentsVideos from "./right-side/LiveCommentsVideos";
import VideoOption from "./right-side/VideoOption";
//g
const RightSide = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const locaFetch = async () => {
      const dataRes: any = await allVideosFetch(0);
      setVideos(dataRes.responseData);
    };
    locaFetch();
  }, []);
  return (
    <div className={Style.container}>
      <LiveCommentsVideos />
      {/* <HomeTags /> */}
      {videos.length ? (
        videos.map((vid, index) => (
          <VideoOption key={index} Key={index} VideoData={vid} />
        ))
      ) : (
        <VideosRight />
      )}
      <LoaodingAll />
    </div>
  );
};

export default RightSide;
