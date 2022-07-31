import React from "react";
import NameVideoUrl from "./upload-components/NameVideoUrl";
import Style from "../../styles/pages/upload/upload.module.css";

const UploadPage = () => {
  return (
    <div className={Style.container}>
      <NameVideoUrl />
    </div>
  );
};

export default UploadPage;
