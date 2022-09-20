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
import { MainVideoDataReducer } from "../../../../redux/video-slice/VideoSlice";

const Bg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRDiptnG_Y2jFrhLCByHAi4Pnor9jbFo2Ouw&usqp=CAU";
const ReplyInput = ({ VideoData }: any) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const CommentsBoolean = useSelector(
    (state: any) => state.MainVideo.CommentsBoolean
  );
  const handelChangeComment = (e: any) => {
    setComment(e.target.value);
  };
  const handelCreateComments = async () => {
    const body: any = { videoId: VideoData._id, comment: comment };
    await basedPostUrlRequestLogedIn(
      "/api/post/video/comment-video/",
      body
    ).then((res) => {
      if (res) {
        console.log("comments respionse", res);
        dispatch(
          MainVideoDataReducer({
            message: "comments",
            comments: res.responseData,
          })
        );

        setComment("");
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    });
  };
  const HandelCancel = () => {
    setComment("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  return (
    <div
      className={
        CommentsBoolean
          ? Style.reply_input_container_phone
          : Style.reply_input_container
      }
    >
      <div className={Style.img_container}>
        <div
          style={{ backgroundImage: `url(${Bg})` }}
          className={Style.img}
        ></div>
      </div>
      <div className={Style.input_container}>
        <input
          ref={inputRef}
          onChange={handelChangeComment}
          type="text"
          className={Style.reply_input}
          placeholder={"mrbeast write your comment here"}
        />
        <div className={Style.input_reply_buttons_continer}>
          {comment?.length >= 1 && (
            <button onClick={HandelCancel} className={Style.cancel_btn}>
              Cancel
            </button>
          )}

          <button onClick={handelCreateComments} className={Style.comment_btn}>
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyInput;
