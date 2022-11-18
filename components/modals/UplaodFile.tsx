import React from "react";
import Style from "../../styles/modals/uplaod-file.module.css";
import BoldText from "./BoldText";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import SkinyGrayText from "./SkinyGrayText";
import UplaodFirstStep from "./UplaodFirstStep";

const UplaodFile = () => {
  
  return (
    <div className={Style.container}>
      <div className={Style.main_contaier}>
        <div className={Style.main_top}>
          <BoldText text={"create"} />
        </div>
        <UplaodFirstStep />
      </div>
    </div>
  );
};

export default UplaodFile;
