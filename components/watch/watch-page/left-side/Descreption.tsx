import React, { useEffect, useRef } from "react";
import Style from "../../../../styles/pages/watch/leftside/descreption.module.css";
import { IoEllipsisHorizontalSharp } from "@react-icons/all-files/io5/IoEllipsisHorizontalSharp";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import { useDispatch, useSelector } from "react-redux";
import { ToggleDescreption } from "../../../../redux/style-slice/video/MainVideo";

const Descreption = ({ VideoData }: any) => {
  const DescreptionBoolean = useSelector(
    (state: any) => state.MainVideo.DescreptionBoolean
  );
  const dispatch = useDispatch();
  const HandelDescreptionToggle = () => {
    dispatch(ToggleDescreption());
  };
  const Title = VideoData?.title;
  // const videoRef = useRef<HTMLVideoElement>(null);
  const Bg = "/images/default-profile.png";

  return (
    <div
      className={DescreptionBoolean ? Style.container_phone : Style.container}
    >
      <div className={Style.container_descreption_phone}>
        <div className={Style.close_rect}></div>
        <div className={Style.phone_desc_container}>
          <span className={Style.descreption}>Descreption</span>
          <button
            onClick={HandelDescreptionToggle}
            className={Style.close_button}
          >
            <IoCloseOutline />
          </button>
        </div>
      </div>
      <div className={Style.video_data}>
        <span className={Style.title}>{Title}</span>
        <div className={Style.video_data_container}>
          <p className={Style.video_data_items}>
            <strong className={Style.strong_data}>
              {VideoData?.likes?.length}
            </strong>
            <small className={Style.small_data}>Likes</small>
          </p>
          <p className={Style.video_data_items}>
            <strong className={Style.strong_data}>
              {" "}
              {VideoData?.views?.length}
            </strong>
            <small className={Style.small_data}>Views</small>
          </p>
          <p className={Style.video_data_items}>
            <strong className={Style.strong_data}>
              {VideoData?.createdAt}
            </strong>
            <small className={Style.small_data}>2021</small>
          </p>
        </div>
      </div>
      <div className={Style.descreption_text_container}>
        <p className={Style.descreption_text}>{VideoData?.descreption}</p>
      </div>
      <button className={Style.desc_button}>Show More</button>
    </div>
  );
};

export default Descreption;
