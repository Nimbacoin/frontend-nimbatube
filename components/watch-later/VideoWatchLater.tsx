import React, { useState, useEffect } from "react";
import Style from "../../styles/pages/watch-later/video-watch-later.module.css";
import { IoEllipsisVertical } from "@react-icons/all-files/io5/IoEllipsisVertical";
import moment from "moment";
import { useRouter } from "next/router";

const VideoWatchLater = ({ VideoData }: any) => {
  const Router = useRouter();
  const thumbnail =
    process.env.NEXT_PUBLIC_BACK_END_URL +
    "/api/get/read/images/" +
    VideoData?.videoData?.thumbnail;

  const [videoStyle, setVideoStyle] = useState({ zIndex: "10" });
  const [thumbnailStyle, setThumbnailStyle] = useState({
    zIndex: "11",
    backgroundImage: `url(${thumbnail})`,
  });

  const Bg = VideoData?.channelData?.channelData?.profileImg?.url
    ? process.env.NEXT_PUBLIC_BACK_END_URL +
      "/api/get/read/images/" +
      VideoData?.channelData?.channelData?.profileImg?.url
    : "/images/default-profile.png";

  const verLi = React.useRef<HTMLButtonElement>(null);
  const mediaContainer = React.useRef<HTMLDivElement>(null);
  const videoTag = React.useRef<HTMLVideoElement | null>(null);

  const handelClick = (e: any) => {
    const refany = verLi.current;
    if (verLi && verLi.current && refany?.contains(e.target)) {
    } else {
      Router.push(
        "/watch/watch?watching=true&video=" + VideoData?.videoData?._id
      );
    }
  };
  useEffect(() => {
    const handelClick = (e: any) => {
      if (mediaContainer && mediaContainer.current) {
        const refany = mediaContainer.current;
        if (refany.contains(e.target)) {
          setVideoStyle({ zIndex: "12" });
          setThumbnailStyle({
            zIndex: "10",
            backgroundImage: `url(${""})`,
          });
        } else {
          setVideoStyle({ zIndex: "10" });
          setThumbnailStyle({
            zIndex: "11",
            backgroundImage: `url(${thumbnail})`,
          });
        }
      }
    };
    window.addEventListener("mouseover", handelClick);
  });
  useEffect(() => {
    if (videoTag.current) {
      videoTag.current.src =
        process.env.NEXT_PUBLIC_BACK_END_URL +
        "/api/get/read/video/" +
        VideoData?.videoData?._id;
    }
  }, []);

  return (
    <div onClick={handelClick} className={Style.container}>
      <div ref={mediaContainer} className={Style.video_container}>
        <div style={thumbnailStyle} className={Style.thumbnail_container}></div>
        <video
          ref={videoTag}
          style={videoStyle}
          className={Style.video}
          autoPlay
          muted
          loop
        >
          <source type="video/mp4" />
        </video>
        <span className={Style.time}> 5:50</span>
      </div>
      <div className={Style.video_date_containe}>
        <span className={Style.chanel_name}>{VideoData?.videoData?.title}</span>
        <div className={Style.chanel_container}>
          <div
            style={{ backgroundImage: `url(${Bg})` }}
            className={Style.img}
          ></div>
          <p className={Style.chanel_followers}>
            <span className={Style.username}>
              {VideoData?.channelData?.channelData?.name}
            </span>
            <span className={Style.Followers}>
              {moment(VideoData?.videoData?.createdAt)
                .startOf("hour")
                .fromNow()}{" "}
              -{" "}
              {moment(VideoData?.videoData?.createdAt)
                .startOf("hour")
                .fromNow()}
            </span>
          </p>
        </div>
      </div>
      <div className={Style.right_container}>
        <button ref={verLi} className={Style.IoEllipsisVertical}>
          <IoEllipsisVertical />
        </button>
      </div>
    </div>
  );
};

export default VideoWatchLater;
