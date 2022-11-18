import React from "react";
import Style from "../../styles/modals/uplaod-file.module.css";
import BoldText from "./BoldText";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import SkinyGrayText from "./SkinyGrayText";

const UplaodFirstStep = () => {
  const text =
    "By submitting your videos to Nimbatube, you acknowledge that you agree to Nimbatube's Terms of Service and Community Guidelines. Please make sure that you do not violate others' copyright or privacy rights. Learn more";

  return (
    <div className={Style.container_bottom}>
      <div className={Style.main_div_circul}>
        <IoCloudUploadOutline />
      </div>
      <div className={Style.main_button}>
        <label className={Style.main_uplaod_container_label} htmlFor="uplaod">
          <input type="file" id="uplaod" style={{ display: "none" }} />
          <BoldText text={"uplaod yuur videos from here"} />
          <span className={Style.button_action_add}>Select video </span>
        </label>
      </div>
      <div className={Style.main_container_text}>
        <SkinyGrayText Text={text} />
      </div>
    </div>
  );
};

export default UplaodFirstStep;
