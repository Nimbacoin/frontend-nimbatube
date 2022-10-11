import React, { useEffect, useState, useRef } from "react";
import Style from "../../../styles/layout/header/header-compnents/notfy-drop-down.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const NotfyDropDown = ({ Notification }: any) => {
  const Notify: any = [];
  const notification = useSelector(
    (state: any) => state.UserSignIn.notification
  );
  return (
    <div className={Style.drop_down_container}>
      {notification.length
        ? notification.map(({ channelData }: any) => (
            <div className={Style.main_container}>
              <div className={Style.img_container}>
                <div
                  style={{
                    backgroundImage: `url(${
                      process.env.NEXT_PUBLIC_BACK_END_URL +
                      "/api/get/read/images/" +
                      channelData?.channelData?.profileImg?.url
                    })`,
                  }}
                  className={Style.channel_img}
                ></div>
              </div>
              <div className={Style.desc_container}>
                <p className={Style.text}>{}</p>
              </div>
              <div className={Style.video_container}>
                <div className={Style.video_img}></div>
              </div>
            </div>
          ))
        : ""}{" "}
    </div>
  );
};

export default NotfyDropDown;
