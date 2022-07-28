import React from "react";
import Style from "../../../../styles/pages/watch/leftside/comments.module.css";
import { MdSort } from "@react-icons/all-files/md/MdSort";
import { AiOutlineDislike } from "@react-icons/all-files/ai/AiOutlineDislike";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { useSelector } from "react-redux";

const Bg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRDiptnG_Y2jFrhLCByHAi4Pnor9jbFo2Ouw&usqp=CAU";
const Comment =
  "Watch Enrique’s new music video ME PASE: https://www.youtube.com/watch?v=JE9ur... On Tour with Ricky Martin and Sebastian Yatra Fall 2021 Tickets are on sale NOW! Details at: https://w";

const EachComment = () => {
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
          <span className={Style.comment_icon}>
            <AiOutlineLike /> 12
          </span>
          <span className={Style.comment_icon}>
            <AiOutlineDislike />
          </span>
          <span className={Style.comment_icon}>REPLY</span>
        </div>{" "}
      </div>
    </div>
  );
};
const ReplyInput = () => {
  return (
    <div className={Style.reply_input_container}>
      <div
        style={{ backgroundImage: `url(${Bg})` }}
        className={Style.img}
      ></div>
      <div className={Style.input_container}>
        <input
          type="text"
          className={Style.reply_input}
          placeholder={"mrbeast write your comment here"}
        />
        <div className={Style.input_reply_continer}>
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
  return (
    <div
      className={CommentsBoolean ? Style.container : Style.container_for_phone}
    >
      <div className={Style.comments_setting}>
        <p className={Style.comments_number}>1000 Comments</p>
        <p className={Style.icon}>
          <MdSort />
          <span className={Style.container}>SORT BY </span>
        </p>
      </div>
      <ReplyInput />
      <div className={Style.all_comments_container}>
        <EachComment />
      </div>
    </div>
  );
};

export default Comments;
