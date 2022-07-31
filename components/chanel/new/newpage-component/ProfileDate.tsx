import React from "react";
import Style from "../../../../styles/pages/chanel/new/newpage-component/profile-date.module.css";
import { IoCameraOutline } from "@react-icons/all-files/io5/IoCameraOutline";
const ProfileDate = () => {
  return (
    <div className={Style.container}>
      <div className={Style.upload_inputs_container}>
        <label htmlFor="input_upload" className={Style.input_label}>
          <input id="input_upload" type="file" className={Style.input_upload} />
          <span className={Style.camera_of_button}>
            <IoCameraOutline />
          </span>
        </label>
      </div>
      <div className={Style.links_container}>
        <div className={Style.profile_image}>
          <label htmlFor="input_upload" className={Style.input_label}>
            <input
              id="input_upload"
              type="file"
              className={Style.input_upload}
            />
            <span className={Style.camera_of_button_profile}>
              <IoCameraOutline />
            </span>
          </label>
        </div>
        <div className={Style.chanel_links}></div>
      </div>
    </div>
  );
};

export default ProfileDate;
