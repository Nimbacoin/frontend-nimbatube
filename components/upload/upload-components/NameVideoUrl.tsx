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
import SkinyGrayText from "../../modals/SkinyGrayText";
import VideoMainDemosData from "./VideoMainDemosData";
import TextTilteInputMudum from "../../modals/text/TextTilteInputMudum";
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
  const text =
    "By submitting your videos to Nimbatube, you acknowledge that you agree to Nimbatube's Terms of Service and Community Guidelines. Please make sure that you do not violate others' copyright or privacy rights. Learn more";
  const animtationFunc = () => {
    return (
      <>
        <UplaodingAnimation
          Uploaded={Uploaded}
          Uploading={Uploading}
          UploadingWait={UploadingWait}
          UploadFinsh={UploadFinsh}
        />
        {Uploading && (
          <>
            {!Uploaded ? (
              <UplaodingAnimation
                Uploaded={Uploaded}
                Uploading={Uploading}
                UploadingWait={UploadingWait}
                UploadFinsh={UploadFinsh}
              />
            ) : (
              ""
            )}
          </>
        )}
      </>
    );
  };
  const animtationFunc2 = () => {
    return (
      <div className={Style.main_right_container}>
        {!Uploading ? (
          <VideoMainDemosData />
        ) : (
          <div className={Style.video_container_main}>
            <div className={Style.video_container_data}>
              <video
                className={Style.video}
                controlsList="nodownload"
                ref={videoTag}
                autoPlay
                muted
                loop
                src="https://www.w3schools.com/html/mov_bbb.mp4"
              >
                your broswer does not Support videos
                <source ref={videoSrc} type="video/mp4" />
              </video>
            </div>
            <div className={Style.div_container}>
              <TextTilteInputMudum Text={Title} />
            </div>
          </div>
        )}
      </div>
    );
  };
  return (
    <div className={Style.container}>
      <div className={Style.upload_inputs_container}>
        <div className={Style.upload_input}>
          {Uploading ? (
            <ButtonAndInputAction
              Text={"Video link"}
              HandelClick={handelCopy}
              CopyValue={VideoLink}
              ButtonTextValue={"copy"}
            />
          ) : (
            <>
              <FileUplaodInputAction
                Accept="video"
                ButtonTextValue={"Browse"}
                CopyValue={"Select video file to upload"}
                handelSubmiteFile={HandelSubmiteNewGeneral}
              />
              <SmallTextBlack
                Text={
                  "Upload your thumbnail to nimbatube.com Recommended ratio is  16 GB."
                }
              />
            </>
          )}
        </div>
        <div className={Style.div_left_side}>{animtationFunc2()}</div>
        <div className={Style.container_div_right}>
          {animtationFunc()}
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
        <SkinyGrayText Text={text} />
      </div>
    </div>
  );
};

export default NameVideoUrl;
