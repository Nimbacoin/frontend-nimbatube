import React, { useEffect, useState } from "react";
import Style from "../../../styles/pages/watch/rightside/rightside.module.css";
import allVideosFetch from "../../../utils/allVideosFetch";
import VideosRight from "../../modals/pages-boforload/VideosRight";
import Vedio from "../../video/Video";
import VideoOption from "./right-side/VideoOption";

const RightSide = () => {
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
      {videos.length ? (
        videos.map((vid, index) => (
          <VideoOption key={index} Key={index} VideoData={vid} />
        ))
      ) : (
        <VideosRight />
      )}
    </div>
  );
};

export default RightSide;
