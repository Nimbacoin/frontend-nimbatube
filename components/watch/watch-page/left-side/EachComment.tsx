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

const EachComment = ({ CommentData, Key }: any) => {
  const Bg = CommentData?.creatoreData?.profileImg?.url;
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
    <div className={Style.chanel}>
      <div
        style={{ backgroundImage: `url(${Bg})` }}
        className={Style.img}
      ></div>
      <div className={Style.chanel_container}>
        <div className={Style.comment_info}>
          <span className={Style.chanel_name}>
            {CommentData?.creatoreData?.name}
          </span>{" "}
          <span className={Style.date}>
            {moment(CommentData?.commentData?.createdAt)
              .startOf("hour")
              .fromNow()}{" "}
          </span>
        </div>
        <div className={Style.all_comments}>
          <span className={Style.comment}>
            {CommentData?.commentData?.comment}
          </span>{" "}
        </div>
        {/* <div className={Style.comment_actions}>
            <span className={Style.comment_icon} onClick={HandelLike}>
              {IsLiked ? <AiFillLike /> : <AiOutlineLike />}
              12
            </span>
            <span className={Style.comment_icon} onClick={HandelDisLike}>
              {IsDisLiked ? <AiFillDislike /> : <AiOutlineDislike />}
            </span>
            <span className={Style.comment_icon}>REPLY</span>
          </div>{" "} */}
      </div>
    </div>
  );
};
export default EachComment;
