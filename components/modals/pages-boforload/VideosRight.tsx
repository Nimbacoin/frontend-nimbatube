import React from "react";
import Style from "../../../styles/modals/pages-boforload/videos-right.module.css";
const VideosRight = () => {
  const repeat = Array(10)
    .fill(0)
    .map((_, index) => (
      <div key={index} className={Style.main_container}>
        <div className={Style.vedio_container}>
          <div className={Style.desc_container_time}></div>
        </div>
        <div className={Style.desc_container}>
          <div className={Style.chanel_data}>
            <div className={Style.chanel_img}></div>
          </div>
          <div className={Style.title_data}>
            <div className={Style.big_bar}></div>
            <div className={Style.small_bar}></div>
          </div>
          <div className={Style.title_data}>
            <div className={Style.big_bar_bottom}></div>
            <div className={Style.small_bar_bottom}></div>
          </div>
        </div>
      </div>
    ));
  return <div className={Style.container}>{repeat}</div>;
};

export default VideosRight;
