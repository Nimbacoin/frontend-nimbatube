import { IoImageOutline } from "@react-icons/all-files/io5/IoImageOutline";
import Style from "../../../styles/pages/upload/upload-components/thumbnail.module.css";
import React, { useState, useRef, useEffect } from "react";
import FormData from "form-data";
import { useDispatch, useSelector } from "react-redux";
import { ActionVideoDataChanging } from "../../../redux/video-slice/VideoSlice";
import AxiosPostLogedInFormData from "../../../utils/AxiosPostLogedInFormData";

const Thumbnail = () => {
  const Path = useRef(null);
  const [Uploaded, setUploaded] = useState(false);
  const Thumbnail = React.useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const Channels = useSelector((state: any) => state.ChannelSlice.allChannels);

  const readImageThumbnail = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      Path.current = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      setUploaded(true);

      HandelSubmiteThumbnail();
      reader.onload = function (e: any) {
        if (Thumbnail.current) {
          console.log(e.target.result);
          Thumbnail.current.style.backgroundImage = `url(${e.target.result})`;
        }
      };
    }
  };
  const HandelSubmiteThumbnail = async () => {
    let formData = new FormData();
    if (Path.current) {
      formData.append("channelId", Channels[0]._id);
      formData.append("thumbnail", Path.current);
    }
    await AxiosPostLogedInFormData(
      "/api/post/video/create-new-thumbnail/",
      formData
    ).then(({ data }) => {
      console.log(data);
      const { file }: any = data;
      dispatch(
        ActionVideoDataChanging({
          id: "video_id",
          video_id: file.id,
        })
      );
    });
  };

  return (
    <div className={Style.container}>
      <div className={Style.upload_inputs_container}>
        <p className={Style.upload_file}>Thumbnail</p>
        <div ref={Thumbnail} className={Style.upload_img_icon}>
          {!Uploaded && <IoImageOutline />}{" "}
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
              accept="image/png, image/gif, image/jpeg image/jfif image/svg"
              onChange={readImageThumbnail}
              className={Style.input_upload}
            />
            <span className={Style.upload_file_button}>Browse</span>
          </label>
          <p className={Style.text}>
            Upload your thumbnail to odysee.com. Recommended ratio is 16:9, 5MB
            max.
          </p>
        </div>
      </div>
      <div className={Style.div_button_action}>
        <button className={Style.button_action}>Submit</button>
        <button className={Style.button_action_add}>Cancel </button>
      </div>
    </div>
  );
};

export default Thumbnail;
