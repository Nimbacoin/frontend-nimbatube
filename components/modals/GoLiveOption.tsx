import React, { useState, useEffect, useRef } from "react";
import Style from "../../styles/pages/watch/leftside/comments.module.css";
import { MdSort } from "@react-icons/all-files/md/MdSort";
import { AiOutlineDislike } from "@react-icons/all-files/ai/AiOutlineDislike";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import { AiFillLike } from "@react-icons/all-files/ai/AiFillLike";
import { AiFillDislike } from "@react-icons/all-files/ai/AiFillDislike";
import { IoChevronDown } from "@react-icons/all-files/io5/IoChevronDown";
import { IoChevronUp } from "@react-icons/all-files/io5/IoChevronUp";
import TextTilteInputMudum from "./TextTilteInputMudum";
import { ToggleCommentsClose } from "../../redux/style-slice/video/MainVideo";

//--------------------------------------ReplyInput----------------------------------------------//

//--------------------------------------comments----------------------------------------------//
const GoLiveOption = ({ VideoData }: any) => {
  const videoData = useSelector(
    (state: any) => state.VideoSlice.mainVideoDataWatch?.responseData
  );

  const CommentsBoolean = useSelector(
    (state: any) => state.MainVideo.CommentsBoolean
  );
  const dispatch = useDispatch();
  useEffect(() => {
    CommentsBoolean
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "auto");
  });
  // console.log(videoData?.comments);

  return (
    <div className={CommentsBoolean ? Style.container_phone : Style.container}>
      {CommentsBoolean && (
        <div
          onTouchMove={() => dispatch(ToggleCommentsClose())}
          className={Style.container_descreption_phone}
        >
          <div className={Style.close_rect}></div>
          <div className={Style.phone_desc_container}>
            <span className={Style.descreption}>Comments</span>
            <button
              onClick={() => dispatch(ToggleCommentsClose())}
              className={Style.close_button}
            >
              <IoCloseOutline />
            </button>
          </div>
        </div>
      )}
      <div className={Style.comments_setting}></div>
    </div>
  );
};

export default GoLiveOption;
