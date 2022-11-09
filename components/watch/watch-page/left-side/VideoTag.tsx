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
import GoogleIcon from "../../../modals/GoogleIcon";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseSharpIcon from "@mui/icons-material/PauseSharp";
import { IoIosPause } from "@react-icons/all-files/io/IoIosPause";
import SkipNextSharpIcon from "@mui/icons-material/SkipNextSharp";
import SkipPreviousSharpIcon from "@mui/icons-material/SkipPreviousSharp";
import VolumeOffSharpIcon from "@mui/icons-material/VolumeOffSharp";
import VolumeUpSharpIcon from "@mui/icons-material/VolumeUpSharp";
import Slider, { SliderProps } from "@mui/material/Slider";
import VideoBar from "./VideoBar";
import VideoTimeReader from "../../../../utils/VideoTimeReader";
import VideoTimeReaderChanging from "../../../../utils/VideoTimeReaderChanging";
import SoundBar from "./SoundBar";

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
  const [duration, setDuration] = useState("00:00");

  const videoSrc = React.useRef<HTMLSourceElement | null>(null);
  const videoTag = React.useRef<HTMLVideoElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const hiddenDiv = React.useRef<HTMLDivElement | null>(null);
  const redBar = React.useRef<HTMLInputElement | null>(null);
  const [timeUpdate, setTimeUpdate] = useState("00:00");
  const [timeValue, setTimeValue] = useState("0");
  const dispatch = useDispatch();

  useEffect(() => {
    let Params = new URL(window.location.href).searchParams;
    const video: string | null = Params.get("video");
    if (videoTag.current) {
      if (video) {
        setVideoId(video);
      }
      if (typeof window !== "undefined" && videoData && videoData?.location) {
        videoTag.current.src = videoData.location;
      }
    }
  }, [asPath]);

  useEffect(() => {
    const CurrentVideo = videoTag.current;
    if (CurrentVideo) {
      CurrentVideo.onloadedmetadata = (event) => {
        if (CurrentVideo && CurrentVideo.src) {
          CurrentVideo.play();
          const TimeVideo = CurrentVideo.duration;
          setDuration(VideoTimeReader(TimeVideo));
        }
        if (CurrentVideo) {
          setLoadeded(true);
          CurrentVideo.play();
        }
      };
      CurrentVideo.addEventListener("timeupdate", () => {
        if (videoTag.current) {
          const num =
            (videoTag.current.currentTime / videoTag.current.duration) * 100;
          setTimeValue(`${num}%`);
          setTimeUpdate(VideoTimeReaderChanging(videoTag.current.currentTime));
        }
      });
    }
  }, [videoTag.current, videoSrc.current]);

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

  const setProgress = (newTime: any) => {
    if (videoTag.current) {
      videoTag.current.currentTime = newTime * videoTag.current.duration;
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

            <video className={Style.video_tag} ref={videoTag} muted autoPlay>
              <source ref={videoSrc} className={Style.video} type="video/mp4" />
            </video>
            <div className={Style.controls_container}>
              <div className={Style.bar_container}>
                <span className={Style.time_900}>
                  {timeUpdate + " / " + duration}
                </span>
                <VideoBar HandelClick={setProgress} Width={timeValue} />
              </div>
              <div className={Style.controlrs}>
                <div className={Style.play_sound_controls}>
                  <span className={Style.icon_control}>
                    <SkipPreviousSharpIcon />
                  </span>
                  {play ? (
                    <span onClick={handelPlay} className={Style.icon_control}>
                      <PlayArrowIcon />
                    </span>
                  ) : (
                    <span onClick={handelPuase} className={Style.icon_control}>
                      <PauseSharpIcon />
                    </span>
                  )}
                  <span className={Style.icon_control}>
                    <SkipNextSharpIcon />
                  </span>
                  <span
                    onClick={handelMuteVid}
                    className={Style.icon_control_1000}
                  >
                    {vidMutued ? <VolumeOffSharpIcon /> : <VolumeUpSharpIcon />}
                  </span>

                  <div className={Style.div_sound_container_bar}>
                    <SoundBar />
                  </div>

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
