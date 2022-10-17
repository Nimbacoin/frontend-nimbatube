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
      <div className={Style.upload_container}>
        <IoVideocamOutline />
        <p className={Style.upload_file_text}>Go Live</p>
      </div>

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
            {VideoLink.length && (
              <div className={Style.upload_input}>
                <p className={Style.upload_file}>Video link</p>
                <div className={Style.input_label}>
                  <span className={Style.upload_file_text}>{VideoLink}</span>
                  <span
                    className={Style.upload_file_button}
                    onClick={handelCopy}
                  >
                    Copy
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={Style.upload_input}></div>
        <div className={Style.upload_input}>
          <p className={Style.upload_file}>Tilte</p>
          <label htmlFor="title" className={Style.input_label}>
            <input
              id="title"
              onChange={handelChangeTitle}
              type="text"
              className={Style.input_title}
            />
          </label>
        </div>
        <div className={Style.upload_input}>
          <p className={Style.upload_file}>Description</p>
          <label htmlFor="text_desc" className={Style.label_description}>
            <textarea
              id="text_desc"
              onChange={handelChangeDesc}
              className={Style.text_desc}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default NameVideoUrl;
