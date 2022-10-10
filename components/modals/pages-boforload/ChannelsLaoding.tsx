import React from "react";
import Style from "../../../styles/modals/pages-boforload/channels-laoding.module.css";
const ChannelsLaoding = () => {
  const repeat = Array(16)
    .fill(0)
    .map((_, i) => (
      <div className={Style.main_container}>
        <div className={Style.chanel_data}>
          <div className={Style.chanel_img}></div>
        </div>
        <div className={Style.title_data}>
          <div className={Style.big_bar}></div>
          <div className={Style.small_bar}></div>
          <div className={Style.last_bar}></div>
        </div>
      </div>
    ));
  return <div className={Style.container}>{repeat}</div>;
};

export default ChannelsLaoding;
