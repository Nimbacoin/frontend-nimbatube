import React, { useState, useEffect } from "react";
import Style from "../../../../styles/pages/watch/leftside/comments.module.css";
import { MdSort } from "@react-icons/all-files/md/MdSort";
import { AiOutlineDislike } from "@react-icons/all-files/ai/AiOutlineDislike";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { useDispatch, useSelector } from "react-redux";
import {
  ToggleCommentsOpen,
  ToggleCommentsClose,
} from "../../../../redux/style-slice/video/MainVideo";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import { AiFillLike } from "@react-icons/all-files/ai/AiFillLike";
import { AiFillDislike } from "@react-icons/all-files/ai/AiFillDislike";
import { IoChevronDown } from "@react-icons/all-files/io5/IoChevronDown";
import { IoChevronUp } from "@react-icons/all-files/io5/IoChevronUp";

const Bg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRDiptnG_Y2jFrhLCByHAi4Pnor9jbFo2Ouw&usqp=CAU";
const Comment =
  "Watch Enrique’s new music video ME PASE: https://www.youtube.com/watch?v=JE9ur... On Tour with Ricky Martin and Sebastian Yatra Fall 2021 Tickets are on sale NOW! Details at: https://w";

const EachComment = () => {
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
          <span className={Style.chanel_name}>MrBeast</span>{" "}
          <span className={Style.date}>10 Years Ago</span>
        </div>
        <div className={Style.all_comments}>
          <span className={Style.comment}>{Comment}</span>{" "}
        </div>
        <div className={Style.comment_actions}>
          <span className={Style.comment_icon} onClick={HandelLike}>
            {IsLiked ? <AiFillLike /> : <AiOutlineLike />}
            12
          </span>
          <span className={Style.comment_icon} onClick={HandelDisLike}>
            {IsDisLiked ? <AiFillDislike /> : <AiOutlineDislike />}
          </span>
          <span className={Style.comment_icon}>REPLY</span>
        </div>{" "}
      </div>
    </div>
  );
};
const ReplyInput = () => {
  const CommentsBoolean = useSelector(
    (state: any) => state.MainVideo.CommentsBoolean
  );
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
          type="text"
          className={Style.reply_input}
          placeholder={"mrbeast write your comment here"}
        />
        <div className={Style.input_reply_buttons_continer}>
          <button className={Style.cancel_btn}>Cancel</button>
          <button className={Style.comment_btn}>Comment</button>
        </div>
      </div>
    </div>
  );
};

const Comments = () => {
  const CommentsBoolean = useSelector(
    (state: any) => state.MainVideo.CommentsBoolean
  );
  const dispatch = useDispatch();
  useEffect(() => {
    CommentsBoolean
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "auto");
  });
  return (
    <div className={CommentsBoolean ? Style.container_phone : Style.container}>
      {!CommentsBoolean && (
        <label
          className={Style.lable_open_all_comments}
          htmlFor="input_open_all_comments"
        >
          Comments · 455
          <input
            onClick={() => dispatch(ToggleCommentsOpen())}
            className={Style.input_open_all_comments}
            id="input_open_all_comments"
            type="text"
          />
          <span className={Style.arrows}>
            <IoChevronUp />
            <IoChevronDown />
          </span>
        </label>
      )}
      {CommentsBoolean && (
        <div className={Style.container_descreption_phone}>
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
        <p className={Style.comments_number}>1000 Comments</p>
        <p className={Style.icon}>
          <MdSort />
          <span className={Style.container}>SORT BY </span>
        </p>
      </div>
      <ReplyInput />
      <div
        className={
          CommentsBoolean
            ? Style.all_comments_container_phone
            : Style.all_comments_container
        }
      >
        <EachComment />
        <EachComment />
        <EachComment />
        <EachComment />
        <EachComment />
        <EachComment />
        <EachComment />
        <EachComment />
        <EachComment />
        <EachComment />
        <EachComment />
      </div>
    </div>
  );
};

export default Comments;
