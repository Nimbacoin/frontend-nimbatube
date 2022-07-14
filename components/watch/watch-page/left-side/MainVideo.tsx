import React, { useEffect, useRef } from "react";
import Style from "../../../../styles/pages/watch/leftside/main-video.module.css";
import { IoEllipsisHorizontalSharp } from "@react-icons/all-files/io5/IoEllipsisHorizontalSharp";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { AiOutlineDislike } from "@react-icons/all-files/ai/AiOutlineDislike";
import { IoArrowRedoOutline } from "@react-icons/all-files/io5/IoArrowRedoOutline";
import { RiPlayListAddFill } from "@react-icons/all-files/ri/RiPlayListAddFill";

const MainVideo = () => {
  const Title =
    "ily (i love you baby) - Surf Mesa ft. Emilee - acoustic / vocal (cover)";
  // const videoRef = useRef<HTMLVideoElement>(null);
  const Bg =
    "https://scontent.fvit1-1.fna.fbcdn.net/v/t39.30808-6/288368479_5078956948868473_6446883941384535955_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=843cd7&_nc_ohc=QVdNmwF0fz0AX9TaBdI&_nc_ht=scontent.fvit1-1.fna&oh=00_AT8WMfSBJToD6yYf9L12f5oau_uE1Cjj6R15cLiUa_GukQ&oe=62D3771B";

  return (
    <div className={Style.container}>
      <div className={Style.video_container}>
        <iframe
          frameBorder="0"
          allowFullScreen={true}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title={Title}
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/yI12AC94ado?autoplay=1&amp;mute=0&amp;controls=1&amp;origin=http%3A%2F%2Flocalhost%3A3000&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=3"
          id="widget4"
        ></iframe>
      </div>
      <div className={Style.video_data}>
        <p className={Style.title}>{Title}</p>
        <div className={Style.data_container}>
          <span className={Style.followers}>983,238 views - 19 Apr 2016</span>
          <div className={Style.icons_container}>
            <span className={Style.icon}>
              <AiOutlineLike />
              Like
            </span>
            <span className={Style.icon}>
              <AiOutlineDislike />
              Dislike
            </span>
            <span className={Style.icon}>
              <IoArrowRedoOutline />
              Share
            </span>
            <span className={Style.icon}>
              <RiPlayListAddFill />
              Save
            </span>
            <span className={Style.icon}>
              <IoEllipsisHorizontalSharp />
            </span>
          </div>
        </div>
      </div>
      <div className={Style.chanel}>
        <div
          style={{ backgroundImage: `url(${Bg})` }}
          className={Style.img}
        ></div>
        <div className={Style.chanel_container}>
          <span className={Style.chanel_name}>MrBeast</span>
          <p className={Style.chanel_followers}>
            <span className={Style.Followers}>100 Followers</span>
          </p>
        </div>
        <div className={Style.right_container}>
          <button className={Style.follow_button}>Follow</button>
        </div>
      </div>
    </div>
  );
};

export default MainVideo;
