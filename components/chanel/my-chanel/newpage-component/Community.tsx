import React from "react";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import Style from "../../../../styles/pages/chanel/new/newpage-component/new-general.module.css";
const Community = () => {
  return (
    <div className={Style.container}>
      <div className={Style.upload_inputs_container}>
        <div className={Style.upload_input}>
          <p className={Style.upload_file}>Comment as Mrbeast</p>
          <label htmlFor="text_desc" className={Style.label_description}>
            <textarea id="text_desc" className={Style.text_desc} />
          </label>
        </div>
        <div className={Style.div_button_action}>
          <button className={Style.button_action}>Comment</button>
        </div>
      </div>
    </div>
  );
};

export default Community;
