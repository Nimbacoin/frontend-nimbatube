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
import { ContainerEffectedClick } from "./VideoInfo";

export const VideoInfoIconsAll = () => {
  const dispatch = useDispatch();
  const handelShareVideo = () => {
    dispatch(copyLinkRedcuer({ value: "true" }));
  };
  const handelPlayList = () => {
    dispatch(playListRedcuer({ value: "true" }));
  };

  const videoData = useSelector(
    (state: any) => state.VideoSlice.mainVideoDataWatch?.responseData
  );
  return (
    <div className={Style.container__right}>
      {!ActiveVideoStream && (
        <ContainerEffectedClick Stylied={true} style={{ borderRadius: "20px" }}>
          <p className={Style.icon_comments}>
            {/* <GoCommentDiscussion /> */}
            <GoogleIcon IconName={"forum"} />
            <span className={Style.live_chat}>Live Chat</span>
          </p>
        </ContainerEffectedClick>
      )}
      <ContainerEffectedClick Stylied={true} style={{ borderRadius: "20px" }}>
        <p className={Style.icon_2}>
          <FcCircuit />

          <span className={Style.nubmer_of_likes}>Support</span>
        </p>
      </ContainerEffectedClick>

      <ContainerEffectedClick Stylied={true} style={{ borderRadius: "20px" }}>
        <p onClick={handelShareVideo} className={Style.icon_2}>
          <IoArrowRedoOutline />
          <span className={Style.nubmer_of_likes}>Share</span>
        </p>
      </ContainerEffectedClick>
      <ContainerEffectedClick Stylied={true} style={{ borderRadius: "20px" }}>
        <p onClick={handelPlayList} className={Style.icon_2}>
          <GoogleIcon IconName={"playlist_add"} />
          <span className={Style.nubmer_of_likes}>Save</span>
        </p>
      </ContainerEffectedClick>
      <ContainerEffectedClick Stylied={true} style={{ borderRadius: "20px" }}>
        <p className={Style.icon_2}>
          <IoEllipsisHorizontalSharp />
        </p>
      </ContainerEffectedClick>
    </div>
  );
};
