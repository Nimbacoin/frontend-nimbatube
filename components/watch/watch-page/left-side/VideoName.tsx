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

const VideoName = ({ ActiveVideoStream }: any) => {
  const videoData = useSelector(
    (state: any) => state.VideoSlice.mainVideoDataWatch?.responseData
  );
  const Router = useRouter();
  const [SendDate, setSendDate] = useState("00:00");
  useEffect(() => {
    setSendDate(moment(videoData?.createdAt).format("LT"));
    setInterval(function () {
      setSendDate(moment(videoData?.createdAt).format("LT"));
    }, 5000);
  }, []);
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

  return (
    <div className={Style.video_data}>
      <div className={Style.title}>
        <p className={Style.title_text}>{videoData?.title}</p>
        <button onClick={HandelDescreptionToggle}>
          <IoIosArrowDown />
        </button>
      </div>
      {/* <span className={Style.date_phone}>
        {videoData?.views?.length} views - {SendDate}
      </span>
      <span className={Style.date}>
        {videoData?.views?.length} views - {SendDate}
      </span> */}
    </div>
  );
};

export default VideoName;
