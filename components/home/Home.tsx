import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
      setFirstVideos(dataRes.responseData.slice(0, 4));
      setRestVideos(dataRes.responseData.slice(4, dataRes.responseData.length));
      setLimit(dataRes?.limit);
      console.log(dataRes?.limit);
    };
    locaFetch();
  }, []);

  const [firstVideos, setFirstVideos] = useState(videos.slice(0, 4));
  const [restVideos, setRestVideos] = useState<{ [key: string]: any }>([]);

  useEffect(() => {
    window.onscroll = function (ev) {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 60
      ) {
        const locaFetch = async () => {
          console.log(limit);

          const dataRes: any = await allVideosFetch(limit);
          if (dataRes?.responseData?.length >= 1) {
            const dataa = restVideos.concat(dataRes.responseData);
            const ids = dataa.map(({ videoData }: any) => videoData._id);
            const filtered = dataa.filter(
              (videoData: any, index: any) =>
                !ids.includes(videoData.videoData._id, index + 1)
            );
            setRestVideos(filtered);
            setLimit(dataRes?.limit);
          }
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
  const MenuBoolean = useSelector((state: any) => state.SideMenu.MenuBoolean);
  // useEffect(() => {
  //   if (divRef.current) {
  //     if (MenuBoolean) {
  //       divRef.current.style.minWidth = "1100px";
  //     } else {
  //       divRef.current.style.minWidth = "1255px";
  //     }
  //   }
  // }, [MenuBoolean]);
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={divRef} className={Style.container}>
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
          restVideos.map((vid: any) => <Vedio VideoData={vid} />)
        ) : (
          <AllVideosBeforLoad />
        )}
      </div>
      <LoaodingAll />
    </div>
  );
};

export default Home;
