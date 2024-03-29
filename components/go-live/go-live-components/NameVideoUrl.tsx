import React, { useState, useRef, useEffect } from "react";
import { IoVideocamOutline } from "@react-icons/all-files/io5/IoVideocamOutline";
import Style from "../../../styles/pages/go-live/go-live-components/name-video-url1.module.css";
import Cookies from "js-cookie";
import FormData from "form-data";
import AxiosPostLogedInFormData from "../../../utils/AxiosPostLogedInFormData";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionVideoDataChanging,
  liveVideoCreate,
} from "../../../redux/video-slice/VideoSlice";
import { useRouter } from "next/router";
import { poPUppRedcuer } from "../../../redux/style-slice/general-style/GenrealStyle";
import TextArea from "../../modals/TextArea";
import InputText from "../../modals/InputText";
import ButtonAndInputAction from "../../modals/ButtonAndInputCopy";
import TopTitle from "../../modals/TopTitle";
import CopyInput from "../../modals/CopyInput";
import BigGrayButton from "../../modals/BigGrayButton";
const NameVideoUrl = ({ VideoLink }: any) => {
  const Channels = useSelector((state: any) => state.ChannelSlice.allChannels);

  const [FileName, setFileName] = useState("");

  const [Uploaded, setUploaded] = useState(false);
  const [videoPath, setVideoPath] = useState("");
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const Router = useRouter();

  const handelCopy = () => {
    navigator.clipboard.writeText(VideoLink);
    dispatch(poPUppRedcuer({ data: "video Linke copied" }));
    setTimeout(() => {
      dispatch(poPUppRedcuer({ data: "" }));
    }, 5000);
  };
  const handelChangeDesc = (e: any) => {
    dispatch(
      ActionVideoDataChanging({
        id: "text_desc",
        text_desc: e.target.value,
      })
    );
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(VideoLink);
    dispatch(poPUppRedcuer({ data: "video  link is copied" }));
    setTimeout(() => {
      dispatch(poPUppRedcuer({ data: "" }));
    }, 5000);
  };

  const handelChangeTitle = (e: any) => {
    setTitle(e.target.value);
    dispatch(
      ActionVideoDataChanging({
        id: "title",
        title: e.target.value,
      })
    );
  };
  const handelCreateVideo = () => {
    dispatch(liveVideoCreate(true));
  };
  return (
    <div className={Style.container}>
      <div className={Style.upload_inputs_container}>
        <div className={Style.video_container_data}>
          <div className={Style.video_container}>
            <div className={Style.video_container_uploaded}>
              <IoVideocamOutline />
            </div>
          </div>
          <div className={Style.video_data}>
            <CopyInput
              HandelClick={copyToClipboard}
              CopiedText={"video link copied"}
              Value={VideoLink}
            />
          </div>
        </div>

        <InputText
          HandelChange={handelChangeTitle}
          Text={"Title"}
          Placeholder="enter your video title"
        />
        <TextArea
          HandelChange={handelChangeDesc}
          Text={"Description"}
          Placeholder="Description"
        />
        <BigGrayButton HandelCopy={handelCreateVideo} Value={"Create video"} />
      </div>
    </div>
  );
};

export default NameVideoUrl;
