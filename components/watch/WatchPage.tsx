import React, { useEffect, useState } from "react";
import LeftSide from "./watch-page/LeftSide";
import RightSide from "./watch-page/RightSide";
import Style from "../../styles/pages/watch/watch.module.css";
import { useDispatch } from "react-redux";
import { MainVideoDataReducer } from "../../redux/video-slice/VideoSlice";
import basedGetUrlRequest from "../../utils/basedGetUrlRequest";
import { useRouter } from "next/router";
const WatchPage = () => {
  const [videoData, setVideoData] = useState({});
  const dispatch = useDispatch();
  const { asPath } = useRouter();

  useEffect(() => {
    const localFetch = async () => {
      let Params = new URL(window.location.href).searchParams;
      const video: string | null = Params.get("video");
      await basedGetUrlRequest(
        "/api/get/video/" +
          video +
          "/" +
          "1232223923020290230923" +
          "/" +
          "cookies",
        true
      ).then((res) => {
        console.log(res);
        setVideoData(res);
        dispatch(MainVideoDataReducer({ message: "data", data: res }));
      });
    };
    localFetch();
  }, [asPath]);

  return (
    <div className={Style.container}>
      <LeftSide />
      <RightSide videoData={videoData} />
    </div>
  );
};

export default WatchPage;
