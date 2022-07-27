import { trace } from "console";
import React, { useEffect, useState } from "react";
import Style from "../../../styles/pages/watch/rightside/rightside.module.css";
import Vedio from "../../vedio/Vedio";
import VideoOption from "./right-side/VideoOption";

const RightSide = () => {
  const [IsPhone, setIsPhone] = useState(false);
  useEffect(() => {
    window.onresize = () => {
      if (window.innerWidth <= 1149) {
        setIsPhone(true);
      } else if (window.innerWidth >= 1149) {
        setIsPhone(false);
      }
    };
  });
  return (
    <div className={Style.container}>
      {IsPhone ? <Vedio /> : <VideoOption />}
    </div>
  );
};

export default RightSide;
