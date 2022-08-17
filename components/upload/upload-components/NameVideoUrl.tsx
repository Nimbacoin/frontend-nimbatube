import React, { useState, useRef, useEffect } from "react";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import Style from "../../../styles/pages/upload/upload-components/name-video-url.module.css";
import Cookies from "js-cookie";
import FormData from "form-data";
import AxiosPostLogedInFormData from "../../../utils/AxiosPostLogedInFormData";
import { useDispatch, useSelector } from "react-redux";
import { ActionVideoDataChanging } from "../../../redux/video-slice/VideoSlice";
import { useRouter } from "next/router";
const NameVideoUrl = () => {
  const videoSrc = React.useRef<HTMLSourceElement | null>(null);
  const videoTag = React.useRef<HTMLVideoElement | null>(null);
  const Path = useRef(null);
  const Channels = useSelector((state: any) => state.ChannelSlice.allChannels);

  const [FileName, setFileName] = useState("");
  const [VideoLink, setVideoLink] = useState("");
  const [Uploaded, setUploaded] = useState(false);
  const dispatch = useDispatch();
  const Router = useRouter();
  const readVideo = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      Path.current = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      HandelSubmiteNewGeneral();
      reader.onload = function (e: any) {
        if (videoSrc.current) {
          videoSrc.current.src = e.target.result;
          if (videoTag.current) {
            videoTag.current.load();
          }
        }
      };
    }
  };
  const HandelSubmiteNewGeneral = async () => {
    let formData = new FormData();
    if (Path.current) {
      formData.append("channelId", Channels[0]._id);
      formData.append("video", Path.current);
    }
    await AxiosPostLogedInFormData(
      "/api/post/video/create-new-video/",
      formData
    ).then(({ data }) => {
      console.log(data);
      const { file }: any = data;
      if (file.id) {
        dispatch(
          ActionVideoDataChanging({
            id: "video_id",
            video_id: file.id,
          })
        );
      }

      setFileName(file.id);
      setVideoLink(
        process.env.NEXT_PUBLIC_ClIENT_URL +
          "/watch/watch?watching=true&video=" +
          file.filename
      );
      setUploaded(true);
    });
  };

  const handelCopy = () => {
    navigator.clipboard.writeText(VideoLink);
  };
  const handelChange = (e: any) => {
    if (e.target.id === " input_title") {
      dispatch(
        ActionVideoDataChanging({
          id: "input_title",
          input_title: e.target.value,
        })
      );
    } else {
      dispatch(
        ActionVideoDataChanging({
          id: "text_desc",
          text_desc: e.target.value,
        })
      );
    }
  };
  return (
    <div className={Style.container}>
      <div className={Style.upload_container}>
        <IoCloudUploadOutline />
        <p className={Style.upload_file_text}>Upload a file</p>
      </div>

      <div className={Style.upload_inputs_container}>
        {Uploaded ? (
          <div className={Style.video_container_data}>
            <div className={Style.video_container}>
              <video
                controlsList="nodownload"
                className={Style.video}
                ref={videoTag}
                autoPlay
                muted
                loop
                controls
              >
                <source
                  ref={videoSrc}
                  className={Style.video}
                  src="http://localhost:5000/image/aac46b06e3ba088399c675229171d1b0.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <div className={Style.video_data}>
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

              <div className={Style.upload_input}>
                <span className={Style.upload_file}>Filename</span>
                <div className={Style.input_label}>
                  <span className={Style.upload_file_text}>{FileName}</span>
                  <span className={Style.upload_file_text_dots}>...</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={Style.upload_input}>
            <label htmlFor="input_upload" className={Style.input_label}>
              <span className={Style.upload_file_text}>
                Select video, audio or image file to upload
              </span>
              <span className={Style.upload_file_text_dots}>...</span>
              <input
                onChange={readVideo}
                id="input_upload"
                type="file"
                name="video"
                accept="video/mp4"
                className={Style.input_upload}
              />
              <span className={Style.upload_file_button}>Browse</span>
            </label>

            <p className={Style.text}>
              For video content, use MP4s in H264/AAC format and a friendly
              bitrate (under 8 Mbps) for more reliable streaming. NimbaTube
              uploads are restricted to 16 GB. Upload Guide{" "}
            </p>
          </div>
        )}
        <div className={Style.upload_input}>
          <p className={Style.upload_file}>Tilte</p>
          <label htmlFor="input_title" className={Style.input_label}>
            <input
              id="input_title"
              onChange={handelChange}
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
              onChange={handelChange}
              className={Style.text_desc}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default NameVideoUrl;
