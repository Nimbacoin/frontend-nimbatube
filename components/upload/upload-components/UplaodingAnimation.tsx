import React, { useEffect, useState } from "react";
import Style from "../../../styles/pages/upload/upload-components/uplaoding-animation.module.css";

const UplaodingAnimation = ({
  Uploaded,
  Uploading,
  UploadingWait,
  UploadFinsh,
}: any) => {
  const [fiesrtImage, setfiesrtImage] = useState("/images/anim1.gif");
  useEffect(() => {
    if (Uploading && !UploadingWait) {
      setfiesrtImage("/images/anim1.gif");
    }
    if (UploadingWait && !UploadFinsh) {
      setTimeout(() => {
        setfiesrtImage("/images/anim2.gif");
      }, 3000);
    }
    if (UploadFinsh && !UploadingWait) {
      setfiesrtImage("/images/anim3.gif");
    }
  }, [Uploaded, Uploading, UploadingWait, UploadFinsh]);

  return (
    <div className={Style.container}>
      <div className={Style.main_animation}>
        <div
          style={{ backgroundImage: `url(${fiesrtImage})` }}
          className={Style.uploaoding}
        ></div>
      </div>
    </div>
  );
};

export default UplaodingAnimation;
