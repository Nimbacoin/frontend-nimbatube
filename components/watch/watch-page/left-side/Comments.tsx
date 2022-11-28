import React, { useState, useEffect, useRef } from "react";
import Style from "../../../../styles/pages/watch/leftside/comments.module.css";
import { MdSort } from "@react-icons/all-files/md/MdSort";
import { AiOutlineDislike } from "@react-icons/all-files/ai/AiOutlineDislike";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { useDispatch, useSelector } from "react-redux";
import {
  ToggleCommentsOpen,
  ToggleCommentsClose,
} from "../../../../redux/style-slice/video/MainVideo";
import moment from "moment";

import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import { AiFillLike } from "@react-icons/all-files/ai/AiFillLike";
import { AiFillDislike } from "@react-icons/all-files/ai/AiFillDislike";
import { IoChevronDown } from "@react-icons/all-files/io5/IoChevronDown";
import { IoChevronUp } from "@react-icons/all-files/io5/IoChevronUp";
import basedPostUrlRequestLogedIn from "../../../../utils/basedPostUrlRequestLogedIn";
import ReplyInput from "./ReplyInput";
import EachComment from "./EachComment";
import LoaodingAll from "../../../modals/LoaodingAll";
import TextTilteInputMudum from "../../../modals/text/TextTilteInputMudum";
import BoldText from "../../../modals/BoldText";

//--------------------------------------ReplyInput----------------------------------------------//

//--------------------------------------comments----------------------------------------------//
const Comments = ({ VideoData }: any) => {
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
      {!CommentsBoolean && (
        <div className={Style.container_conmments}>
          <label
            className={Style.lable_open_all_comments}
            htmlFor="input_open_all_comments"
          >
            <TextTilteInputMudum
              Text={"Comments:" + videoData?.comments?.length}
            />

            <input
              onClick={() => dispatch(ToggleCommentsOpen())}
              className={Style.input_open_all_comments}
              id="input_open_all_comments"
              type="text"
            />
            <input
              placeholder="write your comment here"
              onClick={() => dispatch(ToggleCommentsOpen())}
              className={Style.div_input_comment}
            />
          </label>
        </div>
      )}
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
      <div className={Style.comments_setting}>
        <TextTilteInputMudum Text={videoData?.comments?.length + " Comments"} />
      </div>
      <ReplyInput VideoData={videoData} />
      <div
        className={
          CommentsBoolean
            ? Style.all_comments_container_phone
            : Style.all_comments_container
        }
      >
        {videoData?.comments?.length
          ? videoData?.comments.map((comment: any) => (
              <EachComment CommentData={comment} />
            ))
          : null}
      </div>
      <div className={Style.div_laoding_comments}>
        <LoaodingAll />
      </div>
    </div>
  );
};

export default Comments;
