import React from "react";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import Style from "../../../../styles/pages/chanel/new/newpage-component/new-general.module.css";
const CreditDetails = () => {
  return (
    <div className={Style.container}>
      <div className={Style.upload_inputs_container}>
        <div className={Style.upload_input}>
          <p className={Style.upload_file}>Name</p>
          <label htmlFor="input_title" className={Style.input_label}>
            <input id="input_title" type="text" className={Style.input_title} />
          </label>
          <p className={Style.text}>This field cannot be changed.</p>
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

export default CreditDetails;
