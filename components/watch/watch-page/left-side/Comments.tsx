import React from "react";
import Style from "../../../../styles/pages/watch/leftside/comments.module.css";
import { MdSort } from "@react-icons/all-files/md/MdSort";
import { AiOutlineDislike } from "@react-icons/all-files/ai/AiOutlineDislike";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
const Bg =
  "https://scontent.fvit1-1.fna.fbcdn.net/v/t39.30808-6/288368479_5078956948868473_6446883941384535955_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=843cd7&_nc_ohc=QVdNmwF0fz0AX9TaBdI&_nc_ht=scontent.fvit1-1.fna&oh=00_AT8WMfSBJToD6yYf9L12f5oau_uE1Cjj6R15cLiUa_GukQ&oe=62D3771B";
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
  return (
    <div className={Style.container}>
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
