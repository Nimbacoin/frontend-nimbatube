import React, { useEffect, useState } from "react";
import Style from "../../../../styles/pages/watch/leftside/video-bar.module.css";

const VideoBar = ({ Width, HandelClick }: any) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [changeClassName, setChangeClassName] = useState(false);
  const progressSlider = React.useRef<HTMLDivElement | null>(null);
  const progressFill = React.useRef<HTMLDivElement | null>(null);

  const handelChange = (e: any) => {
    if (progressSlider.current && progressFill.current) {
      const newTime =
        e.nativeEvent.offsetX / progressSlider.current.offsetWidth;
      console.log(e.nativeEvent.offsetX);
      progressFill.current.style.width = `${newTime * 100}%`;
      HandelClick(newTime);
    }
  };
  const onMouseDownActive = () => {
    setIsMouseDown(true);
  };
  const onMouseLeaveActive = () => {
    setIsMouseDown(false);
  };
  const onMouseUpActive = () => {
    setIsMouseDown(false);
  };

  const functionToChangeTime = () => {
    if (progressSlider.current && progressFill.current) {
      const newTime =
        e.nativeEvent.offsetX / progressSlider.current.offsetWidth;
      console.log(e.nativeEvent.offsetX);
      progressFill.current.style.width = `${newTime * 100}%`;
      HandelClick(newTime);
    }
  };
  const onMouseOverActive = (e: any) => {
    if (isMouseDown) {
      functionToChangeTime();
    }
  };
  useEffect(() => {}, []);
  const handelTouchStart = (e: any) => {
    console.log("start");
  };
  const handelTouchMove = (e: any) => {
    console.log("move");
    functionToChangeTime();
  };
  const handelonTouchEnd = (e: any) => {
    console.log("end");
  };
  return (
    <div
      ref={progressSlider}
      onClick={handelChange}
      onTouchStart={handelTouchStart}
      onTouchMove={handelTouchMove}
      onTouchEnd={handelonTouchEnd}
      onMouseLeave={onMouseLeaveActive}
      onMouseDown={onMouseDownActive}
      onMouseUp={onMouseUpActive}
      onMouseOver={onMouseOverActive}
      className={Style.container}
    >
      <div className={Style.main_second_container}>
        <div
          ref={progressFill}
          style={{ width: `${Width}` }}
          className={Style.bar_container}
        >
          <div className={Style.the_circel}></div>{" "}
        </div>
      </div>
    </div>
  );
};

export default VideoBar;
