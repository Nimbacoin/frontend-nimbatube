import React from "react";
import Style from "../../../styles/modals/uplaod-file.module.css";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import BoldText from "../BoldText";
import { ContainerEffectedClick } from "../../watch/watch-page/left-side/VideoInfo";
import SkinyGrayText from "../SkinyGrayText";

const UplaodFirstStep = ({ handelChangeInput }: any) => {
  const text =
    "By submitting your videos to Nimbatube, you acknowledge that you agree to Nimbatube's Terms of Service and Community Guidelines. Please make sure that you do not violate others' copyright or privacy rights. Learn more";
  const handelChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      handelChangeInput(e.target.files[0]);
    }
  };
  return (
    <div className={Style.container_bottom}>
      <div className={Style.main_div_circul}>
        <IoCloudUploadOutline />
      </div>
      <div className={Style.main_button}>
        <label className={Style.main_uplaod_container_label} htmlFor="uplaod">
          <input
            onChange={handelChange}
            type="file"
            id="uplaod"
            accept="video/mp4,video/x-m4v,video/*"
            style={{ display: "none" }}
          />
          <BoldText text={"uplaod your videos from here"} />
          <ContainerEffectedClick
            Stylied={true}
            style={{ borderRadius: "20px" }}
          ></ContainerEffectedClick>
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
