import React, { useEffect, useRef } from "react";
import Style from "../../../../styles/pages/watch/leftside/main-video.module.css";
import { IoEllipsisHorizontalSharp } from "@react-icons/all-files/io5/IoEllipsisHorizontalSharp";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { AiOutlineDislike } from "@react-icons/all-files/ai/AiOutlineDislike";
import { IoArrowRedoOutline } from "@react-icons/all-files/io5/IoArrowRedoOutline";
import { RiPlayListAddFill } from "@react-icons/all-files/ri/RiPlayListAddFill";
import Descreption from "./Descreption";
import Comments from "./Comments";

const MainVideo = () => {
  const vid = React.useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (vid.current !== null) {
      const Height = vid.current.videoHeight;
      const Width = vid.current.videoWidth;
      // alert(Height);
      // alert(Width);
      vid.current.style.minHeight = "500px";
    }
  }, [vid]);
  const Title =
    "ily (i love you baby) - Surf Mesa ft. Emilee - acoustic / vocal (cover)";
  // const videoRef = useRef<HTMLVideoElement>(null);
  const Bg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRDiptnG_Y2jFrhLCByHAi4Pnor9jbFo2Ouw&usqp=CAU";
  return (
    <div className={Style.container}>
      <div className={Style.video_container}>
        <video ref={vid} autoPlay muted loop controls>
          <source
            className={Style.video}
            src="https://www.w3schools.com/html/movie.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className={Style.video_data}>
        <p className={Style.title}>{Title}</p>
        <div className={Style.data_container}>
          <span className={Style.date}>983,238 views - 19 Apr 2016</span>
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
      <Descreption />
      <Comments />
    </div>
  );
};

export default MainVideo;
