import React from "react";
import NameVideoUrl from "./upload-components/NameVideoUrl";
import Style from "../../styles/pages/upload/upload.module.css";
import Thumbnail from "./upload-components/Thumbnail";

const UploadPage = () => {
  return (
    <div className={Style.container}>
      <NameVideoUrl />
      <Thumbnail />
    </div>
  );
};

export default UploadPage;
