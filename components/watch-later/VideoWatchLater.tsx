import React from "react";
import Style from "../../styles/pages/watch-later/video-watch-later.module.css";
import { IoEllipsisVertical } from "@react-icons/all-files/io5/IoEllipsisVertical";

const VideoWatchLater = () => {
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
        <span className={Style.time}> 5:50</span>
      </div>
      <div className={Style.video_date_containe}>
        <span className={Style.chanel_name}>
          If any producer or label has an issue with any of the uploads
        </span>
        <div className={Style.chanel_container}>
          <div
            style={{ backgroundImage: `url(${Bg})` }}
            className={Style.img}
          ></div>
          <p className={Style.chanel_followers}>
            <span className={Style.username}>MrBeast</span>
            <span className={Style.Followers}>20 Days Ago</span>
          </p>
        </div>
      </div>
      <div className={Style.right_container}>
        <button className={Style.IoEllipsisVertical}>
          <IoEllipsisVertical />
        </button>
      </div>
    </div>
  );
};

export default VideoWatchLater;
