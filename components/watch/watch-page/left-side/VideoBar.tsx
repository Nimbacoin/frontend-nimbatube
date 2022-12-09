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

  const functionToChangeTime = (Number: number) => {
    if (progressSlider.current && progressFill.current) {
      const newTime = Number / progressSlider.current.offsetWidth;
      progressFill.current.style.width = `${newTime * 100}%`;
      HandelClick(newTime);
    }
  };
  const onMouseOverActive = (e: any) => {
    if (isMouseDown) {
      functionToChangeTime(e.nativeEvent.offsetX);
    }
  };
  useEffect(() => {}, []);
  const handelTouchStart = (e: any) => {
    functionToChangeTime(e.targetTouches[0].clientX);
  };
  const handelTouchMove = (e: any) => {
    // functionToChangeTime(e);
  };
  const handelonTouchEnd = (e: any) => {
    // functionToChangeTime(e.targetTouches[0].clientX);
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
