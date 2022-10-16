import React, { useEffect, useRef, useState } from "react";
import Style from "../../../../styles/pages/watch/leftside/video-tag.module.css";
import { v4 as uuid } from "uuid";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import basedGetUrlRequestLogedIn from "../../../../utils/basedGetUrlRequestLogedIn";
import basedPostUrlRequestLogedIn from "../../../../utils/basedPostUrlRequestLogedIn";
import { MainVideoDataReducer } from "../../../../redux/video-slice/VideoSlice";

const VideoTag = () => {
  const ResDD = useSelector(
    (state: any) => state.VideoSlice.mainVideoDataWatch
  );
  const { asPath } = useRouter();
  const Router = useRouter();
  const [ActiveVideo, setActiveVideo] = useState(true);
  const [videoData, setVideoData] = useState<{ [key: string]: any }>(
    ResDD?.responseData
  );

  const userSignIn = useSelector((state: any) => state.UserSignIn.userdata);
  const [videoId, setVideoId] = useState<string>("");

  const videoSrc = React.useRef<HTMLSourceElement | null>(null);
  const videoTag = React.useRef<HTMLVideoElement | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let Params = new URL(window.location.href).searchParams;
    const video: string | null = Params.get("video");
    if (videoTag.current) {
      if (video) {
        setVideoId(video);
      }
      if (typeof window !== "undefined") {
        videoTag.current.src =
          process.env.NEXT_PUBLIC_BACK_END_URL + "/api/get/read/video/" + video;
      }
    }
  }, [asPath]);

  return (
    <>
      {ActiveVideo && (
        <div className={Style.video_container}>
          <div className={Style.video_container_2}>
            <video className={Style.d} ref={videoTag} autoPlay muted loop>
              {/* controls */}
              <source ref={videoSrc} className={Style.video} type="video/mp4" />
            </video>
            <div className={Style.controls_container}>
              <div className={Style.bar_container}>
                <div className={Style.bar_red}></div>
              </div>
              <div className={Style.controlrs}>
                {" "}
                <AiOutlineLike />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoTag;
