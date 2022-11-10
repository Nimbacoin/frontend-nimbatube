import React, { useState } from "react";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import Style from "../../../../styles/pages/channel/my-channel/my-channel-component/community.module.css";
import TextArea from "../../../modals/TextArea";
import BlueButton from "../../../modals/BlueButton";
import OtherChannelData from "./OtherChannelData";
import basedPostUrlRequestLogedIn from "../../../../utils/basedPostUrlRequestLogedIn";
import EachComment from "../../../watch/watch-page/left-side/EachComment";
import BoldText from "../../../modals/BoldText";
const Community = ({ Name, Id, ChannelData }: any) => {
  console.log(Name, Id);
  const handelChangeDesc = (e: any) => {
    setComment(e.target.value);
  };
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(ChannelData?.community);

  const handelCreateComments = async () => {
    const body: any = { channelId: Id, comment: comment };
    await basedPostUrlRequestLogedIn(
      "/api/post/channel/comment-channel/",
      body
    ).then((res: any) => {
      if (res && res.responseData) {
        setComments(res.responseData);
        setComment("");
      }
    });
  };

  return (
    <div className={Style.container}>
      <div className={Style.main_container}>
        <div className={Style.upload_inputs_container}>
          <TextArea
            Value={comment}
            HandelChange={handelChangeDesc}
            Text={"Comment as " + Name}
            Placeholder="Description"
          />
          <div className={Style.div_button_action}>
            <BlueButton HandelClick={handelCreateComments} Text={"Submit"} />
          </div>
        </div>
        <div className={Style.all_comments_container}>
          <BoldText text={"comments:" + comments.length} />
          {comments?.length
            ? comments.map((comment: any) => (
                <EachComment CommentData={comment} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Community;
