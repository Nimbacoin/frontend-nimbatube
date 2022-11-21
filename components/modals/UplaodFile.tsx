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
import { VscArrowLeft } from "react-icons/vsc";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import IconHeader from "./IconHeader";
import { elementOverLaytRedcuerHide } from "../../redux/style-slice/general-style/GenrealStyle";
import BlueButton from "./BlueButton";

const UplaodFile = () => {
  const videoSrc = React.useRef<HTMLSourceElement | null>(null);
  const videoTag = React.useRef<HTMLVideoElement | null>(null);
  const videoData = useSelector((state: any) => state.VideoSlice.videoData);

  const Path = useRef(null);
  const Channels = useSelector((state: any) => state.ChannelSlice.allChannels);

  const [FileName, setFileName] = useState("");
  const [Thumbnail, setThumbnail] = useState("");
  const [Title, setTitle] = useState("");

  const [VideoLink, setVideoLink] = useState("sdoodpsd");
  const [videoLocation, setVideoLocation] = useState("");
  const [Uploaded, setUploaded] = useState(false);
  const [Uploading, setUploading] = useState(false);
  const [UploadingWait, setUploadingWait] = useState(false);
  const [UploadFinsh, setUploadFinsh] = useState(false);
  const [videoPath, setVideoPath] = useState("");
  const [firstStep, setFirstStep] = useState(2);

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
      setFirstStep(1);
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
  const topHeader = () => {
    if (firstStep <= 0) {
      return <BoldText text={"create"} />;
    } else if (firstStep >= 1) {
      return <IconHeader Icon={<VscArrowLeft />} />;
    }
  };
  const handelSubmiteThumbnail = async (dataFile: any) => {
    let formData = new FormData();
    if (dataFile) {
      if (Channels[0]._id) {
        formData.append("channelId", Channels[0]._id);
      }
      if (videoData.video_id) {
        formData.append("videoId", videoData.video_id);
      }
      formData.append("thumbnail", dataFile);
    }
    await AxiosPostLogedInFormData(
      "/api/post/video/create-new-thumbnail/",
      formData
    ).then(({ data }) => {
      const { file }: any = data;
      setThumbnail(file.filename);
      // if (Thumbnail.current) {
      //   Thumbnail.current.style.backgroundImage = `url(${
      //     process.env.NEXT_PUBLIC_BACK_END_URL +
      //     "/api/get/read/images/" +
      //     file.filename
      //   })`;
      // }
    });
  };
  const HandelNext = () => {
    alert(videoData.title);
    if (videoData.title) {
      if (firstStep == 0) {
        setFirstStep(1);
      } else if (firstStep == 1) {
        setFirstStep(2);
      }
    }
  };
  return (
    <div className={Style.container}>
      <div className={Style.container_top_close}>
        {" "}
        <IconHeader
          FuncOutSide={true}
          MainFuncOutSide={() => {
            dispatch(elementOverLaytRedcuerHide());
          }}
          Icon={<IoCloseOutline />}
        />
      </div>

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
          {topHeader()}
          {firstStep >= 1 && <BoldText text={"create"} />}
          {firstStep >= 1 && (
            <BlueButton HandelClick={HandelNext} Text={"Next"} />
          )}
        </div>
        {!Uploaded && (
          <UplaodFirstStep handelChangeInput={HandelSubmiteNewGeneral} />
        )}{" "}
        {Uploaded && (
          <UplaodFirstStep2
            handelChangeInputImage={handelSubmiteThumbnail}
            VideoLocation={videoLocation}
            VideoLink={VideoLink}
            Thumbnail={Thumbnail}
            Step={firstStep}
          />
        )}
      </div>
    </div>
  );
};

export default UplaodFile;
