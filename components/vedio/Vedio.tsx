import React, { useEffect, useState } from "react";
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
  const [ScreenWithByHalf, setScreenWithByHalf] = useState(500);
  const [IsPhone, setIsPhone] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 900) {
      setIsPhone(true);
      setScreenWithByHalf(window.innerWidth / 2);
    } else if (window.innerWidth > 900) {
      setIsPhone(false);
    }
    window.onresize = () => {
      if (window.innerWidth <= 900) {
        setIsPhone(true);
        setScreenWithByHalf(window.innerWidth / 2);
      } else if (window.innerWidth > 900) {
        setIsPhone(false);
      }
    };
  });
  const Bg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRDiptnG_Y2jFrhLCByHAi4Pnor9jbFo2Ouw&usqp=CAU";
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
          style={{
            backgroundImage: `url(${Bg})`,
            minHeight: `${IsPhone && ScreenWithByHalf}px`,
          }}
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
