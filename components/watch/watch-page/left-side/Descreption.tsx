import React, { useEffect, useRef, useState } from "react";
import Style from "../../../../styles/pages/watch/leftside/descreption.module.css";
import { IoEllipsisHorizontalSharp } from "@react-icons/all-files/io5/IoEllipsisHorizontalSharp";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import { useDispatch, useSelector } from "react-redux";
import { ToggleDescreption } from "../../../../redux/style-slice/video/MainVideo";
import moment from "moment";

const Descreption = ({ VideoData }: any) => {
  const videoData = useSelector(
    (state: any) => state.VideoSlice.mainVideoDataWatch?.responseData
  );
  const [videoLikes, setVideoLikes] = useState<number>(videoData?.likes?.likes);
  const DescreptionBoolean = useSelector(
    (state: any) => state.MainVideo.DescreptionBoolean
  );
  const [mainTexDesc, setMainTexDesc] = useState(
    VideoData?.descreption.slice(0, 350)
  );
  const dispatch = useDispatch();
  const HandelDescreptionToggle = () => {
    dispatch(ToggleDescreption());
  };
  const Title = VideoData?.title;
  // const videoRef = useRef<HTMLVideoElement>(null);
  const Bg = "/images/default-profile.png";
  var check = moment(VideoData?.createdAt, "YYYY/MM/DD");
  var month = check.format("M");
  var year = check.format("YYYY");
  const handelShowAllDesc = () => {
    setMainTexDesc(VideoData?.descreption);
  };
  return (
    <div
      className={DescreptionBoolean ? Style.container_phone : Style.container}
    >
      <div
        onTouchMove={HandelDescreptionToggle}
        className={Style.container_descreption_phone}
      >
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
            <strong className={Style.strong_data}>{videoLikes}</strong>
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
              {moment(VideoData?.createdAt).startOf("hour").fromNow()}
            </strong>
            <small className={Style.small_data}>{year}</small>
          </p>
        </div>
      </div>
      <div className={Style.descreption_text_container}>
        <p className={Style.descreption_text}>{mainTexDesc}</p>
      </div>
      {VideoData?.descreption?.length >= 351 && (
        <button onClick={handelShowAllDesc} className={Style.desc_button}>
          Show More
        </button>
      )}
    </div>
  );
};

export default Descreption;
