import React from "react";
import Style from "../../styles/modals/uplaod-file.module.css";
import BoldText from "./BoldText";
import { IoImagesOutline } from "@react-icons/all-files/io5/IoImagesOutline";
import SkinyGrayText from "./SkinyGrayText";

const Thump = ({ handelChangeInput }: any) => {
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
        <IoImagesOutline />
      </div>
      <div className={Style.main_button}>
        <label className={Style.main_uplaod_container_label} htmlFor="uplaod">
          <input
            onChange={handelChange}
            type="file"
            id="uplaod"
            style={{ display: "none" }}
          />
          <BoldText text={"uplaod your Thumbnail from here"} />
          <span className={Style.button_action_add}>Select Image </span>
        </label>
      </div>
    </div>
  );
};

export default Thump;
