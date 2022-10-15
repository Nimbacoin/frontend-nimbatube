import React, { useEffect, useState } from "react";
import Style from "../../styles/pages/home/home.module.css";
import allVideosFetch from "../../utils/allVideosFetch";
import LoaodingAll from "../modals/LoaodingAll";
import AllVideosBeforLoad from "../modals/pages-boforload/AllVideosBeforLoad";
import Vedio from "../video/Video";
import HomeTags from "./HomeTags";

const Home = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const locaFetch = async () => {
      const dataRes: any = await allVideosFetch();
      setVideos(dataRes.responseData);
    };
    locaFetch();
  }, []);

  const firstVideos = videos.slice(0, 3);
  const restVideos = videos.slice(3, videos.length);
  return (
    <div className={Style.container}>
      <HomeTags />
      <div className={Style.vedio_container}>
        {firstVideos.length ? (
          firstVideos.map((vid) => <Vedio VideoData={vid} />)
        ) : (
          <AllVideosBeforLoad />
        )}
      </div>
      <div className={Style.vedio_container}>
        {restVideos.length ? (
          restVideos.map((vid) => <Vedio VideoData={vid} />)
        ) : (
          <AllVideosBeforLoad />
        )}
      </div>
      <LoaodingAll />
    </div>
  );
};

export default Home;
