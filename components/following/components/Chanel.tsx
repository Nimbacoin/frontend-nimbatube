import React from "react";
import Style from "../../../styles/pages/following/components/chanel.module.css";
import { IoEllipsisVertical } from "@react-icons/all-files/io5/IoEllipsisVertical";

const Chanel = () => {
  const Bg =
    "https://i.ytimg.com/vi/jkngyZjRETs/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCq5lWXE4aLsOyXxZrIHGddeICzIw";
  return (
    <div className={Style.container}>
      <div
        style={{ backgroundImage: `url(${Bg})` }}
        className={Style.img}
      ></div>
      <div className={Style.chanel_container}>
        <span className={Style.chanel_name}>MrBeast</span>
        <span className={Style.username}>@MrBeast</span>
        <p className={Style.chanel_followers}>
          <span className={Style.Followers}>100 Followers - 100 Uploads</span>
        </p>
        <button className={Style.follow_button}>Follow</button>
      </div>
      <div className={Style.right_container}>
        <button className={Style.IoEllipsisVertical}>
          <IoEllipsisVertical />
        </button>
      </div>
    </div>
  );
};

export default Chanel;
