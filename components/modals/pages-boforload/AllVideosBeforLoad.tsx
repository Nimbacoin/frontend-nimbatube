import React from "react";
import Style from "../../../styles/pages/modals/pages-boforload/all-videos-befor-load.module.css";
const AllVideosBeforLoad = () => {
  const repeat = Array(16)
    .fill(0)
    .map((_, i) => (
      <div className={Style.main_container}>
        <div className={Style.vedio_container}></div>
        <div className={Style.desc_container}>
          <div className={Style.chanel_data}>
            <div className={Style.chanel_img}></div>
          </div>
          <div className={Style.title_data}>
            <div className={Style.big_bar}></div>
            <div className={Style.small_bar}></div>
          </div>
        </div>
      </div>
    ));
  return <div className={Style.container}>{repeat}</div>;
};

export default AllVideosBeforLoad;
