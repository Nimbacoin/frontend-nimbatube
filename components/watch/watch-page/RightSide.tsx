import { trace } from "console";
import React, { useEffect, useState } from "react";
import Style from "../../../styles/pages/watch/rightside/rightside.module.css";
import Vedio from "../../vedio/Vedio";
import VideoOption from "./right-side/VideoOption";

const RightSide = () => {
  const [IsPhone, setIsPhone] = useState(false);
  const Reszing = () => {
    if (window.innerWidth <= 1149) {
      setIsPhone(true);
    } else if (window.innerWidth > 1149) {
      setIsPhone(false);
    }
  };
  useEffect(() => {
    Reszing();
    window.onresize = () => {
      Reszing();
    };
  });
  return (
    <div className={Style.container}>
      {IsPhone ? <Vedio /> : <VideoOption />}
    </div>
  );
};

export default RightSide;
