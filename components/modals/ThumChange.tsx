import React from "react";
import Style from "../../styles/modals/thun-change.module.css";
import BoldText from "./BoldText";
import { IoImagesOutline } from "@react-icons/all-files/io5/IoImagesOutline";
import SkinyGrayText from "./SkinyGrayText";

const ThumChange = ({ handelChangeInputImage }: any) => {
  const text =
    "By submitting your videos to Nimbatube, you acknowledge that you agree to Nimbatube's Terms of Service and Community Guidelines. Please make sure that you do not violate others' copyright or privacy rights. Learn more";
  const handelChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      handelChangeInputImage(e.target.files[0]);
    }
  };
  return (
    <div className={Style.container_bottom}>
      <div className={Style.div_img}>
        
      </div>
    </div>
  );
};

export default ThumChange;
