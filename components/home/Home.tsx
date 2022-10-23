import React, { useEffect, useState } from "react";
import Style from "../../styles/pages/home/home.module.css";
import allVideosFetch from "../../utils/allVideosFetch";
import LoaodingAll from "../modals/LoaodingAll";
import AllVideosBeforLoad from "../modals/pages-boforload/AllVideosBeforLoad";
import Vedio from "../video/Video";
import HomeTags from "./HomeTags";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [limit, setLimit] = useState(0);
  useEffect(() => {
    const locaFetch = async () => {
      const dataRes: any = await allVideosFetch(0);
      setVideos(dataRes.responseData);
      setFirstVideos(dataRes.responseData.slice(0, 3));
      setRestVideos(dataRes.responseData.slice(3, dataRes.responseData.length));
      setLimit(dataRes?.limit);
      console.log(dataRes?.limit);
    };
    locaFetch();
  }, []);

  const [firstVideos, setFirstVideos] = useState(videos.slice(0, 3));
  const [restVideos, setRestVideos] = useState(videos.slice(3, videos.length));

  useEffect(() => {
    window.onscroll = function (ev) {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 60
      ) {
        const locaFetch = async () => {
          console.log(limit);
          const dataRes: any = await allVideosFetch(limit);
          setRestVideos(restVideos.concat(dataRes.responseData));
          console.log(dataRes?.limit);
          setLimit(dataRes?.limit);
          console.log(dataRes?.limit);
          console.log(limit);
        };
        locaFetch();
        console.log("botoom");
      } else if (document.documentElement.scrollTop < 1000) {
        console.log("SF");
      } else if (document.documentElement.scrollTop >= 1000) {
        console.log("DF");
      }
    };
  }, [limit]);
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
