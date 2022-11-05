import React from "react";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import Style from "../../../../styles/pages/channel/my-channel/my-channel-component/active-video.module.css";
import TextArea from "../../../modals/TextArea";
import BlueButton from "../../../modals/BlueButton";
import OtherChannelData from "./OtherChannelData";
import SmallTextBlack from "../../../modals/SmallTextBlack";
const ActiveVideo = ({ Name, Id }: any) => {
  return (
    <div className={Style.container}>
      <div className={Style.container_video}>
        <video className={Style.video_tag} muted autoPlay controls loop>
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            className={Style.video}
            type="video/mp4"
          />
        </video>
      </div>
      <div className={Style.container_video_data}>
        <SmallTextBlack Text="Shawn Mendes, Tainy - Summer Of Love (Official Music Video)" />
      </div>
    </div>
  );
};

export default ActiveVideo;
