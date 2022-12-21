import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { seoReducer } from "../../redux/seo-slice/seoSlice";
import Style from "../../styles/pages/home/home.module.css";
import allVideosFetch from "../../utils/allVideosFetch";
import LoaodingAll from "../modals/LoaodingAll";
import AllVideosBeforLoad from "../modals/pages-boforload/AllVideosBeforLoad";
import LoadingRoom from "../modals/pages-boforload/LoadingRoom";
import TopTitle from "../modals/TopTitle";
import Vedio from "../video/Video";
import HomeTags from "./HomeTags";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [limit, setLimit] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const locaFetch = async () => {
      const dataRes: any = await allVideosFetch(0);
      const allVids = dataRes.responseData;
      setVideos(dataRes.responseData);
      setFirstVideos(allVids.slice(0, 8));
      setRestVideos(allVids.slice(8, allVids.length));
      setLimit(dataRes?.limit);
    };
    locaFetch();
  }, []);

  const [firstVideos, setFirstVideos] = useState(videos.slice(0, 8));
  const [restVideos, setRestVideos] = useState(videos.slice(8, videos.length));

  useEffect(() => {
    window.onscroll = function (ev) {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 60
      ) {
        const locaFetch = async () => {
          const dataRes: any = await allVideosFetch(limit);
          if (dataRes?.responseData?.length >= 1) {
            const dataa = restVideos.concat(dataRes.responseData);
            const ids = dataa.map(({ videoData }: any) => videoData._id);
            const filtered = dataa.filter(
              (videoData: any, index: any) =>
                !ids.includes(videoData.videoData._id, index + 1)
            );
            setFirstVideos(filtered.slice(0, 8));
            setRestVideos(filtered.slice(8, filtered.length));
            setLimit(dataRes?.limit);
          }
        };
        locaFetch();
      } else if (document.documentElement.scrollTop < 1000) {
      } else if (document.documentElement.scrollTop >= 1000) {
      }
    };
  }, [limit]);
  const MenuBoolean = useSelector((state: any) => state.SideMenu.MenuBoolean);
  // useEffect(() => {
  //   if (divRef.current) {
  //     if (MenuBoolean) {
  //       divRef.current.className = Style.container_MenuBoolean;
  //     } else if (!MenuBoolean) {
  //       divRef.current.className = Style.container;
  //     }
  //   }
  // }, [MenuBoolean]);
  const divRef = React.useRef<HTMLDivElement>(null);

  dispatch(seoReducer({ title: "Home" }));

  return (
    <div ref={divRef} className={Style.container}>
      {/* <AllVideosBeforLoad /> */}
      <HomeTags />
      {/* <LoadingRoom /> */}
      {/* <AllVideosBeforLoad /> */}
      <div className={Style.vedio_container}>
        {firstVideos.length ? (
          firstVideos.map((vid) => <Vedio VideoData={vid} />)
        ) : (
          <>
            <AllVideosBeforLoad />
            <AllVideosBeforLoad />
          </>
        )}
      </div>
      <TopTitle />
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
