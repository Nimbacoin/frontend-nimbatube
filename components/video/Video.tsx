import React, { useEffect, useRef, useState } from "react";
import Style from "../../styles/pages/vedio/vedio.module.css";
import { IoEllipsisVertical } from "@react-icons/all-files/io5/IoEllipsisVertical";
import { IoVideocamOutline } from "@react-icons/all-files/io5/IoVideocamOutline";
import moment from "moment";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import LoaodingAll from "../modals/LoaodingAll";
import GoogleIcon from "../modals/GoogleIcon";
const Video = ({ VideoData }: any) => {
  const [OverElement, setOverElement] = useState(false);
  const [isLaoded, setIsLaoded] = useState(false);
  const streaming = VideoData?.streaming;
  const [videoLink, setVideoLink] = useState("");
  const MenuBoolean = useSelector((state: any) => state.SideMenu.MenuBoolean);
  const HandelOver = () => {
    setOverElement(true);
  };
  const HandelLeave = () => {
    setOverElement(false);
  };
  const ThumbnailImg = React.useRef<HTMLDivElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const channelNameRef = React.useRef<HTMLDivElement | null>(null);
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
  const handelImagLaod = () => {};
  useEffect(() => {
    const thumImg = VideoData?.videoData?.thumbnail;

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
  const Router = useRouter();
  const handelClickVideo = (e: any) => {
    if (channelNameRef && channelNameRef.current && Spanlem.current) {
      const channelNameRefCurnt = channelNameRef.current;
      const SpanlemCurnt = Spanlem.current;
      if (channelNameRefCurnt.contains(e.target)) {
        Router.push("/channel/@/" + VideoData?.channelData?._id);
      } else if (SpanlemCurnt.contains(e.target)) {
      } else {
        Router.push(videoLink);
      }
    }
  };
  const Spanlem = React.useRef<HTMLSpanElement>(null);

  return (
    <div
      ref={containerRef}
      // onClick={handelClickVideo}
      onMouseOver={HandelOver}
      onMouseLeave={HandelLeave}
      className={Style.container}
    >
      <Link href={videoLink}>
        <div
          onLoad={handelImagLaod}
          ref={ThumbnailImg}
          style={{
            backgroundImage: `url(${thumbnail})`,
            // minHeight: `${IsPhone && ScreenWithByHalf}px`,
          }}
          className={
            MenuBoolean
              ? Style.vedio_container_MenuBoolean
              : Style.vedio_container
          }
        >
          {!isLaoded && <LoaodingAll />}

          <p className={Style.time}>
            {VideoData?.videoData?.duration}
            {/* <GoogleIcon IconName={"videocam"} /> */}
            <IoVideocamOutline />{" "}
          </p>
        </div>
      </Link>
      <div className={Style.desc_container}>
        <div className={Style.title_data}>
          <p className={Style.title}>{Title?.slice(0, 70)}</p>
          <span
            ref={Spanlem}
            className={OverElement ? Style.menu_desktop : Style.menu}
          >
            <IoEllipsisVertical />
          </span>
        </div>
        <div className={Style.chanel_data}>
          <div
            style={{ backgroundImage: `url(${BgP})` }}
            className={Style.chanel_img}
          ></div>
          <div className={Style.chanel_details}>
            <div ref={channelNameRef} className={Style.chanel_name}>
              {VideoData?.channelData?.channelData?.name}
            </div>
            <span className={Style.date}>
              {VideoData?.videoData?.views?.length}{" "}
              {VideoData?.videoData?.views?.length && " views - "}
              {moment(VideoData?.videoData?.createdAt)
                .startOf("hour")
                .fromNow()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
