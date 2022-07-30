import React, { useEffect, useRef, useState } from "react";
import Style from "../../../../styles/pages/watch/leftside/main-video.module.css";
import { IoEllipsisHorizontalSharp } from "@react-icons/all-files/io5/IoEllipsisHorizontalSharp";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { AiFillLike } from "@react-icons/all-files/ai/AiFillLike";
import { AiFillDislike } from "@react-icons/all-files/ai/AiFillDislike";

import { AiOutlineDislike } from "@react-icons/all-files/ai/AiOutlineDislike";
import { IoArrowRedoOutline } from "@react-icons/all-files/io5/IoArrowRedoOutline";
import { RiPlayListAddFill } from "@react-icons/all-files/ri/RiPlayListAddFill";
import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { ToggleDescreption } from "../../../../redux/style-slice/video/MainVideo";
import Descreption from "./Descreption";
import Comments from "./Comments";

const MainVideo = () => {
  const vid = React.useRef<HTMLVideoElement | null>(null);

  const dispatch = useDispatch();
  const HandelDescreptionToggle = () => {
    dispatch(ToggleDescreption());
  };

  const Title =
    "ily (i love you baby) - Surf Mesa ft. Emilee - acoustic / vocal (cover)";
  // const videoRef = useRef<HTMLVideoElement>(null);
  const Bg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRDiptnG_Y2jFrhLCByHAi4Pnor9jbFo2Ouw&usqp=CAU";
  const [IsLiked, setIsLiked] = useState(false);
  const [IsDisLiked, setIsDisLiked] = useState(false);

  const HandelLike = () => {
    setIsLiked(!IsLiked);
    setIsDisLiked(false);
  };
  const HandelDisLike = () => {
    setIsLiked(false);
    setIsDisLiked(!IsDisLiked);
  };
  return (
    <div className={Style.container}>
      <div className={Style.video_container}>
        <div className={Style.video_container_2}>
          <video ref={vid} autoPlay muted loop controls>
            <source
              className={Style.video}
              src="https://www.w3schools.com/html/movie.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
      <div className={Style.video_data}>
        <div className={Style.title}>
          <p className={Style.title_text}>{Title}</p>
          <button onClick={HandelDescreptionToggle}>
            <IoIosArrowDown />
          </button>
        </div>
        <div className={Style.data_container}>
          <span className={Style.date}>983,238 views - 19 Apr 2016</span>
          <div className={Style.icons_container}>
            <p className={Style.icon} onClick={HandelLike}>
              {IsLiked ? <AiFillLike /> : <AiOutlineLike />}
              <span className={Style.nubmer_of_likes}>12.5</span>
            </p>
            <p className={Style.icon} onClick={HandelDisLike}>
              {IsDisLiked ? <AiFillDislike /> : <AiOutlineDislike />}
              Dislike
            </p>
            <p className={Style.icon}>
              <IoArrowRedoOutline />
              Share
            </p>
            <p className={Style.icon}>
              <RiPlayListAddFill />
              Save
            </p>
            <p className={Style.icon}>
              <IoEllipsisHorizontalSharp />
            </p>
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
