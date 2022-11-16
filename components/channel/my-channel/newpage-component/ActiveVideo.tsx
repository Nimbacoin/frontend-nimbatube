import React from "react";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import Style from "../../../../styles/pages/channel/my-channel/my-channel-component/active-video.module.css";
import TextArea from "../../../modals/TextArea";
import BlueButton from "../../../modals/BlueButton";
import OtherChannelData from "./OtherChannelData";
import SmallTextBlack from "../../../modals/SmallTextBlack";
import TextTilteInputMudum from "../../../modals/text/TextTilteInputMudum";
const ActiveVideo = ({ Name, Id, VideoData }: any) => {
  return (
    <div className={Style.container}>
      <div className={Style.container_video}>
        <video className={Style.video_tag} muted autoPlay controls loop>
          <source
            src={VideoData.videoData.location}
            className={Style.video}
            type="video/mp4"
          />
        </video>
      </div>
      <div className={Style.container_video_data}>
        <TextTilteInputMudum Text={VideoData.videoData.title} />
        <SmallTextBlack Text={VideoData.videoData.descreption} />
      </div>
    </div>
  );
};

export default ActiveVideo;
