import React, { useEffect, useState, useRef } from "react";
import Style from "../../../styles/layout/header/header-compnents/notfy-drop-down.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import moment from "moment";
import TextTilteInputMudum from "../../../components/modals/text/TextTilteInputMudum";
import SmallTextBlack from "../../../components/modals/SmallTextBlack";
import SkinyGrayText from "../../../components/modals/SkinyGrayText";

const NotfyDropDown = ({ Notification }: any) => {
  const Notify: any = [];
  const notification = useSelector(
    (state: any) => state.UserSignIn.notification
  );
  const Router = useRouter();
  const [videoLink, setVideoLink] = useState("");

  const hadnelClick = (videoData: any) => {
    Router.push("/watch/watch?watching=true&video=" + videoData?._id);
  };
  return (
    <div className={Style.container}>
      <div className={Style.drop_down_container}>
        {notification.length
          ? notification.map(({ channelData, videoData, vid }: any) => (
              <div
                onClick={() => {
                  hadnelClick(videoData);
                }}
                className={Style.main_container}
              >
                <div className={Style.img_container}>
                  <div
                    style={{
                      backgroundImage: `url(${channelData?.channelData?.profileImg?.url})`,
                    }}
                    className={Style.channel_img}
                  ></div>
                </div>
                <div className={Style.desc_container}>
                  <TextTilteInputMudum
                    Text={channelData?.channelData?.name + ":"}
                  />
                  {/* <p className={Style.text}>{videoData?.title}</p> */}
                  <SmallTextBlack
                    Text={
                      `${videoData?.title && videoData?.title.slice(0, 80)}` +
                      "" +
                      `${
                        videoData?.title &&
                        videoData?.title?.length >= 80 &&
                        "..."
                      }`
                    }
                  />
                  <SkinyGrayText
                    Text={moment(vid?.from?.createAt).startOf("hour").fromNow()}
                  />
                  {/* <p className={Style.text_date}>
                    {moment(vid?.from?.createAt).startOf("hour").fromNow()}
                  </p> */}
                </div>
                <div className={Style.video_container}>
                  <div
                    style={{
                      backgroundImage: `url(${videoData?.thumbnail})`,
                    }}
                    className={Style.video_img}
                  ></div>
                </div>
              </div>
            ))
          : ""}{" "}
      </div>
    </div>
  );
};

export default NotfyDropDown;
