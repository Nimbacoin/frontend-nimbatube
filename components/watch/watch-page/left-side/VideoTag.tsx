import React, { useEffect, useRef, useState } from "react";
import Style from "../../../../styles/pages/watch/leftside/video-tag.module.css";
import { v4 as uuid } from "uuid";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import basedGetUrlRequestLogedIn from "../../../../utils/basedGetUrlRequestLogedIn";
import basedPostUrlRequestLogedIn from "../../../../utils/basedPostUrlRequestLogedIn";
import { IoPlaySkipBack } from "@react-icons/all-files/io5/IoPlaySkipBack";
import { IoPlaySkipForward } from "@react-icons/all-files/io5/IoPlaySkipForward";
import { IoPauseSharp } from "@react-icons/all-files/io5/IoPauseSharp";
import { BiFullscreen } from "@react-icons/all-files/bi/BiFullscreen";
import { IoVolumeMedium } from "@react-icons/all-files/io5/IoVolumeMedium";
import { IoVolumeMute } from "@react-icons/all-files/io5/IoVolumeMute";
import { IoPlay } from "@react-icons/all-files/io5/IoPlay";
import LaodingCirculOne from "../../../modals/LaodingCirculOne";

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
  const [loadeded, setLoadeded] = useState(false);

  const userSignIn = useSelector((state: any) => state.UserSignIn.userdata);
  const [videoId, setVideoId] = useState<string>("");
  const duration = videoData?.duration;

  const videoSrc = React.useRef<HTMLSourceElement | null>(null);
  const videoTag = React.useRef<HTMLVideoElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const hiddenDiv = React.useRef<HTMLDivElement | null>(null);
  const redBar = React.useRef<HTMLInputElement | null>(null);
  const grayBar = React.useRef<HTMLDivElement | null>(null);

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
  const [timeUpdate, setTimeUpdate] = useState(0);
  const [timeValue, setTimeValue] = useState("0");
  useEffect(() => {
    if (videoTag.current) {
      videoTag.current.play();
      videoTag.current.onloadedmetadata = (event) => {
        if (videoTag.current) {
          setLoadeded(true);
          videoTag.current.play();
        }
      };
      videoTag.current.addEventListener("timeupdate", () => {
        if (videoTag.current && redBar.current) {
          const num =
            (videoTag.current.currentTime / videoTag.current.duration) *
            Number(redBar.current.max);
          redBar.current.value = num.toString();
        }
        if (redBar.current) {
          redBar.current.addEventListener("change", () => {
            if (redBar.current && videoTag.current) {
              videoTag.current.currentTime =
                (videoTag.current.duration * Number(redBar.current.value)) /
                Number(redBar.current.max);
            }
          });
        }
      });

      videoTag.current.addEventListener("timeupdate", () => {
        if (videoTag.current) {
          var num = Number(videoTag.current.currentTime / 60);
          var roundedString = num.toFixed(2);
          var rounded = Number(roundedString);
          setTimeUpdate(rounded);
        }
      });
    }
  }, [videoTag, redBar]);

  useEffect(() => {
    if (redBar.current) {
    }
    window.onresize = () => {
      if (videoTag.current && hiddenDiv.current) {
        const dataDiv = videoTag.current.getBoundingClientRect();
        hiddenDiv.current.style.height = `${dataDiv.height + 10}px`;
      }
    };
    if (videoTag.current && hiddenDiv.current) {
      const dataDiv = videoTag.current.getBoundingClientRect();
      hiddenDiv.current.style.height = `${dataDiv.height + 10}px`;
    }
  });
  const [play, setPlay] = useState(false);
  const handelPuase = () => {
    setPlay(true);
    if (videoTag.current) {
      videoTag.current.pause();
    }
  };
  const handelPlay = () => {
    setPlay(false);
    if (videoTag.current) {
      videoTag.current.play();
    }
  };
  const [vidMutued, setVidMutued] = useState(false);
  const handelMuteVid = () => {
    setVidMutued(!vidMutued);
    if (videoTag.current) {
      videoTag.current.muted = !videoTag.current.muted;
    }
  };

  return (
    <>
      <div className={Style.hiddenDiv} ref={hiddenDiv}></div>
      {ActiveVideo && (
        <div ref={containerRef} className={Style.video_container}>
          <div className={Style.video_container_2}>
            {!loadeded && (
              <div className={Style.loading}>
                <LaodingCirculOne />
              </div>
            )}

            <video
              className={Style.video_tag}
              ref={videoTag}
              // muted
              autoPlay
              loop
            >
              <source ref={videoSrc} className={Style.video} type="video/mp4" />
            </video>
            <div className={Style.controls_container}>
              <div className={Style.bar_container}>
                <span className={Style.time_900}>
                  {timeUpdate + " / " + duration}
                </span>
                {timeUpdate > 0 ? (
                  <input
                    ref={redBar}
                    className={Style.seekBar}
                    type="range"
                    min="0"
                    max="100"
                  />
                ) : (
                  <input
                    value="0"
                    className={Style.seekBar}
                    type="range"
                    min="0"
                    max="100"
                  />
                )}
              </div>
              <div className={Style.controlrs}>
                <div className={Style.play_sound_controls}>
                  <span className={Style.icon_control}>
                    <IoPlaySkipBack />
                  </span>
                  {play ? (
                    <span onClick={handelPlay} className={Style.icon_control}>
                      <IoPlay />
                    </span>
                  ) : (
                    <span onClick={handelPuase} className={Style.icon_control}>
                      <IoPauseSharp />
                    </span>
                  )}
                  <span className={Style.icon_control}>
                    <IoPlaySkipForward />
                  </span>
                  <span
                    onClick={handelMuteVid}
                    className={Style.icon_control_1000}
                  >
                    {vidMutued ? <IoVolumeMute /> : <IoVolumeMedium />}
                  </span>
                  <input
                    // ref={redBar}
                    className={Style.seekBar_sound}
                    type="range"
                    min="0"
                    max="100"
                  />
                  <span className={Style.time}>
                    {timeUpdate + " / " + duration}
                  </span>
                </div>
                <div className={Style.other_controls}>
                  <span className={Style.icon_control_1000}>
                    <BiFullscreen />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoTag;
