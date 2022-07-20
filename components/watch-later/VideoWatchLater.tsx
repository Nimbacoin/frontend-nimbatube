import React from "react";
import Style from "../../styles/pages/watch-later/video-watch-later.module.css";
import { IoEllipsisVertical } from "@react-icons/all-files/io5/IoEllipsisVertical";

const VideoWatchLater = () => {
  const Bg =
    "https://scontent.fvit1-1.fna.fbcdn.net/v/t39.30808-6/288368479_5078956948868473_6446883941384535955_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=843cd7&_nc_ohc=QVdNmwF0fz0AX9TaBdI&_nc_ht=scontent.fvit1-1.fna&oh=00_AT8WMfSBJToD6yYf9L12f5oau_uE1Cjj6R15cLiUa_GukQ&oe=62D3771B";
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
