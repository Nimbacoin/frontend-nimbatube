import React from "react";
import { IoImageOutline } from "@react-icons/all-files/io5/IoImageOutline";
import Style from "../../../styles/pages/upload/upload-components/thumbnail.module.css";
const Thumbnail = () => {
  return (
    <div className={Style.container}>
      <div className={Style.upload_inputs_container}>
        <p className={Style.upload_file}>Thumbnail</p>

        <div className={Style.upload_img_icon}>
          <IoImageOutline />{" "}
        </div>
        <div className={Style.upload_input}>
          <label htmlFor="input_upload" className={Style.input_label}>
            <span className={Style.upload_file_text}>
              Choose an enticing thumbnail{" "}
            </span>
            <span className={Style.upload_file_text_dots}>...</span>
            <input
              id="input_upload"
              type="file"
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
    </div>
  );
};

export default Thumbnail;
