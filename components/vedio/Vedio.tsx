import React, { useState } from "react";
import Style from "../../styles/pages/vedio/vedio.module.css";

import { IoEllipsisVertical } from "@react-icons/all-files/io5/IoEllipsisVertical";
import Link from "next/link";
const Vedio = () => {
  const [OverElement, setOverElement] = useState(false);
  const HandelOver = () => {
    setOverElement(true);
  };
  const HandelLeave = () => {
    setOverElement(false);
  };
  const Bg =
    "https://i.ytimg.com/vi/jkngyZjRETs/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCq5lWXE4aLsOyXxZrIHGddeICzIw";
  const Title =
    "ily (i love you baby) - Surf Mesa ft. Emilee - acoustic / vocal (cover)";
  return (
    <Link href={"/"}>
      <div
        onMouseOver={HandelOver}
        onMouseLeave={HandelLeave}
        className={Style.container}
      >
        <div
          style={{ backgroundImage: `url(${Bg})` }}
          className={Style.vedio_container}
        >
          <span className={Style.time}> 5:50</span>
        </div>
        <div className={Style.desc_container}>
          <div className={Style.title_data}>
            <p className={Style.title}>{Title}</p>
            {OverElement && (
              <i className={Style.menu}>
                <IoEllipsisVertical />
              </i>
            )}
          </div>
          <div className={Style.chanel_data}>
            <div
              style={{ backgroundImage: `url(${Bg})` }}
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

export default Vedio;
