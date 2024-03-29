import { IoImageOutline } from "@react-icons/all-files/io5/IoImageOutline";
import Style from "../../../styles/pages/go-live/go-live-components/thumbnail.module.css";
import React, { useState, useRef, useEffect } from "react";
import FormData from "form-data";
import { useDispatch, useSelector } from "react-redux";
import { ActionVideoDataChanging } from "../../../redux/video-slice/VideoSlice";
import AxiosPostLogedInFormData from "../../../utils/AxiosPostLogedInFormData";
import basedPostUrlRequestLogedIn from "../../../utils/basedPostUrlRequestLogedIn";
import { useRouter } from "next/router";
import BlueButton from "../../modals/BlueButton";
import CancelButton from "../../modals/CancelButton";
import TextTilteInputMudum from "../../modals/text/TextTilteInputMudum";
import BigGrayButton from "../../modals/BigGrayButton";

const Thumbnail = ({ VideoLink, VideoId }: any) => {
  const Path = useRef(null);
  const Router = useRouter();
  const [Uploaded, setUploaded] = useState(false);
  const Thumbnail = React.useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const Channels = useSelector((state: any) => state.ChannelSlice.allChannels);
  const videoData = useSelector((state: any) => state.VideoSlice.videoData);

  const readImageThumbnail = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      Path.current = event.target.files[0];
      handelSubmiteThumbnail();
    }
  };

  const handelSubmiteThumbnail = async () => {
    let formData = new FormData();
    if (Path.current) {
      if (Channels[0]._id) {
        formData.append("channelId", Channels[0]._id);
      }
      if (VideoLink) {
        formData.append("videoId", VideoId);
      }
      formData.append("thumbnail", Path.current);
    }
    await AxiosPostLogedInFormData(
      "/api/post/video/create-new-thumbnail/",
      formData
    ).then(({ data }) => {
      const { file }: any = data;
      if (Thumbnail.current) {
        Thumbnail.current.style.backgroundImage = `url(${file.filename})`;
      }
      setUploaded(true);
    });
  };
  const handelSubmiteVideos = async () => {
    const newVideo: any = { videoId: VideoId, videoData: videoData };

    await basedPostUrlRequestLogedIn(
      "/api/post/stream/submite-live-stream/",
      newVideo
    ).then(({ ready }) => {
      if (ready) {
        Router.push(
          "/go-live/go-live?created=true&" +
            "&ready=" +
            ready +
            "&video=" +
            VideoId
        );
      }
    });
  };

  return (
    <div className={Style.container}>
      <div className={Style.container_top}>
        <TextTilteInputMudum Text={"Thumbnail"} />
      </div>
      <div className={Style.container_image_main_second}>
        <div ref={Thumbnail} className={Style.upload_img_icon}>
          {!Uploaded && <IoImageOutline />}
        </div>
        <div className={Style.input_upload_thumbnail}>
          <label htmlFor="input_upload_thumbnail" className={Style.input_label}>
            <span className={Style.upload_file_text}>
              Choose an enticing thumbnail{" "}
            </span>
            <span className={Style.upload_file_text_dots}>...</span>
            <input
              id="input_upload_thumbnail"
              type="file"
              accept="image/png, image/gif, image/jpeg , image/jpg image/jfif image/svg"
              onChange={readImageThumbnail}
              className={Style.input_upload}
            />
            <span className={Style.upload_file_button}>Browse</span>
          </label>
          <p className={Style.text}>
            Upload your thumbnail to nimbatube.com. Recommended ratio is 16:9,
            5MB max.
          </p>
        </div>
      </div>
      <div className={Style.div_button_action}>
        <BigGrayButton
          HandelCopy={handelSubmiteVideos}
          Value={"continue to live"}
        />
      </div>
    </div>
  );
};

export default Thumbnail;
