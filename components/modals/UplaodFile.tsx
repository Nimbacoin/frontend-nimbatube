import React, { useState, useRef } from "react";
import Style from "../../styles/modals/uplaod-file.module.css";
import BoldText from "./BoldText";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import SkinyGrayText from "./SkinyGrayText";
import UplaodFirstStep from "./UplaodFirstStep";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import AxiosPostLogedInFormData from "../../utils/AxiosPostLogedInFormData";
import { ActionVideoDataChanging } from "../../redux/video-slice/VideoSlice";
import UplaodingAnimation from "../upload/upload-components/UplaodingAnimation";
import UplaodFirstStep2 from "./UplaodFirstStep2";

const UplaodFile = () => {
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

  return (
    <div className={Style.container}>
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
      <div
        className={!Uploaded ? Style.main_contaier_big : Style.main_contaier}
      >
        <div className={Style.main_top}>
          <BoldText text={"create"} />
        </div>

        {Uploaded && (
          <UplaodFirstStep handelChangeInput={HandelSubmiteNewGeneral} />
        )}
        {!Uploaded && <UplaodFirstStep2 />}

        {videoLocation}
      </div>
    </div>
  );
};

export default UplaodFile;
