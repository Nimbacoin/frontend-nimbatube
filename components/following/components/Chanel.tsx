import React from "react";
import Style from "../../../styles/pages/following/components/chanel.module.css";
import { IoEllipsisVertical } from "@react-icons/all-files/io5/IoEllipsisVertical";

const Chanel = () => {
  const Bg =
    "https://scontent.fvit1-1.fna.fbcdn.net/v/t39.30808-6/288368479_5078956948868473_6446883941384535955_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=843cd7&_nc_ohc=QVdNmwF0fz0AX9TaBdI&_nc_ht=scontent.fvit1-1.fna&oh=00_AT8WMfSBJToD6yYf9L12f5oau_uE1Cjj6R15cLiUa_GukQ&oe=62D3771B";
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
