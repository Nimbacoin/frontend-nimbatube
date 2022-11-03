import React, { useState, useRef, useEffect } from "react";
import { IoVideocamOutline } from "@react-icons/all-files/io5/IoVideocamOutline";
import Style from "../../../styles/pages/go-live/go-live-components/name-video-url.module.css";
import Cookies from "js-cookie";
import FormData from "form-data";
import AxiosPostLogedInFormData from "../../../utils/AxiosPostLogedInFormData";
import { useDispatch, useSelector } from "react-redux";
import { ActionVideoDataChanging } from "../../../redux/video-slice/VideoSlice";
import { useRouter } from "next/router";
import { poPUppRedcuer } from "../../../redux/style-slice/general-style/GenrealStyle";
import TextArea from "../../modals/TextArea";
import InputText from "../../modals/InputText";
import ButtonAndInputAction from "../../modals/ButtonAndInputCopy";
import TopTitle from "../../modals/TopTitle";
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

  const handelChangeTitle = (e: any) => {
    setTitle(e.target.value);
    dispatch(
      ActionVideoDataChanging({
        id: "title",
        title: e.target.value,
      })
    );
  };
  return (
    <div className={Style.container}>
      <TopTitle />

      <div className={Style.upload_inputs_container}>
        <div className={Style.video_container_data}>
          <div className={Style.video_container}>
            <div className={Style.video_container_uploaded}>
              <IoVideocamOutline />
            </div>
            <p className={Style.upload_file}>
              {title.slice(0, 60)} {title.length >= 60 && "..."}
            </p>
          </div>

          <div className={Style.video_data}>
            {VideoLink.length && <ButtonAndInputAction />}
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
      </div>
    </div>
  );
};

export default NameVideoUrl;
