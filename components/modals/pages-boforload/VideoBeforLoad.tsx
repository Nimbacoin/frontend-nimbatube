import React from "react";
import Style from "../../../styles/modals/pages-boforload/video-befor-load.module.css";

const VideoBeforLoad = () => {
  return (
    <div className={Style.container}>
      <div className={Style.container_name}>
        <div className={Style.container_name_first}></div>
        <div className={Style.container_name_second}></div>
        <div className={Style.container_name_date}></div>
      </div>
      <div className={Style.main_container_channel}>
        <div className={Style.channel_container}>
          <div className={Style.channel_image}></div>
          <div className={Style.channel_name_container}>
            <div className={Style.channel_name_first}></div>
            <div className={Style.channel_name_second}></div>
          </div>
          <div className={Style.channel_follow_button}></div>
        </div>
        <div className={Style.video_button_container}>
          <div className={Style.video_button}></div>
          <div className={Style.video_button}></div>
          <div className={Style.video_button}></div>
          <div className={Style.video_button}></div>
          <div className={Style.video_button}></div>
          <div className={Style.video_button}></div>
        </div>
      </div>
    </div>
  );
};

export default VideoBeforLoad;
