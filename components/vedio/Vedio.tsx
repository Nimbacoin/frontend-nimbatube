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
    "https://scontent.fvit1-1.fna.fbcdn.net/v/t39.30808-6/288368479_5078956948868473_6446883941384535955_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=843cd7&_nc_ohc=QVdNmwF0fz0AX9TaBdI&_nc_ht=scontent.fvit1-1.fna&oh=00_AT8WMfSBJToD6yYf9L12f5oau_uE1Cjj6R15cLiUa_GukQ&oe=62D3771B";
  const Title =
    "ily (i love you baby) - Surf Mesa ft. Emilee - acoustic / vocal (cover)";
  return (
    <Link href="/watch/ids">
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
            <i
              style={{ color: `${OverElement ? "#030303" : "#F9F9F9"}` }}
              className={Style.menu}
            >
              <IoEllipsisVertical />
            </i>
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
