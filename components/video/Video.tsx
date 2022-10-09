import React, { useEffect, useRef, useState } from "react";
import Style from "../../styles/pages/vedio/vedio.module.css";
import { IoEllipsisVertical } from "@react-icons/all-files/io5/IoEllipsisVertical";
import { IoVideocamOutline } from "@react-icons/all-files/io5/IoVideocamOutline";
import moment from "moment";

import Link from "next/link";
import Image from "next/image";
const Video = ({ VideoData }: any) => {
  const [OverElement, setOverElement] = useState(false);
  const [isLaoded, setIsLaoded] = useState(false);

  const streaming = VideoData?.streaming;
  const [videoLink, setVideoLink] = useState("");
  //console.log(VideoData);
  const HandelOver = () => {
    setOverElement(true);
  };
  const HandelLeave = () => {
    setOverElement(false);
  };
  const ThumbnailImg = React.useRef<HTMLDivElement | null>(null);
  const [ScreenWithByHalf, setScreenWithByHalf] = useState(500);
  const [IsPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const isLive = streaming?.isLive;
    const created = streaming?.created;
    const socketId = streaming?.socketId;

    if (isLive && created) {
      console.log("yes");
      setVideoLink(
        "/watch/watch?streaming=true&video=" +
          VideoData?._id +
          "&socketId=" +
          socketId
      );
    } else {
      setVideoLink(
        "/watch/watch?watching=true&video=" + VideoData?.videoData?._id
      );
    }
  }, [streaming]);
  useEffect(() => {
    if (window.innerWidth <= 900) {
      setIsPhone(true);
      setScreenWithByHalf(window.innerWidth / 2.5);
    } else if (window.innerWidth > 900) {
      setIsPhone(false);
    }
    window.onresize = () => {
      if (window.innerWidth <= 900) {
        setIsPhone(true);
        setScreenWithByHalf(window.innerWidth / 2.5);
      } else if (window.innerWidth > 900) {
        setIsPhone(false);
      }
    };
  });
  const Bg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRDiptnG_Y2jFrhLCByHAi4Pnor9jbFo2Ouw&usqp=CAU";
  const BgP = VideoData?.channelData?.channelData?.profileImg?.url
    ? process.env.NEXT_PUBLIC_BACK_END_URL +
      "/api/get/read/images/" +
      VideoData?.channelData?.channelData?.profileImg?.url
    : "/images/default-profile.png";

  const Title = VideoData?.videoData?.title;

  const thumbnail =
    process.env.NEXT_PUBLIC_BACK_END_URL +
    "/api/get/read/images/" +
    VideoData?.videoData?.thumbnail;
  const handelImagLaod = () => {
    alert("Sd");
  };
  useEffect(() => {
    const thumImg = VideoData?.videoData?.thumbnail;
    // if (thumImg) {
    //   setIsLaoded(true);
    // }
    function load(src: string) {
      const image = document.createElement("img");
      image.addEventListener("load", () => {
        if (thumImg) {
          setIsLaoded(true);
        }
      });
      image.addEventListener("error", () => {});
      image.src = src;
    }
    load(thumbnail);
  });

  return (
    <Link href={videoLink}>
      <div
        onMouseOver={HandelOver}
        onMouseLeave={HandelLeave}
        className={Style.container}
      >
        <div
          onLoad={handelImagLaod}
          ref={ThumbnailImg}
          style={{
            backgroundImage: `url(${thumbnail})`,
            // minHeight: `${IsPhone && ScreenWithByHalf}px`,
          }}
          className={Style.vedio_container}
        >
          {!isLaoded && (
            <div className={Style.lds_roller}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}

          <p className={Style.time}>
            {VideoData?.videoData?.duration} <IoVideocamOutline />{" "}
          </p>
        </div>
        <div className={Style.desc_container}>
          <div className={Style.title_data}>
            <p className={Style.title}>{Title}</p>
            <i
              style={{ color: `${OverElement ? "#030303" : "#F9F9F9"}` }}
              className={Style.menu}
            >
              <IoEllipsisVertical />
            </i>
          </div>
          <div className={Style.chanel_data}>
            <div
              style={{ backgroundImage: `url(${BgP})` }}
              className={Style.chanel_img}
            ></div>
            <p className={Style.chanel_details}>
              <span className={Style.chanel_name}>
                {VideoData?.channelData?.channelData?.name}
              </span>
              <span className={Style.date}>
                {VideoData?.videoData?.views?.length}{" "}
                {VideoData?.videoData?.views?.length && " views - "}
                {moment(VideoData?.videoData?.createdAt)
                  .startOf("hour")
                  .fromNow()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Video;
