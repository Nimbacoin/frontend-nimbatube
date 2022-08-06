import React from "react";
import Video from "../../../video/Video";
import Style from "../../../../styles/pages/chanel/my-chanel/my-chanel-component/content.module.css";

const Home = () => {
  return (
    <div className={Style.container}>
      <div className={Style.vedio_container}>
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
      </div>
    </div>
  );
};

export default Home;
