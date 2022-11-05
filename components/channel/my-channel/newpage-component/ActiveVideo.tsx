import React from "react";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import Style from "../../../../styles/pages/channel/my-channel/my-channel-component/active-video.module.css";
import TextArea from "../../../modals/TextArea";
import BlueButton from "../../../modals/BlueButton";
import OtherChannelData from "./OtherChannelData";
const ActiveVideo = ({ Name, Id }: any) => {
  return <div className={Style.container}>
    <div className={Style.container_video}></div>
  </div>;
};

export default ActiveVideo;
