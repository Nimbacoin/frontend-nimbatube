import React, { useState, useEffect, useRef } from "react";
import Style from "../../../../styles/pages/watch/leftside/input_comment.module.css";
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
import { useRouter } from "next/router";
import BlueButton from "../../../modals/BlueButton";
import CancelButton from "../../../modals/CancelButton";

const ReplyInput = ({ VideoData }: any) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const CommentsBoolean = useSelector(
    (state: any) => state.MainVideo.CommentsBoolean
  );
  const Channels = useSelector((state: any) => state.ChannelSlice.allChannels);
  const channelsData = Channels?.length ? Channels[0] : {};
  // const socketRedux = useSelector(
  //   (state: any) => state.socketSlice.socketRedux
  // );
  const Bg = channelsData?.channelData?.profileImg?.url
    ? channelsData?.channelData?.profileImg?.url
    : "/images/default-profile.png";

  const handelChangeComment = (e: any) => {
    setComment(e.target.value);
  };
  const handelCreateComments = async (e: any) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }

    if (comment.length >= 1) {
      const body: any = { videoId: VideoData._id, comment: comment };
      await basedPostUrlRequestLogedIn(
        "/api/post/video/comment-video/",
        body
      ).then((res) => {
        if (res) {
          dispatch(
            MainVideoDataReducer({
              message: "comments",
              comments: res.responseData,
            })
          );
          // socketRedux.emit("new-comment", {
          //   comments: res.responseData,
          //   videoId: VideoData._id,
          // });
          setComment("");
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        }
      });
    }
  };
  const HandelCancel = () => {
    setComment("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const { asPath } = useRouter();
  const [streamingVid, setStreamingVid] = useState(false);
  useEffect(() => {
    let Params = new URL(window.location.href).searchParams;
    const video: string | null = Params.get("video");
    const watching: string | null = Params.get("watching");
    const streaming: string | null = Params.get("streaming");
    if (streaming === "true") {
      setStreamingVid(true);
    }
  }, [asPath]);

  useEffect(() => {
    if (document.activeElement === inputRef.current) {
      window.onkeypress = (e: any) => {
        if (document.activeElement === inputRef.current && e.key === "Enter") {
          handelCreateComments(e);
        }
      };
    }
  });

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
          placeholder={"write your comment here"}
        />
        <div className={Style.input_reply_buttons_continer}>
          {comment?.length >= 1 && (
            <CancelButton HandelClick={HandelCancel} Text={"Cancel"} />
          )}
          <BlueButton HandelClick={handelCreateComments} Text={"Comment"} />
        </div>
      </div>
    </div>
  );
};

export default ReplyInput;
