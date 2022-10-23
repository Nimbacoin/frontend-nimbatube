import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Style from "../../../styles/pages/watch/rightside/rightside.module.css";
import allVideosFetch from "../../../utils/allVideosFetch";
import HomeTags from "../../home/HomeTags";
import LoaodingAll from "../../modals/LoaodingAll";
import VideosRight from "../../modals/pages-boforload/VideosRight";
import Vedio from "../../video/Video";
import LiveCommentsVideos from "./right-side/LiveCommentsVideos";
import VideoOption from "./right-side/VideoOption";
//gospfdpofd
const RightSide = () => {
  const { asPath } = useRouter();
  const [videos, setVideos] = useState([]);
  const [streamingVideo, setStreamingVideo] = useState(false);
  useEffect(() => {
    const locaFetch = async () => {
      const dataRes: any = await allVideosFetch(0);
      setVideos(dataRes.responseData);
    };
    locaFetch();
  }, []);

  useEffect(() => {
    let Params = new URL(window.location.href).searchParams;
    const watching: string | null = Params.get("watching");
    const streaming: string | null = Params.get("streaming");
    if (streaming && streaming.length) {
      if (streaming === "true") {
        setStreamingVideo(true);
        alert("df");
      }
    }
  }, [asPath]);
  return (
    <div className={Style.container}>
      {streamingVideo && <LiveCommentsVideos />}

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
