import React, { useEffect, useState } from "react";
import Style from "../../styles/pages/vedio/vedio.module.css";
import { IoEllipsisVertical } from "@react-icons/all-files/io5/IoEllipsisVertical";
import { IoVideocamOutline } from "@react-icons/all-files/io5/IoVideocamOutline";
import moment from "moment";

import Link from "next/link";
const Video = ({ VideoData }: any) => {
  const [OverElement, setOverElement] = useState(false);
  const streaming = VideoData?.streaming;
  const [videoLink, setVideoLink] = useState("");

  const HandelOver = () => {
    setOverElement(true);
  };
  const HandelLeave = () => {
    setOverElement(false);
  };
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
      setVideoLink("/watch/watch?watching=true&video=" + VideoData?._id);
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
  const BgP = "/images/default-profile.png";

  const Title = VideoData?.title;
  ("ily (i love you baby) - Surf Mesa ft. Emilee - acoustic / vocal (cover)");
  const thumbnail =
    process.env.NEXT_PUBLIC_BACK_END_URL +
    "/api/get/read/images/" +
    VideoData?.thumbnail;
  return (
    <Link href={videoLink}>
      <div
        onMouseOver={HandelOver}
        onMouseLeave={HandelLeave}
        className={Style.container}
      >
        <div
          style={{
            backgroundImage: `url(${thumbnail})`,
            minHeight: `${IsPhone && ScreenWithByHalf}px`,
          }}
          className={Style.vedio_container}
        >
          <p className={Style.time}>
            {VideoData?.duration} <IoVideocamOutline />{" "}
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
              <span className={Style.chanel_name}>MrBeast</span>
              <span className={Style.date}>3 Days Ago</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Video;
