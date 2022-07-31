import React from "react";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import Style from "../../../styles/pages/upload/upload-components/name-video-url.module.css";
const NameVideoUrl = () => {
  return (
    <div className={Style.container}>
      <div className={Style.upload_container}>
        <IoCloudUploadOutline />
        <p className={Style.upload_file}>Upload a file</p>
      </div>
      <div className={Style.upload_inputs_container}>
        <div className={Style.upload_input}>
          <label htmlFor="input_upload" className={Style.input_label}>
            <span className={Style.upload_file}>
              Select video, audio or image file to upload
            </span>
            <input
              id="input_upload"
              type="file"
              className={Style.input_upload}
            />
            <span className={Style.upload_file_button}>Browse</span>
          </label>

          <p className={Style.text}>
            For video content, use MP4s in H264/AAC format and a friendly
            bitrate (under 8 Mbps) for more reliable streaming. Odysee uploads
            are restricted to 16 GB. Upload Guide{" "}
          </p>
        </div>
        <div className={Style.upload_input}>
          <p className={Style.upload_file}>Tilte</p>
          <label htmlFor="input_title" className={Style.input_label}>
            <input id="input_title" type="text" className={Style.input_title} />
          </label>
        </div>
        <div className={Style.upload_input}>
          <p className={Style.upload_file}>Description</p>
          <label htmlFor="text_desc" className={Style.label_description}>
            <textarea id="text_desc" className={Style.text_desc} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default NameVideoUrl;
