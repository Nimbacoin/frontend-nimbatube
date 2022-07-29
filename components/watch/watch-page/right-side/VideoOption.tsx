import React, { useEffect, useRef } from "react";
import Style from "../../../../styles/pages/watch/rightside/video-option.module.css";
import { IoEllipsisVerticalSharp } from "@react-icons/all-files/io5/IoEllipsisVerticalSharp";

const VideoOption = () => {
  const Title =
    "ily (i love you baby) - Surf Mesa ft. Emilee - acoustic / vocal (cover)";
  // const videoRef = useRef<HTMLVideoElement>(null);
  const Bg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRDiptnG_Y2jFrhLCByHAi4Pnor9jbFo2Ouw&usqp=CAU";
  return (
    <div className={Style.container}>
      <div className={Style.video_container}>
        <video width="100%" height="30px" autoPlay muted loop>
          <source
            src="https://www.w3schools.com/html/movie.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className={Style.chanel_data}>
        <h3 className={Style.title}>{Title}</h3>
        <div className={Style.chanel_data_container}>
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
      <span className={Style.icon}>
        <IoEllipsisVerticalSharp />
      </span>
    </div>
  );
};

export default VideoOption;
