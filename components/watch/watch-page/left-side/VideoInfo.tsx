import React, { useEffect, useRef, useState } from "react";
import Style from "../../../../styles/pages/watch/leftside/video-info.module.css";
import { IoEllipsisHorizontalSharp } from "@react-icons/all-files/io5/IoEllipsisHorizontalSharp";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { AiFillLike } from "@react-icons/all-files/ai/AiFillLike";
import moment from "moment";
import { AiFillDislike } from "@react-icons/all-files/ai/AiFillDislike";
import { AiOutlineDislike } from "@react-icons/all-files/ai/AiOutlineDislike";
import { IoArrowRedoOutline } from "@react-icons/all-files/io5/IoArrowRedoOutline";
import { RiPlayListAddFill } from "@react-icons/all-files/ri/RiPlayListAddFill";
import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";
import { FcCircuit } from "@react-icons/all-files/fc/FcCircuit";
import { GoCommentDiscussion } from "@react-icons/all-files/go/GoCommentDiscussion";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

import { useDispatch, useSelector } from "react-redux";
import { ToggleDescreption } from "../../../../redux/style-slice/video/MainVideo";
import { useRouter } from "next/router";
import basedPostUrlRequestLogedIn from "../../../../utils/basedPostUrlRequestLogedIn";
import {
  copyLinkRedcuer,
  playListRedcuer,
} from "../../../../redux/style-slice/general-style/GenrealStyle";
import GoogleIcon from "../../../modals/GoogleIcon";

const VideoInfo = ({ ActiveVideoStream }: any) => {
  const videoData = useSelector(
    (state: any) => state.VideoSlice.mainVideoDataWatch?.responseData
  );
  const Router = useRouter();

  const userSignIn = useSelector((state: any) => state.UserSignIn.userdata);
  const [videoId, setVideoId] = useState<string>(videoData?._id);
  const dispatch = useDispatch();
  const [videoLikes, setVideoLikes] = useState<number>(videoData?.likes?.likes);
  const [videoDisLikes, setVideoDisLikes] = useState<number>(
    videoData?.disLikes?.disLikes
  );

  const [IsLiked, setIsLiked] = useState(videoData?.likes?.liked);

  const [IsDisLiked, setIsDisLiked] = useState(videoData?.disLikes?.isDisLiked);
  let like = IsLiked;
  let disLike = IsDisLiked;

  const HandelDescreptionToggle = () => {
    dispatch(ToggleDescreption());
  };

  const likesHandeler = async (body: any) => {
    const userId = userSignIn.email;
    if (userId) {
      await basedPostUrlRequestLogedIn(
        "/api/post/video/like-video/",
        body
      ).then(({ responseData }) => {
        if (responseData) {
          if (responseData) {
            setVideoLikes(responseData?.likes?.likes);
            setIsLiked(responseData?.likes?.liked);
            setVideoDisLikes(responseData?.disLikes?.disLikes);
            setIsDisLiked(responseData?.disLikes?.isDisLiked);
          }
        }
      });
    } else {
      Router.push("/auth/sign-in");
    }
  };
  const HandelLike = async () => {
    setIsLiked(!IsLiked);
    setIsDisLiked(false);
    like = !like;
    disLike = false;
    const body: any = { IsLiked: like, IsDisLiked: disLike, videoId };
    likesHandeler(body);
  };

  const HandelDisLike = () => {
    setIsLiked(false);
    setIsDisLiked(!IsDisLiked);
    like = false;
    disLike = !disLike;
    const body: any = { IsLiked: like, IsDisLiked: disLike, videoId };
    likesHandeler(body);
  };

  const handelShareVideo = () => {
    dispatch(copyLinkRedcuer({ value: "true" }));
  };
  const handelPlayList = () => {
    dispatch(playListRedcuer({ value: "true" }));
  };
  var check = moment(videoData?.createdAt, "YYYY/MM/DD");
  var month = check.format("M");
  const Svggg = (
    <svg
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      className="style-scope yt-icon"
      style="pointer-events: none; display: block; width: 100%; height: 100%;"
    >
      <g mirror-in-rtl="" className="style-scope yt-icon">
        <path
          d="M15,5.63L20.66,12L15,18.37V15v-1h-1c-3.96,0-7.14,1-9.75,3.09c1.84-4.07,5.11-6.4,9.89-7.1L15,9.86V9V5.63 M14,3v6 C6.22,10.13,3.11,15.33,2,21c2.78-3.97,6.44-6,12-6v6l8-9L14,3L14,3z"
          className="style-scope yt-icon"
        ></path>
      </g>
    </svg>
  );

  return (
    <div className={Style.video_data}>
      <div className={Style.title}>
        <p className={Style.title_text}>{videoData?.title}</p>
        <button onClick={HandelDescreptionToggle}>
          <IoIosArrowDown />
        </button>
      </div>
      <span className={Style.date_phone}>
        {videoData?.views?.length} views -{" "}
        {moment(videoData?.createdAt).startOf("hour").fromNow()}
      </span>
      <div className={Style.data_container}>
        <span className={Style.date}>
          {videoData?.views?.length} views -{" "}
          {moment(videoData?.createdAt).startOf("hour").fromNow()}
        </span>
        <div className={Style.icons_container}>
          <p className={Style.icon} onClick={HandelLike}>
            {IsLiked ? (
              <GoogleIcon Fill={true} IconName={"thumb_up_off"} />
            ) : (
              <GoogleIcon IconName={"thumb_up_off"} />
            )}
            <span className={Style.nubmer_of_likes}>{videoLikes}</span>
          </p>
          <p className={Style.icon} onClick={HandelDisLike}>
            {IsDisLiked ? (
              <GoogleIcon Fill={true} IconName={"thumb_down_off"} />
            ) : (
              <GoogleIcon IconName={"thumb_down_off"} />
            )}
            {/* <span className={Style.disLike}> {videoDisLikes}</span> */}
          </p>
          {!ActiveVideoStream && (
            <p className={Style.icon_comments}>
              <GoCommentDiscussion />
              <span className={Style.live_chat}>Live Chat</span>
            </p>
          )}

          <p className={Style.icon}>
            <FcCircuit />
            Support
          </p>
          <p onClick={handelShareVideo} className={Style.icon}>
            <IoArrowRedoOutline />
            Share
          </p>
          <p onClick={handelPlayList} className={Style.icon}>
            <GoogleIcon IconName={"playlist_add"} />
            Save
          </p>
          <p className={Style.icon}>
            <IoEllipsisHorizontalSharp />
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
