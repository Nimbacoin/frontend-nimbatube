import React from "react";
import { IoVideocamOutline } from "@react-icons/all-files/io5/IoVideocamOutline";
import Style from "../../styles/modals/input-text.module.css";

const TopTitle = () => {
  return (
    <div className={Style.upload_container}>
      <IoVideocamOutline />
      <p className={Style.upload_file_text}>Upload a file</p>
    </div>
  );
};

export default TopTitle;
