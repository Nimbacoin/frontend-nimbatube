import React, { useState, useRef, useEffect } from "react";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import Style from "../../../styles/pages/upload/upload-components/name-video-url.module.css";
import Cookies from "js-cookie";
import FormData from "form-data";
import AxiosPostLogedInFormData from "../../../utils/AxiosPostLogedInFormData";
import { useDispatch, useSelector } from "react-redux";
import { ActionVideoDataChanging } from "../../../redux/video-slice/VideoSlice";
import { useRouter } from "next/router";
import InputText from "../../modals/InputText";
import TextArea from "../../modals/TextArea";
import ButtonAndInputAction from "../../modals/ButtonAndInputCopy";
import FileUplaodInputAction from "../../modals/FileUplaodInputAction";
import UplaodingAnimation from "./UplaodingAnimation";
import SmallTextBlack from "../../modals/SmallTextBlack";
const NameVideoUrl = () => {
  const videoSrc = React.useRef<HTMLSourceElement | null>(null);
  const videoTag = React.useRef<HTMLVideoElement | null>(null);
  const Path = useRef(null);
  const Channels = useSelector((state: any) => state.ChannelSlice.allChannels);

  const [FileName, setFileName] = useState("");
  const [Title, setTitle] = useState("");

  const [VideoLink, setVideoLink] = useState("");
  const [videoLocation, setVideoLocation] = useState("");
  const [Uploaded, setUploaded] = useState(false);
  const [Uploading, setUploading] = useState(false);
  const [UploadingWait, setUploadingWait] = useState(false);
  const [UploadFinsh, setUploadFinsh] = useState(false);
  const [videoPath, setVideoPath] = useState("");

  const dispatch = useDispatch();
  const Router = useRouter();
  useEffect(() => {
    if (videoTag.current && videoLocation?.length) {
      videoTag.current.src = videoLocation;
      videoTag.current.play();
    }
  }, [Uploaded, videoPath]);

  const HandelSubmiteNewGeneral = async (dataFile: any) => {
    let formData = new FormData();
    const channelId = Channels[0]._id;
    if (dataFile && channelId) {
      formData.append("channelId", channelId);
      formData.append("video", dataFile);
      setUploading(true);
      setUploadingWait(true);
    }
    await AxiosPostLogedInFormData(
      "/api/post/video/create-new-video/",
      formData
    ).then(({ data }) => {
      console.log(data);
      const { file }: any = data;
      if (file) {
        setVideoLocation(file.location);
      }
      if (file._id) {
        dispatch(
          ActionVideoDataChanging({
            id: "video_id",
            video_id: file._id,
          })
        );
      }
      // setUploading(false);
      setFileName(file.filename);
      setVideoPath(file._id);
      setVideoLink(
        process.env.NEXT_PUBLIC_ClIENT_URL +
          "/watch/watch?watching=true&video=" +
          file._id
      );
      setUploadFinsh(true);
      setUploadingWait(false);
      setTimeout(() => {
        setUploaded(true);
      }, 4000);
    });
  };

  const handelCopy = () => {
    navigator.clipboard.writeText(VideoLink);
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
    console.log(e.target.id);
    dispatch(
      ActionVideoDataChanging({
        id: "title",
        title: e.target.value,
      })
    );
  };

  return (
    <div className={Style.container}>
      <div className={Style.upload_inputs_container}>
        {Uploading ? (
          <>
            {!Uploaded ? (
              <UplaodingAnimation
                Uploaded={Uploaded}
                Uploading={Uploading}
                UploadingWait={UploadingWait}
                UploadFinsh={UploadFinsh}
              />
            ) : (
              <div className={Style.video_container_data}>
                <div className={Style.video_container}>
                  <video
                    controlsList="nodownload"
                    className={Style.video}
                    ref={videoTag}
                    autoPlay
                    muted
                    loop
                  >
                    your broswer does not Support videos
                    <source
                      ref={videoSrc}
                      className={Style.video}
                      type="video/mp4"
                    />
                  </video>
                </div>
                <SmallTextBlack Text={Title.slice(0,100)} />
                <div className={Style.video_data}>
                  <ButtonAndInputAction
                    Text={"Video link"}
                    HandelClick={handelCopy}
                    CopyValue={VideoLink}
                    ButtonTextValue={"copy"}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className={Style.upload_input}>
            <div className={Style.div_container_img}></div>
            <div className={Style.upload_input}></div>
            <FileUplaodInputAction
              Accept="video/mp4"
              ButtonTextValue={"Browse"}
              handelSubmiteFile={HandelSubmiteNewGeneral}
            />
            <p className={Style.text}>
              For video content, use MP4s in H264/AAC format and a friendly
              bitrate (under 8 Mbps) for more reliable streaming. NimbaTube
              uploads are restricted to 16 GB. Upload Guide{" "}
            </p>
          </div>
        )}
        <div className={Style.div_main_inputs_all}>
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
    </div>
  );
};

export default NameVideoUrl;
